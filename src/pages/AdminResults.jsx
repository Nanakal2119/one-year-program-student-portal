const results = [
  {
    id: "CS2026-001",
    student: "Kalkidan Mehari",
    exam: "Web Design & Development",
    score: 85,
    grade: "A",
    status: "Passed",
  },
  {
    id: "CS2026-002",
    student: "Abebe Kebede",
    exam: "Web Design & Development",
    score: 72,
    grade: "B",
    status: "Passed",
  },
  {
    id: "CS2026-003",
    student: "Sara Tesfaye",
    exam: "Computer Networks",
    score: 48,
    grade: "F",
    status: "Failed",
  },
];

function AdminResults() {
  return (
    <div className="admin-page-content">

      <div className="admin-page-title">

        <div>
          <h1>Results</h1>
          <p>
            View examination results and performance.
          </p>
        </div>

        <button className="primary-btn">
          Export Results
        </button>

      </div>

      <div className="admin-section">

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student</th>
                <th>Exam</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {results.map((result) => (

                <tr key={result.id}>

                  <td>{result.id}</td>

                  <td>
                    <strong>{result.student}</strong>
                  </td>

                  <td>{result.exam}</td>

                  <td>{result.score}%</td>

                  <td>
                    <strong>{result.grade}</strong>
                  </td>

                  <td>

                    <span
                      className={`admin-status ${
                        result.status === "Passed"
                          ? "available"
                          : "closed"
                      }`}
                    >
                      {result.status}
                    </span>

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

export default AdminResults;