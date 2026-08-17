import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "../data/mockStudents";

function Login() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const enteredId = studentId.trim();
    const enteredPassword = password.trim();

    if (!enteredId || !enteredPassword) {
      setError("Please enter your Student ID and password.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Find the student.
       * Supports both "id" and "studentId".
       */
      const student = students.find((item) => {
        const id = String(
          item.studentId ||
          item.id ||
          ""
        ).trim();

        return id.toLowerCase() === enteredId.toLowerCase();
      });

      /*
       * TEMPORARY PORTAL LOGIN
       *
       * CS2026-001 / 123456 is always accepted
       * even if the mock student's password field
       * is missing.
       */
      const isDefaultLogin =
        enteredId.toLowerCase() === "cs2026-001" &&
        enteredPassword === "123456";

      /*
       * If it's the default student, create/use
       * the student information.
       */
      if (isDefaultLogin) {
        const defaultStudent =
          student || {
            id: "CS2026-001",
            studentId: "CS2026-001",
            name: "Kalkidan Mehari",
            email: "student@example.com",
            gender: "Female",
            entryYear: 2026,
            phone: "",
            gpa: 0,
            results: []
          };

        localStorage.setItem(
          "studentLoggedIn",
          "true"
        );

        localStorage.setItem(
          "loggedInStudentId",
          "CS2026-001"
        );

        localStorage.setItem(
          "studentName",
          defaultStudent.name || "Kalkidan Mehari"
        );

        localStorage.setItem(
          "studentEmail",
          defaultStudent.email || ""
        );

        localStorage.setItem(
          "studentPassword",
          "123456"
        );

        localStorage.setItem(
          "currentStudent",
          JSON.stringify({
            ...defaultStudent,
            id: "CS2026-001",
            studentId: "CS2026-001",
            password: "123456"
          })
        );

        navigate("/", { replace: true });
        return;
      }

      /*
       * Normal mock-student login.
       */
      if (!student) {
        setError("Invalid Student ID or password.");
        setLoading(false);
        return;
      }

      const storedPassword =
        student.password ||
        student.pass ||
        "123456";

      if (
        String(storedPassword) !==
        String(enteredPassword)
      ) {
        setError("Invalid Student ID or password.");
        setLoading(false);
        return;
      }

      const actualStudentId =
        student.studentId ||
        student.id;

      /*
       * Save login information.
       */
      localStorage.setItem(
        "studentLoggedIn",
        "true"
      );

      localStorage.setItem(
        "loggedInStudentId",
        String(actualStudentId)
      );

      localStorage.setItem(
        "studentName",
        student.name || "Student"
      );

      localStorage.setItem(
        "studentEmail",
        student.email || ""
      );

      localStorage.setItem(
        "studentPassword",
        String(storedPassword)
      );

      localStorage.setItem(
        "currentStudent",
        JSON.stringify(student)
      );

      navigate("/", { replace: true });

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to log in. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <img
            src="/finot-logo.jpg"
            alt="Student Portal"
          />
        </div>

        <div className="login-header">

          <h1>
            Student Portal
          </h1>

          <p>
            እንኳን ወደ ፍኖተ ጽድቅ ሰንበት ት/ቤት
            በደኅና መጡ
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label htmlFor="studentId">
              Student ID
            </label>

            <input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setError("");
              }}
              placeholder="Enter your Student ID"
              autoComplete="username"
              disabled={loading}
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-input-wrapper">

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
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

        <div className="login-footer">

          <p>
            If you have forgotten your password,
            please contact the administration.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
