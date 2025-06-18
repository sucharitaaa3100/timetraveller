import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function History() {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);

  const fetchHistory = async () => {
    if (!selectedDate) return;

    const date = new Date(selectedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

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

    // Avoid duplicates
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
        <p className="lead">Pick a date to see what happened in history.</p>

        <div className="mt-4">
          <input
            type="date"
            className="form-control w-50 mx-auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button className="btn btn-primary mt-3" onClick={fetchHistory}>
            Search
          </button>
        </div>

        {events.length > 0 && (
          <div className="mt-5 text-start w-75 mx-auto">
            <h4 className="mb-3">🕰 Events on {selectedDate}:</h4>
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


