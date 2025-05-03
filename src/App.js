import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './App.css';
import logo from './logo.svg';
import Register from './Register';
import Login from './Login';
import Chat from './Chat';
import EmergencyContacts from './EmergencyContacts';
import MentalHealthInfo from './MentalHealthInfo';
import BreathingExercises from './BreathingExercises';
import PeerSupportGroupChat from './PeerSupportGroupChat';
import MoodTracker from './MoodTracker';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth(token);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(null);
    console.log('User logged out');
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className={`App ${!auth ? 'auth-bg' : 'chat-bg'}`}>
        {auth && (
          <>
            <div className="menu-icon" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            <div className="logout-icon" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </div>
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
              <div className="menu-header">
                <h1>MindMentor</h1>
              </div>
              <ul>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/emergency">Emergency Contacts</Link></li>
                <li><Link to="/info">What is Mental Health?</Link></li>
                <li><Link to="/breathing">Breathing Exercises</Link></li>
                <li><Link to="/groupchat">Peer Support Group Chat</Link></li>
                <li><Link to="/moodtracker">Mood Tracker</Link></li>
                <li><a href="https://www.mentalhealth.org/">Mental Health Foundation</a></li>
                <li><a href="https://www.mind.org.uk/">Mind</a></li>
              </ul>
            </div>
          </>
        )}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          {!auth ? (
            <div className="auth-container">
              {showLogin ? (
                <>
                  <Login setAuth={setAuth} />
                  <div className="toggle-container">
                    <p>
                      Don't have an account?{" "}
                      <Link
                        to="#"
                        className="toggle-link"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleForm();
                        }}
                      >
                        Register here
                      </Link>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Register />
                  <div className="toggle-container">
                    <p>
                      Already have an account?{" "}
                      <Link
                        to="#"
                        className="toggle-link"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleForm();
                        }}
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Routes>
              <Route path="/chat" element={<Chat />} />
              <Route path="/emergency" element={<EmergencyContacts />} />
              <Route path="/info" element={<MentalHealthInfo />} />
              <Route path="/breathing" element={<BreathingExercises />} />
              <Route path="/groupchat" element={<PeerSupportGroupChat />} />
              <Route path="/moodtracker" element={<MoodTracker />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
