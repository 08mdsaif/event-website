import { useMemo, useState } from 'react';

const schedule = [
  { day: 'Day 1', time: '09:00 AM', event: 'Inauguration Ceremony', venue: 'Main Auditorium' },
  { day: 'Day 1', time: '10:30 AM', event: 'Hackathon Kickoff', venue: 'Lab Block A' },
  { day: 'Day 1', time: '02:00 PM', event: 'Poster Design', venue: 'Seminar Hall' },
  { day: 'Day 2', time: '09:30 AM', event: 'Coding Contest', venue: 'Lab Block B' },
  { day: 'Day 2', time: '12:00 PM', event: 'Debate Finals', venue: 'Conference Hall' },
  { day: 'Day 2', time: '04:00 PM', event: 'Prize Distribution', venue: 'Main Auditorium' },
];

export default function Events() {
  const [selectedDay, setSelectedDay] = useState('All');
  const [query, setQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return schedule.filter((item) => {
      const dayMatch = selectedDay === 'All' || item.day === selectedDay;
      const queryMatch = `${item.event} ${item.venue}`.toLowerCase().includes(query.toLowerCase());
      return dayMatch && queryMatch;
    });
  }, [query, selectedDay]);

  return (
    <section className="page">
      <h1>Event Schedule & Timetable</h1>
      <p>Filter by day and search by event/venue to quickly find sessions.</p>

      <div className="filter-row">
        {['All', 'Day 1', 'Day 2'].map((day) => (
          <button
            key={day}
            type="button"
            className={`chip ${selectedDay === day ? 'chip-active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <label className="search-box">
        Search event or venue
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Hackathon" />
      </label>

      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Event</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((item) => (
            <tr key={`${item.day}-${item.time}-${item.event}`}>
              <td>{item.day}</td>
              <td>{item.time}</td>
              <td>{item.event}</td>
              <td>{item.venue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
