const uniqueIdeas = [
  {
    title: 'Memory Wall + Digital Yearbook',
    detail:
      'Students upload one photo + one message after the fest. You can export it as a yearly memory book PDF.',
  },
  {
    title: 'QR Entry + Live Attendance',
    detail:
      'Generate QR tickets after registration and track gate entry count in the admin dashboard in real time.',
  },
  {
    title: 'Certificate Generator',
    detail:
      'Use participant name + event data to auto-generate certificates and allow instant download from student profile.',
  },
  {
    title: 'Heat Map of Popular Events',
    detail:
      'Show which events have the highest registrations. This gives organizers useful analytics for future planning.',
  },
];

const announcements = [
  'Hackathon team size changed to 2-4 members.',
  'Last date for registration: 15 Feb, 11:59 PM.',
  'Cultural rehearsal moved to Open Stage at 5 PM.',
];

export default function Home() {
  return (
    <section className="page">
      <div className="hero">
        <p className="pill">College Minor Project</p>
        <h1>Simple, fast and viva-ready event website in React</h1>
        <p>
          Built for college fest workflows: registration, schedule, ticket, student profile, admin controls, payment
          option UI, gallery, FAQs and contact support.
        </p>
      </div>

      <div className="announcement-bar">
        <strong>Live Updates:</strong>
        <marquee>{announcements.join('  •  ')}</marquee>
      </div>

      <h2>Unique ideas to impress your faculty</h2>
      <div className="grid cards">
        {uniqueIdeas.map((idea) => (
          <article key={idea.title} className="card">
            <h3>{idea.title}</h3>
            <p>{idea.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
