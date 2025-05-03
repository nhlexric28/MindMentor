import React from 'react';
import './App.css';

const MentalHealthInfo = () => (
  <div className="card-container">
    <div className="card">
      <div className="card-front">
        <h2>What is Mental Health?</h2>
      </div>
      <div className="card-back">
        <p>
          Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. Mental health is important at every stage of life, from childhood and adolescence through adulthood.
        </p>
      </div>
    </div>
    <div className="card">
      <div className="card-front">
        <h2>Common Mental Health Issues</h2>
      </div>
      <div className="card-back">
        <p>
          Common mental health issues include <b>anxiety</b>, <b>depression</b>, and <b>bipolar disorder</b>. It's important to recognize the signs and seek help when needed.
        </p>
      </div>
    </div>
    <div className="card">
      <div className="card-front">
        <h2>Maintaining Mental Health</h2>
      </div>
      <div className="card-back">
        <p>
          Maintaining mental health involves <b>regular physical activity</b>, <b>socializing</b>, <b>managing stress</b>, and <b>seeking professional help</b>. when necessary.
        </p>
      </div>
    </div>
  </div>
);

export default MentalHealthInfo;
