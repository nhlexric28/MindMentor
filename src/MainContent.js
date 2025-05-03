import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import './DailyAffirmations.css';

const DailyAffirmations = ({ userId }) => {
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [affirmations, setAffirmations] = useState('');

  useEffect(() => {
    const fetchAffirmations = async () => {
      const q = query(collection(db, 'affirmations'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setTime(data.time);
        setFrequency(data.frequency);
      }
    };

    fetchAffirmations();
  }, [userId]);

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'affirmations'), {
        userId,
        time,
        frequency,
      });
      alert('Preferences saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Error saving preferences');
    }
  };

  return (
    <div className="affirmations-container">
      <h2>Daily Affirmations</h2>
      <div className="input-group">
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Frequency:</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DailyAffirmations;
