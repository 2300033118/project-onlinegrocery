import React, { useState, useEffect } from 'react';
import './Prehome.css';
import backgroundVideo from './Static/prehome1.mp4'; 
import { useNavigate } from 'react-router-dom';

export default function Prehome() {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState(true);
  const fullText = 'Grocery Store';
  const [buttonHover, setButtonHover] = useState(false);
  const navigate = useNavigate(); // ⬅️ React Router navigation hook

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setInterval(() => setCursor(prev => !prev), 400);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="video-background">
      <video autoPlay loop muted playsInline className="video">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      
      <div className="content">
        <h1 className="typing-text">
          {text}
          <span className={`cursor ${cursor ? 'visible' : ''}`}>|</span>
        </h1>
        <p className="subtitle">Buy Fresh groceries delivered to your doorstep</p>
        <button
          onClick={() => navigate('/signup')} 
          className={`get-started-btn ${buttonHover ? 'hover' : ''}`}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
