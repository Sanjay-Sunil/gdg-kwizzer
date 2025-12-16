import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/join.css';

function Join() {
  const [gameCode, setGameCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (gameCode && name) {
      sessionStorage.setItem('playerName', name);
      sessionStorage.setItem('gameCode', gameCode);
      navigate('/participant/quiz');
    }
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <h2 className="join-title">Join Quiz</h2>
        
        <div className="join-form-group">
          <label className="join-label">Enter Game Code</label>
          <input
            type="text"
            className="join-input code-input"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            placeholder="ABC123"
            maxLength={6}
          />
        </div>

        <div className="join-form-group">
          <label className="join-label">Enter Your Name</label>
          <input
            type="text"
            className="join-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>

        <button
          className="join-button"
          onClick={handleJoin}
          disabled={!gameCode || !name}
        >
          Enter Game
        </button>
      </div>
    </div>
  );
}

export default Join;