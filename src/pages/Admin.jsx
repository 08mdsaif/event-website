import { useEffect, useState } from 'react';
import {
  addAnnouncement,
  clearDemoData,
  getAnnouncements,
  getRegistrations,
  seedDemoAnnouncements,
  subscribeToDataUpdates,
} from '../lib/storage';

const defaultEvents = [
  { name: 'Hackathon', registrations: 120 },
  { name: 'Dance Battle', registrations: 90 },
];

export default function Admin() {
  const [events, setEvents] = useState(defaultEvents);
  const [newEvent, setNewEvent] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [announcementList, setAnnouncementList] = useState(() => getAnnouncements());
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [adminMessage, setAdminMessage] = useState('');

  useEffect(() => {
    const syncData = () => {
      setAnnouncementList(getAnnouncements());
      setRegistrations(getRegistrations());
    };

    const unsubscribe = subscribeToDataUpdates(syncData);
    return unsubscribe;
  }, []);

  const addEvent = (event) => {
    event.preventDefault();
    const name = newEvent.trim();
    if (!name) return;

    setEvents((prev) => [...prev, { name, registrations: 0 }]);
    setNewEvent('');
    setAdminMessage('Event added successfully.');
  };

  const publishAnnouncement = (event) => {
    event.preventDefault();
    const ok = addAnnouncement(announcement);
    if (ok) {
      setAnnouncement('');
      setAdminMessage('Announcement published.');
    } else {
      setAdminMessage('Please write an announcement first.');
    }
  };

  const handleResetData = () => {
    clearDemoData();
    setAdminMessage('All demo registrations and announcements were cleared.');
  };

  const handleSeedAnnouncements = () => {
    seedDemoAnnouncements();
    setAdminMessage('Default announcements restored.');
  };

  return (
    <section className="page">
      <h1>Organizer Admin Panel</h1>
      <p>Manage events, post live updates, and monitor registrations from one place.</p>

      {adminMessage && <p className="note">{adminMessage}</p>}

      <div className="grid cards">
        <article className="card">
          <h3>Total Registrations</h3>
          <p className="stat">{registrations.length}</p>
        </article>
        <article className="card">
          <h3>Total Events</h3>
          <p className="stat">{events.length}</p>
        </article>
      </div>

      <form className="admin-form" onSubmit={addEvent}>
        <input
          type="text"
          value={newEvent}
          onChange={(event) => setNewEvent(event.target.value)}
          placeholder="Add new event name"
        />
        <button type="submit">Add Event</button>
      </form>

      <div className="grid cards">
        {events.map((event) => (
          <article className="card" key={event.name}>
            <h3>{event.name}</h3>
            <p>Registrations: {event.registrations}</p>
          </article>
        ))}
      </div>

      <form className="admin-form" onSubmit={publishAnnouncement}>
        <input
          type="text"
          value={announcement}
          onChange={(event) => setAnnouncement(event.target.value)}
          placeholder="Publish live announcement"
        />
        <button type="submit">Publish</button>
      </form>

      <div className="admin-actions">
        <button type="button" className="secondary-btn" onClick={handleSeedAnnouncements}>
          Restore Default Announcements
        </button>
        <button type="button" className="danger-btn" onClick={handleResetData}>
          Clear Demo Data
        </button>
      </div>

      <div className="card">
        <h3>Recent Announcements</h3>
        <ul className="announcement-list">
          {announcementList.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
