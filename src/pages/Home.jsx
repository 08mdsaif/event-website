import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements, getRegistrations } from '../lib/storage';

const uniqueIdeas = [
  {
    title: 'AI Help Desk Assistant',
    detail: 'Add a smart FAQ assistant that instantly answers venue, timing, and registration questions.',
  },
  {
    title: 'Memory Wall + Yearbook',
    detail: 'Collect post-event photos/messages and export a “CampusFest Yearbook” for your department.',
  },
  {
    title: 'QR Check-in Counter',
    detail: 'Simulate QR entry and show live attendee count on big screen during event day.',
  },
  {
    title: 'Certificate Studio',
    detail: 'Generate personalized certificate preview and allow one-click download.',
  },
];

const targetDate = new Date('2026-03-20T09:00:00');

function formatCountdown(diff) {
  if (diff <= 0) return 'Event is live now 🎉';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${mins}m left`;
}

export default function Home() {
  const [announcements, setAnnouncements] = useState(() => getAnnouncements());
  const [registrations, setRegistrations] = useState(() => getRegistrations());
  const [countdownText, setCountdownText] = useState(formatCountdown(targetDate - new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownText(formatCountdown(targetDate - new Date()));
      setAnnouncements(getAnnouncements());
      setRegistrations(getRegistrations());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Registrations', value: registrations.length || 0 },
      { label: 'Live Announcements', value: announcements.length || 0 },
      { label: 'Modules Implemented', value: 11 },
      { label: 'Team Readiness', value: '95%' },
    ],
    [announcements.length, registrations.length]
  );

  return (
    <section className="page home-page">
      <div className="hero hero-glow">
        <p className="pill">College Minor Project</p>
        <h1>CampusFest Portal — fast, modern, and fully demo-ready</h1>
        <p>
          Complete event website with registration, schedule, ticketing, gallery, student dashboard, admin tools,
          FAQs, contact support and live update system.
        </p>
        <div className="hero-actions">
          <Link className="cta" to="/register">
            Register Now
          </Link>
          <Link className="cta cta-secondary" to="/events">
            View Timetable
          </Link>
        </div>
      </div>

      <div className="grid cards">
        <article className="card feature-highlight">
          <h3>⏳ Countdown</h3>
          <p className="stat">{countdownText}</p>
        </article>
        {stats.map((item) => (
          <article key={item.label} className="card">
            <h3>{item.label}</h3>
            <p className="stat">{item.value}</p>
          </article>
        ))}
      </div>

      <section className="announcement-strip card">
        <h3>📢 Live Updates</h3>
        <div className="ticker-wrap">
          <div className="ticker-track">{announcements.join(' • ')}</div>
        </div>
      </section>

      <h2>Unique ideas to stand out in viva</h2>
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
