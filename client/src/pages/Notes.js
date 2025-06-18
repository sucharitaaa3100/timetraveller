import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Notes() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(stored);
  }, []);

  const saveNote = () => {
    if (!title.trim() || !body.trim()) return;

    const newNote = {
      id: Date.now(),
      title,
      body,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('notes', JSON.stringify(updated));

    setTitle('');
    setBody('');
  };

  const deleteNote = (id) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
    localStorage.setItem('notes', JSON.stringify(updated));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">🗒️ My Notes</h2>

        <div className="mb-4 w-75 mx-auto">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Write your note here..."
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={saveNote}>
            💾 Save Note
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-muted">No notes saved yet.</p>
        ) : (
          <div className="row">
            {notes.map((note) => (
              <div key={note.id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.body}</p>
                  </div>
                  <div className="card-footer text-end">
                    <button className="btn btn-sm btn-danger" onClick={() => deleteNote(note.id)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Notes;

