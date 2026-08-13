import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-page">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-logo">K</div>

          <div>
            <strong>Kal Institution</strong>
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

          <NavLink to="/admin/applications">
            📄 Applications
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

      <Outlet />

    </div>
  );
}

export default AdminLayout;