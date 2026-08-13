import { useState } from "react";

function AdminExams() {
  const [exams, setExams] = useState([
    {
      id: 1,
      code: "CS301",
      name: "Web Design & Development",
      month: 3,
      duration: 60,
      questions: 30,
      status: "Available",
    },
    {
      id: 2,
      code: "CS302",
      name: "Computer Networks",
      month: 3,
      duration: 60,
      questions: 25,
      status: "Closed",
    },
  ]);

  const toggleStatus = (id) => {
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
    <div className="admin-page-content">

      <div className="admin-page-title">

        <div>
          <h1>Exams</h1>
          <p>
            Create and control online examinations.
          </p>
        </div>

        <button className="primary-btn">
          + Create Exam
        </button>

      </div>

      <div className="admin-section">

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Month</th>
                <th>Duration</th>
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

                  <td>Month {exam.month}</td>

                  <td>{exam.duration} min</td>

                  <td>{exam.questions}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        exam.status === "Available"
                          ? "available"
                          : "closed"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="admin-action-btn"
                      onClick={() =>
                        toggleStatus(exam.id)
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

      </div>

    </div>
  );
}

export default AdminExams;