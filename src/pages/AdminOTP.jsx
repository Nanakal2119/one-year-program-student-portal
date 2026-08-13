import { useState } from "react";

function AdminOTP() {
  const [otp, setOtp] = useState(null);
  const [expires, setExpires] = useState(null);

  const generateOTP = () => {
    const code = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setOtp(code);

    const expiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    setExpires(expiry);
  };

  return (
    <div className="admin-page-content">

      <div className="admin-page-title">
        <div>
          <h1>Exam OTP</h1>
          <p>
            Generate a one-time password for an examination.
          </p>
        </div>
      </div>

      <div className="otp-admin-card">

        <div className="otp-icon">🔐</div>

        <h2>Exam Access Code</h2>

        <p>
          Generate a temporary six-digit code for students
          taking the examination.
        </p>

        {otp && (
          <>
            <div className="generated-otp">
              {otp}
            </div>

            <p className="otp-expiry">
              Expires at{" "}
              {expires.toLocaleTimeString()}
            </p>
          </>
        )}

        <button
          className="primary-btn"
          onClick={generateOTP}
        >
          {otp ? "Generate New OTP" : "Generate OTP"}
        </button>

      </div>

    </div>
  );
}

export default AdminOTP;