import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchMoods = async () => {
      const q = query(collection(db, 'moods'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedMoods = [];
      querySnapshot.forEach((doc) => {
        fetchedMoods.push({ ...doc.data(), id: doc.id });
      });
      setMoods(fetchedMoods);
    };

    fetchMoods();
  }, []);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();

    if (mood.trim() === '') return;

    const newMood = {
      mood,
      note,
      date: date.toISOString(),
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'moods'), newMood);
      setMood('');
      setNote('');
      setDate(new Date());
      setMoods((prevMoods) => [newMood, ...prevMoods]);
    } catch (error) {
      console.error('Error logging mood:', error);
    }
  };

  const moodIcons = {
    happy: '😊',
    sad: '😢',
    angry: '😡',
    anxious: '😟',
    neutral: '😐',
  };

  return (
    <div className="mood-tracker-container">
      <form onSubmit={handleMoodSubmit} className="mood-form">
        <div className="mood-input-container">
          <label htmlFor="mood">Mood:</label>
          <select id="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="">Select your mood...</option>
            <option value="happy">Happy 😊</option>
            <option value="sad">Sad 😢</option>
            <option value="angry">Angry 😡</option>
            <option value="anxious">Anxious 😟</option>
            <option value="neutral">Neutral 😐</option>
          </select>
        </div>
        <div className="date-input-container">
          <label htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="note-input-container">
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any notes..."
          />
        </div>
        <button type="submit" className="submit-button">Log Mood</button>
      </form>
      <div className="mood-list">
        <h3>Logged Moods</h3>
        {moods.map((entry) => (
          <div key={entry.id} className="mood-entry">
            <span className="mood-icon">{moodIcons[entry.mood]}</span>
            <span className="mood-date">{new Date(entry.date).toLocaleDateString()}</span>
            <span className="mood-text">{entry.mood}</span>
            <span className="mood-note">{entry.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
