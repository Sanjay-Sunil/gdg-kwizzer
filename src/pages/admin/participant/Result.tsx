import { useNavigate } from 'react-router-dom';
import '../../../styles/result.css';

function Result() {
  const navigate = useNavigate();
  const playerName = sessionStorage.getItem('playerName') || 'Player';
  const finalScore = sessionStorage.getItem('finalScore') || '0';
  const totalQuestions = 5;

  const percentage = (parseInt(finalScore) / totalQuestions) * 100;

  const handlePlayAgain = () => {
    sessionStorage.clear();
    navigate('/participant/join');
  };

  const handleGoHome = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const getEmoji = () => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '😊';
    return '😔';
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-emoji">{getEmoji()}</div>

        <h1 className="result-title">Quiz Completed!</h1>

        <p className="result-subtitle">Great job, {playerName}!</p>

        <div className="result-score-card">
          <div className="result-score-big">
            {finalScore}/{totalQuestions}
          </div>
          <div className="result-percentage">
            {percentage.toFixed(0)}% Correct
          </div>
        </div>

        <div className="result-actions">
          <button className="result-button primary" onClick={handlePlayAgain}>
            Play Again
          </button>
          <button className="result-button secondary" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;