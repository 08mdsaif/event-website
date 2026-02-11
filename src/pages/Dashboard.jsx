const stats = [
  { label: 'Registered Events', value: '3' },
  { label: 'Tickets Booked', value: '2' },
  { label: 'Certificates Ready', value: '1' },
  { label: 'Reward Points', value: '120' },
];

export default function Dashboard() {
  return (
    <section className="page">
      <h1>Student Login & Profile</h1>
      <p>Your personal panel for tickets, reminders, certificates and announcements.</p>

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
          <h3>Upcoming Reminder</h3>
          <p>Coding Contest starts tomorrow at 9:30 AM in Lab Block B.</p>
        </article>
        <article className="card">
          <h3>Certificate Download</h3>
          <p>Poster Design participation certificate is available.</p>
        </article>
        <article className="card">
          <h3>Support</h3>
          <p>Need help? Open a help desk ticket from Contact page.</p>
        </article>
      </div>
    </section>
  );
}
