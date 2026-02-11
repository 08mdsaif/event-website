import { useState } from 'react';

const defaultEvents = [
  { name: 'Hackathon', registrations: 120 },
  { name: 'Dance Battle', registrations: 90 },
];

export default function Admin() {
  const [events, setEvents] = useState(defaultEvents);
  const [newEvent, setNewEvent] = useState('');

  const addEvent = (event) => {
    event.preventDefault();
    const name = newEvent.trim();
    if (!name) return;

    setEvents((prev) => [...prev, { name, registrations: 0 }]);
    setNewEvent('');
  };

  return (
    <section className="page">
      <h1>Organizer Admin Panel</h1>
      <p>Basic controls to demonstrate organizer workflow in viva.</p>

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

      <div className="grid cards">
        <article className="card">
          <h3>Live Announcements</h3>
          <p>Push updates like venue/time changes to all students.</p>
        </article>
        <article className="card">
          <h3>Export Data</h3>
          <p>Download participant list as CSV for records.</p>
        </article>
      </div>
    </section>
  );
}
