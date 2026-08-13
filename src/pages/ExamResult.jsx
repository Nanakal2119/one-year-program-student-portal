import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

function ExamResult() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem(
      `examResult_${code}`
    );

    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, [code]);

  if (!result) {
    return (
      <div className="result-empty">
        <h2>Result Not Found</h2>
        <p>No result is available for this examination.</p>

        <NavLink to="/results" className="primary-btn">
          View Results
        </NavLink>
      </div>
    );
  }

  return (
    <div className="exam-result-page">

      <div className="exam-result-card">

        <div className="result-success-icon">
          ✓
        </div>

        <h1>Exam Completed</h1>

        <p className="result-subtitle">
          Your examination has been submitted successfully.
        </p>

        <div className="result-course">
          <span>Course</span>
          <strong>{result.code}</strong>
        </div>

        <div className="result-score">
          <span>Your Score</span>
          <strong>{result.score}%</strong>
        </div>

        <div className="result-grade">
          <span>Grade</span>
          <strong>{result.grade}</strong>
        </div>

        <div className="result-actions">
          <NavLink
            to="/results"
            className="primary-btn"
          >
            View All Results
          </NavLink>

          <NavLink
            to="/"
            className="outline-btn"
          >
            Back to Dashboard
          </NavLink>
        </div>

      </div>

    </div>
  );
}

export default ExamResult;