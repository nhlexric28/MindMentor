import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { FaPaperPlane, FaTrashAlt } from 'react-icons/fa';
import './App.css';

// Define fetchAIResponse function
const fetchAIResponse = async (prompt) => {
  try {
    const response = await fetch('http://localhost:5000/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    console.log('AI server response:', data); // Log response from Flask server
    return data.response || "I'm sorry, I can't respond right now.";
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return "I'm sorry, I can't respond right now.";
  }
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(q);
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    };

    fetchMessages();
  }, []);

  const handleSend = async (message) => {
    if (message.trim() !== '' && !isSending) {
      setIsSending(true);
      const newMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };

      try {
        await addDoc(collection(db, 'messages'), newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');

        const botResponseText = await fetchAIResponse(message); // Fetch response from AI
        const botResponse = {
          text: botResponseText,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };

        await addDoc(collection(db, 'messages'), botResponse);
        setMessages((prevMessages) => [...prevMessages, botResponse]);

        setIsSending(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsSending(false);
      }
    }
  };

  const clearMessages = async () => {
    const q = query(collection(db, 'messages'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setMessages([]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          disabled={isSending} // Disable input while sending
          placeholder="Type your message here..."
        />
        <button onClick={() => handleSend(input)} className="send-button" disabled={isSending}>
          {isSending ? 'Sending...' : <FaPaperPlane />}
        </button>
        <button onClick={clearMessages} className="clear-button">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Chat;