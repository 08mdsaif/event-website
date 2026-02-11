import { useState } from 'react';

const faqs = [
  {
    q: 'Can I register on the event day?',
    a: 'No. Registration closes 24 hours before the event start time.',
  },
  {
    q: 'How do I get my ticket?',
    a: 'After registration, ticket ID appears instantly and can be shown at entry.',
  },
  {
    q: 'Who can I contact for help?',
    a: 'Call help desk or visit the registration desk near campus gate.',
  },
];

export default function Contact() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="page">
      <h1>Contact, FAQ & Venue Map</h1>
      <div className="grid cards">
        <article className="card">
          <h3>Help Desk</h3>
          <p>+91 98765 43210</p>
          <p>campusfest@college.edu</p>
        </article>
        <article className="card">
          <h3>Venue Location</h3>
          <p>College Main Campus, Block B, City Road.</p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            Open Map
          </a>
        </article>
      </div>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <button
            key={item.q}
            type="button"
            className="faq-item"
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          >
            <strong>{item.q}</strong>
            {index === openIndex && <p>{item.a}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}
