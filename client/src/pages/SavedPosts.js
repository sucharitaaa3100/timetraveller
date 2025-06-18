import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(stored);
  }, []);

  const removeItem = (index) => {
    const updated = [...savedItems];
    updated.splice(index, 1);
    setSavedItems(updated);
    localStorage.setItem('savedItems', JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">📁 Your Saved History & Weather</h2>

        {savedItems.length === 0 ? (
          <p className="lead">You haven't saved anything yet.</p>
        ) : (
          <ul className="list-group text-start w-75 mx-auto">
            {savedItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <strong>{item.type === 'event' ? `${item.year}:` : item.city}</strong> {item.text}
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => removeItem(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Saved;

