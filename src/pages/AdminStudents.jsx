import { useState } from "react";

const initialStudents = [
  {
    id: "CS2026-001",
    name: "Kalkidan Mehari",
    email: "student@example.com",
    month: 4,
    status: "Active",
  },
  {
    id: "CS2026-002",
    name: "Abebe Kebede",
    email: "abebe@example.com",
    month: 4,
    status: "Active",
  },
  {
    id: "CS2026-003",
    name: "Sara Tesfaye",
    email: "sara@example.com",
    month: 3,
    status: "Active",
  },
];

function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : student
      )
    );
  };

  return (
    <div className="admin-page-content">

      <div className="admin-page-title">
        <div>
          <h1>Students</h1>
          <p>Manage registered students.</p>
        </div>

        <button className="primary-btn">
          + Add Student
        </button>
      </div>

      <div className="admin-section">

        <input
          className="admin-search"
          placeholder="Search by student name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Month</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((student) => (
                <tr key={student.id}>

                  <td>
                    <strong>{student.id}</strong>
                  </td>

                  <td>{student.name}</td>

                  <td>{student.email}</td>

                  <td>Month {student.month}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        student.status === "Active"
                          ? "available"
                          : "closed"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="admin-action-btn"
                      onClick={() =>
                        toggleStatus(student.id)
                      }
                    >
                      {student.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminStudents;