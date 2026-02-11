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

  const filteredEvents = useMemo(() => {
    if (selectedDay === 'All') return schedule;
    return schedule.filter((item) => item.day === selectedDay);
  }, [selectedDay]);

  return (
    <section className="page">
      <h1>Event Schedule & Timetable</h1>
      <p>Use the day filter to demonstrate interactivity in your project presentation.</p>

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
