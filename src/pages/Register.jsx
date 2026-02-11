import { useEffect, useMemo, useState } from 'react';
import { EVENT_OPTIONS } from '../lib/events';
import { addRegistration, getRegistrations, subscribeToDataUpdates } from '../lib/storage';

const ticketPrice = Object.fromEntries(EVENT_OPTIONS.map((event) => [event.name, event.price]));

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: EVENT_OPTIONS[0].name,
    payment: 'UPI',
  });
  const [ticketId, setTicketId] = useState('');
  const [message, setMessage] = useState('');
  const [registrations, setRegistrations] = useState(() => getRegistrations());

  useEffect(() => {
    const syncData = () => setRegistrations(getRegistrations());
    const unsubscribe = subscribeToDataUpdates(syncData);
    return unsubscribe;
  }, []);

  const amount = useMemo(() => ticketPrice[form.event] || 0, [form.event]);

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setMessage('Please fill your name and email.');
      return;
    }

    const random = Math.floor(1000 + Math.random() * 9000);
    const newTicketId = `CF-2026-${random}`;
    setTicketId(newTicketId);

    addRegistration({
      ...form,
      amount,
      ticketId: newTicketId,
      createdAt: new Date().toISOString(),
    });

    setMessage('Registration successful! Ticket generated below.');
  };

  return (
    <section className="page">
      <h1>Online Registration + Ticket Booking</h1>
      <form className="grid form-grid" onSubmit={handleRegister}>
        <label>
          Full Name
          <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Saif Khan" />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={handleChange('email')} placeholder="saif@college.edu" />
        </label>
        <label>
          Event
          <select value={form.event} onChange={handleChange('event')}>
            {EVENT_OPTIONS.map((option) => (
              <option key={option.name}>{option.name}</option>
            ))}
          </select>
        </label>
        <label>
          Payment Mode
          <select value={form.payment} onChange={handleChange('payment')}>
            <option>UPI</option>
            <option>Card</option>
          </select>
        </label>
        <button type="submit">Register & Generate Ticket</button>
      </form>

      {message && <p className="note">{message}</p>}

      <div className="card ticket-card">
        <h3>Ticket Preview</h3>
        <p>
          <strong>Name:</strong> {form.name || '—'}
        </p>
        <p>
          <strong>Selected Event:</strong> {form.event}
        </p>
        <p>
          <strong>Amount:</strong> ₹{amount}
        </p>
        <p>
          <strong>Mode:</strong> {form.payment}
        </p>
        <p>
          <strong>Ticket ID:</strong> {ticketId || 'Generate after registration'}
        </p>
      </div>

      <div className="card">
        <h3>Recent Registrations</h3>
        {registrations.length ? (
          <ul className="announcement-list">
            {registrations.slice(0, 5).map((item) => (
              <li key={item.ticketId}>
                {item.name} — {item.event} ({item.ticketId})
              </li>
            ))}
          </ul>
        ) : (
          <p className="note">No registrations yet.</p>
        )}
      </div>

      <p className="note">Next step: connect this form with Firebase + Razorpay for real payment processing.</p>
    </section>
  );
}
