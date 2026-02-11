import { useEffect, useMemo, useState } from 'react';
import { getRegistrations, subscribeToDataUpdates } from '../lib/storage';

export default function Dashboard() {
  const [registrations, setRegistrations] = useState(() => getRegistrations());

  useEffect(() => {
    const syncData = () => setRegistrations(getRegistrations());
    const unsubscribe = subscribeToDataUpdates(syncData);
    return unsubscribe;
  }, []);

  const latest = registrations[0];

  const stats = useMemo(
    () => [
      { label: 'Registered Events', value: registrations.length || 0 },
      { label: 'Tickets Booked', value: registrations.length || 0 },
      { label: 'Certificates Ready', value: registrations.length ? 1 : 0 },
      { label: 'Reward Points', value: registrations.length * 40 },
    ],
    [registrations.length]
  );

  return (
    <section className="page">
      <h1>Student Login & Profile</h1>
      <p>Your panel for tickets, reminders, certificates and recent registration status.</p>

      <div className="grid cards">
        {stats.map((item) => (
          <article className="card" key={item.label}>
            <h3>{item.label}</h3>
            <p className="stat">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="grid cards">
        <article className="card">
          <h3>Latest Ticket</h3>
          <p>
            {latest ? `${latest.ticketId} (${latest.event})` : 'No ticket yet. Register for an event to see details.'}
          </p>
        </article>
        <article className="card">
          <h3>Upcoming Reminder</h3>
          <p>Coding Contest starts tomorrow at 9:30 AM in Lab Block B.</p>
        </article>
        <article className="card">
          <h3>Certificate Download</h3>
          <p>Certificates become available within 48 hours after each event.</p>
        </article>
      </div>
    </section>
  );
}
