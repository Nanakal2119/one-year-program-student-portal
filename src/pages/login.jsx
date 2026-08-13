import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "../data/mockStudents";

function Login() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    console.log("=== LOGIN DEBUG ===");
    console.log("All students:", students);
    console.log("Looking for ID:", studentId.trim());
    
    // Find the student by ID
    const student = students.find(s => s.id === studentId.trim());
    
    console.log("Found student:", student);

    if (!student) {
      setError("Student ID not found. Please check your ID.");
      return;
    }

    console.log("Entered password:", password.trim());
    console.log("Student password:", student.password);

    if (password.trim() === student.password) {
      // Store login info
      localStorage.setItem("studentLoggedIn", "true");
      localStorage.setItem("loggedInStudentId", student.id);
      localStorage.setItem("studentName", student.name);
      localStorage.setItem("studentEmail", student.email);
      
      console.log("✅ Login successful for:", student.name);
      navigate("/");
    } else {
      setError("Invalid password. Please try again.");
      console.log("❌ Password mismatch");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">K</div>
        <h1>Student Portal</h1>
        <p className="login-subtitle">Sign in to access your academic portal</p>

        <form onSubmit={handleLogin}>
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Enter your student ID (e.g., CS2026-001)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn">Sign In</button>
        </form>

        <div className="login-help" style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold', color: '#2563eb' }}>
            Demo Credentials:
          </p>
          {students.map((s) => (
            <p key={s.id} style={{ margin: '3px 0', fontSize: '13px', color: '#6b7280' }}>
              <strong>{s.id}</strong> / {s.password}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;