import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const examQuestions = [
  {
    question:
      "Which language is primarily used to structure web pages?",
    options: ["CSS", "HTML", "JavaScript", "Python"],
    answer: 1,
  },

  {
    question:
      "Which protocol is commonly used to transfer web pages?",
    options: ["HTTP", "FTP", "SMTP", "SSH"],
    answer: 0,
  },

  {
    question:
      "Which data structure follows the FIFO principle?",
    options: ["Stack", "Tree", "Queue", "Graph"],
    answer: 2,
  },

  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "System Query Language",
      "Simple Question Language",
      "Structured Question Logic",
    ],
    answer: 0,
  },

  {
    question:
      "Which technology is used to create reusable UI components?",
    options: ["React", "MySQL", "MongoDB", "Express"],
    answer: 0,
  },
];

function TakeExam() {
  const navigate = useNavigate();
  const { code } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState(
    Array(examQuestions.length).fill(null)
  );

  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const [submitted, setSubmitted] = useState(false);

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // =========================
  // FORMAT TIMER
  // =========================

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // =========================
  // SELECT ANSWER
  // =========================

  const selectAnswer = (index) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = index;

    setAnswers(updatedAnswers);
  };

  // =========================
  // NEXT
  // =========================

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // =========================
  // PREVIOUS
  // =========================

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // =========================
  // SUBMIT EXAM
  // =========================

  const submitExam = () => {
    if (submitted) return;

    setSubmitted(true);

    let score = 0;

    answers.forEach((answer, index) => {
      if (answer === examQuestions[index].answer) {
        score++;
      }
    });

    const percentage = Math.round(
      (score / examQuestions.length) * 100
    );

    // Determine grade
    let grade;

    if (percentage >= 90) {
      grade = "A+";
    } else if (percentage >= 85) {
      grade = "A";
    } else if (percentage >= 80) {
      grade = "A-";
    } else if (percentage >= 75) {
      grade = "B+";
    } else if (percentage >= 70) {
      grade = "B";
    } else if (percentage >= 65) {
      grade = "B-";
    } else if (percentage >= 60) {
      grade = "C+";
    } else if (percentage >= 50) {
      grade = "C";
    } else {
      grade = "F";
    }

    // Save result for this exam
    const result = {
      code,
      course:
        code === "CS301"
          ? "Web Design and Development"
          : code,
      score: percentage,
      correctAnswers: score,
      totalQuestions: examQuestions.length,
      grade,
      submittedAt: new Date().toISOString(),
    };

    // Save individual result
    sessionStorage.setItem(
      `examResult_${code}`,
      JSON.stringify(result)
    );

    // Also save as last result
    localStorage.setItem(
      "lastExamResult",
      JSON.stringify(result)
    );

    // Go to result page
    navigate(`/exam-result?code=${code}`);
  };

  const question = examQuestions[currentQuestion];

  return (
    <div className="exam-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="exam-header">

        <div>
          <strong>Web Design Examination</strong>
          <small>{code}</small>
        </div>

        <div className="exam-timer">
          ⏱ {formatTime()}
        </div>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main className="exam-container">

        {/* PROGRESS */}

        <div className="exam-progress">

          <span>
            Question {currentQuestion + 1} of{" "}
            {examQuestions.length}
          </span>

          <div className="exam-progress-bar">

            <div
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    examQuestions.length) *
                  100
                }%`,
              }}
            />

          </div>

        </div>


        {/* QUESTION */}

        <div className="question-card">

          <h2>
            {currentQuestion + 1}.{" "}
            {question.question}
          </h2>


          <div className="options">

            {question.options.map((option, index) => (

              <button
                key={index}
                type="button"
                className={
                  answers[currentQuestion] === index
                    ? "option selected"
                    : "option"
                }
                onClick={() =>
                  selectAnswer(index)
                }
              >

                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                {option}

              </button>

            ))}

          </div>

        </div>


        {/* NAVIGATION */}

        <div className="exam-navigation">

          <button
            type="button"
            className="outline-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>


          {currentQuestion <
          examQuestions.length - 1 ? (

            <button
              type="button"
              className="primary-btn"
              onClick={nextQuestion}
            >
              Next →
            </button>

          ) : (

            <button
              type="button"
              className="primary-btn"
              onClick={() => {

                const confirmed = window.confirm(
                  "Are you sure you want to submit your exam?"
                );

                if (confirmed) {
                  submitExam();
                }

              }}
            >
              Submit Exam
            </button>

          )}

        </div>

      </main>

    </div>
  );
}

export default TakeExam;
