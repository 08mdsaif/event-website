import { useMemo, useState } from 'react';

const ticketPrice = {
  Hackathon: 100,
  'Dance Battle': 80,
  'Poster Design': 50,
};

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: 'Hackathon',
    payment: 'UPI',
  });
  const [ticketId, setTicketId] = useState('');

  const amount = useMemo(() => ticketPrice[form.event] || 0, [form.event]);

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    const random = Math.floor(1000 + Math.random() * 9000);
    setTicketId(`CF-2026-${random}`);
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

      <div className="card ticket-card">
        <h3>Ticket Preview</h3>
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
      <p className="note">Next step: connect this form with Firebase Firestore + Razorpay for real payments.</p>
    </section>
  );
}
