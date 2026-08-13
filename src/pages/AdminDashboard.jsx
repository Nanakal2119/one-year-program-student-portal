import { useState } from "react";
import { NavLink } from "react-router-dom";

const initialExams = [
  {
    id: 1,
    code: "CS301",
    name: "Web Design & Development",
    date: "Aug 15, 2026",
    status: "Available",
    questions: 30,
  },
  {
    id: 2,
    code: "CS302",
    name: "Computer Networks",
    date: "Aug 20, 2026",
    status: "Scheduled",
    questions: 25,
  },
  {
    id: 3,
    code: "CS303",
    name: "Statistics & Probability",
    date: "Aug 25, 2026",
    status: "Closed",
    questions: 30,
  },
];

function AdminDashboard() {
  const [exams, setExams] = useState(initialExams);

  const toggleExam = (id) => {
    setExams(
      exams.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              status:
                exam.status === "Available"
                  ? "Closed"
                  : "Available",
            }
          : exam
      )
    );
  };

  return (
    <div className="admin-page">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-logo">K</div>

          <div>
            <strong>የአ/አ/ቅ/ኪ/ካ/ፍ/ጽ/ሰ/ት/ቤት</strong>
            <small>Administration</small>
          </div>
        </div>

        <nav className="admin-nav">

  <NavLink to="/admin">
    📊 Dashboard
  </NavLink>

  <NavLink to="/admin/students">
    👨‍🎓 Students
  </NavLink>

  <NavLink to="/admin/courses">
    📚 Courses
  </NavLink>

  <NavLink to="/admin/exams">
    📝 Exams
  </NavLink>

  <NavLink to="/admin/questions">
    ❓ Questions
  </NavLink>

  <NavLink to="/admin/otp">
    🔐 Exam OTP
  </NavLink>

  <NavLink to="/admin/results">
    📈 Results
  </NavLink>

</nav>
        <div className="admin-sidebar-bottom">

          <NavLink to="/admin/settings">
            ⚙️ Settings
          </NavLink>

          <NavLink to="/login">
            🚪 Logout
          </NavLink>

        </div>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        <header className="admin-header">

          <div>
            <h1>Admin Dashboard</h1>

            <p>
              Manage students, courses and examinations.
            </p>
          </div>

          <div className="admin-user">
            <div className="admin-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <small>Super Admin</small>
            </div>
          </div>

        </header>

        {/* STATISTICS */}

        <section className="admin-stats">

          <div className="admin-stat">
            <span>👨‍🎓</span>

            <div>
              <small>Total Students</small>
              <strong>1,248</strong>
            </div>
          </div>

          <div className="admin-stat">
            <span>📚</span>

            <div>
              <small>Total Courses</small>
              <strong>42</strong>
            </div>
          </div>

          <div className="admin-stat">
            <span>📝</span>

            <div>
              <small>Total Exams</small>
              <strong>18</strong>
            </div>
          </div>

          <div className="admin-stat">
            <span>📊</span>

            <div>
              <small>Completed Exams</small>
              <strong>856</strong>
            </div>
          </div>

        </section>

        {/* EXAMS */}

        <section className="admin-section">

          <div className="section-heading">

            <div>
              <h2>Exam Management</h2>
              <p>
                Control examination availability.
              </p>
            </div>

            <button className="primary-btn">
              + Create Exam
            </button>

          </div>

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Date</th>
                  <th>Questions</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {exams.map((exam) => (

                  <tr key={exam.id}>

                    <td>
                      <strong>{exam.name}</strong>
                    </td>

                    <td>{exam.code}</td>

                    <td>{exam.date}</td>

                    <td>{exam.questions}</td>

                    <td>

                      <span
                        className={`admin-status ${exam.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {exam.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="admin-action-btn"
                        onClick={() =>
                          toggleExam(exam.id)
                        }
                      >
                        {exam.status === "Available"
                          ? "Close"
                          : "Open"}
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="admin-section">

          <div className="section-heading">

            <div>
              <h2>Quick Actions</h2>
              <p>Common administrative tasks.</p>
            </div>

          </div>

          <div className="admin-actions">

            <button>
              👨‍🎓
              <strong>Manage Students</strong>
              <small>View and manage students</small>
            </button>

            <button>
              📚
              <strong>Manage Courses</strong>
              <small>Manage the 11-month curriculum</small>
            </button>

            <button>
              🔐
              <strong>Generate OTP</strong>
              <small>Generate exam access codes</small>
            </button>

            <button>
              📈
              <strong>View Results</strong>
              <small>Review examination results</small>
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;