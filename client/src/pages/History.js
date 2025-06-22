import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function History() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [events, setEvents] = useState([]);

  const fetchHistory = async () => {
    if (!month || !day) return;

    try {
      const res = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`
      );
      setEvents(res.data.events.slice(0, 10)); // Limit to 10 events
    } catch (err) {
      console.error('Error fetching history:', err);
      setEvents([]);
    }
  };

  const handleSave = (event) => {
    const current = JSON.parse(localStorage.getItem('savedItems')) || [];

    const newItem = {
      type: 'event',
      year: event.year,
      text: event.text,
      link: event.pages?.[0]?.content_urls?.desktop?.page || '',
    };

    const alreadySaved = current.some((e) => e.text === newItem.text && e.year === newItem.year);
    if (!alreadySaved) {
      localStorage.setItem('savedItems', JSON.stringify([...current, newItem]));
      alert('✅ Event saved!');
    } else {
      alert('⚠️ Event already saved.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">📜 Discover Historical Events</h2>
        <p className="lead">Select a month and day to see what happened in history.</p>

        <div className="mt-4 d-flex justify-content-center gap-2">
          <select
            className="form-select w-auto"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            className="form-select w-auto"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={fetchHistory}>
            Search
          </button>
        </div>

        {events.length > 0 && (
          <div className="mt-5 text-start w-75 mx-auto">
            <h4 className="mb-3">
              🕰 Events on {new Date(2020, month - 1, day).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric'
              })}
              :
            </h4>
            <ul className="list-group">
              {events.map((event, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{event.year}:</strong> {event.text}
                    {event.pages?.[0]?.content_urls?.desktop?.page && (
                      <a
                        href={event.pages[0].content_urls.desktop.page}
                        target="_blank"
                        rel="noreferrer"
                        className="ms-2"
                      >
                        🔗
                      </a>
                    )}
                  </div>
                  <button className="btn btn-outline-success btn-sm" onClick={() => handleSave(event)}>
                    💾 Save
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default History;


