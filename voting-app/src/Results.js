import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling
import { Fireworks } from 'fireworks-js';

function Results() {
  const [results, setResults] = useState({});
  const fireworkRef = useRef(null); // ref를 생성하여 fireworkDiv에 연결

  const fetchResults = async () => {
    try {
      console.log('Fetching results...'); // Log for debugging
      const response = await axios.get('http://localhost:3001/results');
      setResults(response.data);
      console.log('Results fetched:', response.data); // Log for debugging
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchResults();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fireworkRef.current) {
      const fireworks = new Fireworks(fireworkRef.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        rocketsPoint: { min: 0, max: 100 },
        lineWidth: {
          explosion: { min: 1, max: 3 },
          trace: { min: 1, max: 2 }
        },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 }
      });

      fireworks.start();

      return () => {
        fireworks.stop(); // 컴포넌트가 언마운트될 때 불꽃 효과 중지
      };
    }
  }, []);

  const getCandidatePosition = (candidate) => {
    const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);
    const candidateVotes = results[candidate] || 0;
    return Math.min((candidateVotes / totalVotes) * 90, 90); // Ensure the value is within 0-90% to keep it on screen
  };

  return (
    <div className="fireworkDiv" ref={fireworkRef}>
      <div className="container amusement-park">
        <div className="card glassmorphism-card">
          <h2>Real-Time Results</h2>
          <div className="race-track">
            {Object.keys(results).map((candidate) => (
              <div
                key={candidate}
                className="candidate-car"
                style={{
                  left: `${getCandidatePosition(candidate)}%`,
                }}
              >
                {candidate}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
