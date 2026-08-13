import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ExamOTP() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Temporary OTP
  const correctOTP = "123456";

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");

    if (otp === correctOTP) {
      sessionStorage.setItem(`examVerified_${code}`, "true");

      navigate(`/exam/${code}`);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="exam-otp-page">

      <div className="exam-otp-card">

        <div className="otp-icon">
          🔐
        </div>

        <h1>Exam Verification</h1>

        <p>
          Enter the OTP provided by the administration
          to access this examination.
        </p>

        <div className="exam-code">
          {code}
        </div>

        <form onSubmit={handleVerify}>

          <label>Enter OTP</label>

          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
          />

          {error && (
            <div className="otp-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-btn"
          >
            Verify & Continue
          </button>

        </form>

        <div className="otp-demo">
          <strong>Demo OTP</strong>
          <span>123456</span>
        </div>

      </div>

    </div>
  );
}

export default ExamOTP;