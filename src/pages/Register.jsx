import { useMemo, useState } from 'react';
import { addRegistration } from '../lib/storage';

const ticketPrice = {
  Hackathon: 100,
  'Dance Battle': 80,
  'Poster Design': 50,
  'Coding Contest': 120,
};

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: 'Hackathon',
    payment: 'UPI',
  });
  const [ticketId, setTicketId] = useState('');
  const [message, setMessage] = useState('');

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
            <option>Hackathon</option>
            <option>Dance Battle</option>
            <option>Poster Design</option>
            <option>Coding Contest</option>
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
      <p className="note">Next step: connect this form with Firebase + Razorpay for real payment processing.</p>
    </section>
  );
}
