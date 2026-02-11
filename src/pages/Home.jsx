import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENT_OPTIONS } from '../lib/events';
import { getAnnouncements, getRegistrations, subscribeToDataUpdates } from '../lib/storage';

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
    const syncData = () => {
      setAnnouncements(getAnnouncements());
      setRegistrations(getRegistrations());
    };

    const timer = setInterval(() => {
      setCountdownText(formatCountdown(targetDate - new Date()));
    }, 60000);

    const unsubscribe = subscribeToDataUpdates(syncData);

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const topEvent = useMemo(() => {
    const counts = registrations.reduce((acc, item) => {
      acc[item.event] = (acc[item.event] || 0) + 1;
      return acc;
    }, {});

    const [name, total] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ['Hackathon', 0];
    return { name, total };
  }, [registrations]);

  const stats = useMemo(
    () => [
      { label: 'Registrations', value: registrations.length || 0 },
      { label: 'Live Announcements', value: announcements.length || 0 },
      { label: 'Events Listed', value: EVENT_OPTIONS.length },
      { label: 'Top Event', value: `${topEvent.name} (${topEvent.total})` },
    ],
    [announcements.length, registrations.length, topEvent.name, topEvent.total]
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

      <h2>Featured Modules</h2>
      <div className="grid cards">
        <article className="card">
          <h3>🎟️ Ticket Booking</h3>
          <p>Generate ticket IDs instantly with payment mode and see recent bookings in Register page.</p>
        </article>
        <article className="card">
          <h3>📊 Live Admin Controls</h3>
          <p>Organizers can post announcements and manage demo data from one panel.</p>
        </article>
        <article className="card">
          <h3>👤 Student Dashboard</h3>
          <p>Latest ticket, reward points and event stats update in real-time from shared storage.</p>
        </article>
      </div>

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
