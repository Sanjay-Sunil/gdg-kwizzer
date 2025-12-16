import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/quiz.css';

const DUMMY_QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Saturn"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3
  }
];

const TIMER_SECONDS = 30;

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SECONDS);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const totalQuestions = DUMMY_QUESTIONS.length;
  const question = DUMMY_QUESTIONS[currentQuestion];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(TIMER_SECONDS);
    } else {
      sessionStorage.setItem('finalScore', score.toString());
      navigate('/participant/result');
    }
  };

  const getOptionClass = (index: number) => {
    if (!isAnswered) {
      return selectedOption === index ? 'quiz-option selected' : 'quiz-option';
    }

    if (index === question.correctAnswer) {
      return 'quiz-option correct';
    }
    if (selectedOption === index && index !== question.correctAnswer) {
      return 'quiz-option wrong';
    }
    return 'quiz-option';
  };

  return (
    <div className="quiz-container">
      <div className="quiz-wrapper">
        <div className="quiz-header">
          <div className="quiz-stat">
            Score: <span className="quiz-stat-value score-value">{score}</span>
          </div>
          <div className="quiz-stat">
            Time left: <span className={`quiz-stat-value timer-value ${timeLeft < 10 ? 'warning' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="quiz-card">
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>

          <h2 className="quiz-question">{question.question}</h2>

          <div className="quiz-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={getOptionClass(index)}
                onClick={() => handleOptionSelect(index)}
                disabled={isAnswered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {isAnswered && (
            <button className="quiz-next-button" onClick={handleNext}>
              {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;