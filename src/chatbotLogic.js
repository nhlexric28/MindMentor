import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './App.css';
import { FaPaperPlane, FaTrashAlt } from 'react-icons/fa';

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

  const getResponse = (userMessage) => {
    userMessage = userMessage.toLowerCase();

    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      return 'Hello! How are you today? 😊';
    } else if (userMessage.includes('sad') || userMessage.includes('down') || userMessage.includes('depressed')) {
      return 'I\'m sorry to hear that you\'re feeling this way. Do you want to talk more about what’s been going on?';
    } else if (userMessage.includes('happy') || userMessage.includes('good')) {
      return 'I\'m glad to hear that! Is there something in particular that made your day better?';
    } else if (userMessage.includes('anxious') || userMessage.includes('worried') || userMessage.includes('nervous')) {
      return 'It\'s okay to feel anxious sometimes. Would you like some tips on how to manage anxiety?';
    } else if (userMessage.includes('thank you') || userMessage.includes('thanks')) {
      return 'You’re welcome! I’m here whenever you need to chat. 😊';
    } else if (userMessage.includes('goodbye') || userMessage.includes('bye')) {
      return 'Goodbye! Take care and have a great day!';
    } else if (userMessage.includes('help') || userMessage.includes('support')) {
      return 'I\'m here to help! What do you need assistance with?';
    } else if (userMessage.includes('love') || userMessage.includes('relationship')) {
      return 'Love is a powerful emotion. Do you want to share more about it?';
    } else if (userMessage.includes('angry') || userMessage.includes('mad') || userMessage.includes('frustrated')) {
      return 'It\'s okay to feel angry sometimes. Do you want some tips on how to handle anger constructively?';
    } else if (userMessage.includes('bored') || userMessage.includes('nothing to do')) {
      return 'Feeling bored? How about we brainstorm some fun activities to do!';
    } else if (userMessage.includes('hungry') || userMessage.includes('starving')) {
      return 'Got the munchies? Maybe it’s time for a delicious snack!';
    } else if (userMessage.includes('tired') || userMessage.includes('exhausted')) {
      return 'Feeling tired? Remember to take breaks and get some rest. Would you like some tips on how to improve your sleep?';
    } else if (userMessage.includes('excited') || userMessage.includes('thrilled')) {
      return 'Excitement is contagious! What are you looking forward to?';
    } else if (userMessage.includes('yes') && prevMessage.includes('tips')) {
      return getTips(prevMessage);
    } else {
      return 'Tell me more about how you’re feeling.';
    }
  };

  const getTips = (prevMessage) => {
    if (prevMessage.includes('anxiety')) {
      return 'Here are some tips to manage anxiety: 1. Practice deep breathing exercises. 2. Engage in physical activity. 3. Try mindfulness meditation. 4. Talk to a friend or therapist.';
    } else if (prevMessage.includes('anger')) {
      return 'Here are some tips to handle anger: 1. Take deep breaths and count to ten. 2. Take a break and step away from the situation. 3. Use “I” statements to express your feelings. 4. Engage in physical activity to release tension.';
    } else if (prevMessage.includes('sleep')) {
      return 'Here are some tips to improve sleep: 1. Stick to a consistent sleep schedule. 2. Create a relaxing bedtime routine. 3. Avoid caffeine and heavy meals before bed. 4. Make your bedroom comfortable and sleep-friendly.';
    } else {
      return 'I’m here to help with anything you need.';
    }
  };

  let prevMessage = '';

  const handleSend = async () => {
    if (input.trim() !== '' && !isSending) {
      setIsSending(true);
      const newMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };

      try {
        await addDoc(collection(db, 'messages'), newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');

        prevMessage = input.toLowerCase();
        const botResponseText = getResponse(prevMessage);
        setTimeout(async () => {
          const botResponse = {
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };

          await addDoc(collection(db, 'messages'), botResponse);
          setMessages((prevMessages) => [...prevMessages, botResponse]);
          setIsSending(false);
        }, 1000);
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
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isSending} // Disable input while sending
        />
        <button onClick={handleSend} className="send-button" disabled={isSending}>
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
