import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!studentId.trim() || !password.trim()) {
      setError(
        "Please enter your Student ID and password."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://one-year-program-server.vercel.app/api/students/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            studentId:
              studentId.trim(),

            password:
              password.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to log in."
        );

        return;
      }

      /* =========================
         SAVE LOGGED-IN STUDENT
      ========================= */

      localStorage.setItem(
        "studentLoggedIn",
        "true"
      );

      localStorage.setItem(
        "loggedInStudentId",
        data.student.studentId
      );

      localStorage.setItem(
        "studentDatabaseId",
        data.student.id
      );

      localStorage.setItem(
        "studentName",
        data.student.name
      );

      localStorage.setItem(
        "studentEmail",
        data.student.email
      );

      /* =========================
         SAVE COMPLETE STUDENT
      ========================= */

      localStorage.setItem(
        "currentStudent",
        JSON.stringify(
          data.student
        )
      );

      console.log(
        "Login successful:",
        data.student
      );

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          K
        </div>

        <h1>
          Student Portal
        </h1>

        <p className="login-subtitle">
          Sign in to access your academic portal
        </p>

        <form
          onSubmit={handleLogin}
        >

          <label>
            Student ID
          </label>

          <input
            type="text"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) =>
              setStudentId(
                e.target.value
              )
            }
            disabled={loading}
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            disabled={loading}
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <div
          className="login-help"
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <p
            style={{
              margin: "5px 0",
              fontSize: "13px",
              color: "#6b7280",
            }}
          >
            Your Student ID and password are provided after your registration is approved.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;
