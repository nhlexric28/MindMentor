import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './App.css';
import { FaPaperPlane } from 'react-icons/fa';

const PeerSupportGroupChat = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const q = query(collection(db, `groupMessages_${chatRoomId}`), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSend = async () => {
    if (input.trim() !== '' && !isSending) {
      setIsSending(true);
      const newMessage = {
        text: input,
        sender: 'Anonymous',
        timestamp: serverTimestamp()
      };

      try {
        await addDoc(collection(db, `groupMessages_${chatRoomId}`), newMessage);
        setInput('');
        setIsSending(false);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsSending(false);
      }
    }
  };

  return (
    <div className="group-chat-container">
      <h2>Peer Support Group Chat</h2>
      <div className="group-chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="group-message">
            <span className="group-sender">{msg.sender}</span>
            <span className="group-text">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="group-chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isSending} // Disable input while sending
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="send-button" disabled={isSending}>
          {isSending ? 'Sending...' : <FaPaperPlane />}
        </button>
      </div>
    </div>
  );
};

export default PeerSupportGroupChat;
