import { useEffect, useState } from "react";

const API = "[http://localhost:5000/api](http://localhost:5000/api)";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

const loadApplications = () => {
  try {
    setLoading(true);

    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(savedApplications);
  } catch (error) {
    console.error("Error loading applications:", error);
    setApplications([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadApplications();
  }, []);

  const approveApplication = async (id) => {
    if (!window.confirm("Approve this application?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/registrations/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Approval failed.");
        return;
      }

      alert(
        `Application approved!\nStudent ID: ${
          data.application?.studentId || "Generated"
        }`
      );

      setSelected(null);
      loadApplications();
    } catch (error) {
      alert("Could not connect to the server.");
    }
  };

  const rejectApplication = async (id) => {
    if (!window.confirm("Reject this application?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/registrations/${id}/reject`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Rejection failed.");
        return;
      }

      alert("Application rejected.");

      setSelected(null);
      loadApplications();
    } catch (error) {
      alert("Could not connect to the server.");
    }
  };

  const pending = applications.filter(
    (app) => app.status === "pending"
  );

  const approved = applications.filter(
    (app) => app.status === "approved"
  );

  const rejected = applications.filter(
    (app) => app.status === "rejected"
  );

return (
  <div className="admin-page-content admin-applications-page">

    {/* HEADER */}
    <div className="admin-page-header">
      <div>
        <span>ADMINISTRATION</span>
        <h1>Applications</h1>
        <p>
          Review and manage student registration applications.
        </p>
      </div>

      <button onClick={loadApplications}>
        ↻ Refresh
      </button>
    </div>


    {/* STATISTICS */}
    <div className="admin-stats">

      <div className="admin-stat">
        <small>Total Applications</small>
        <strong>{applications.length}</strong>
      </div>

      <div className="admin-stat pending">
        <small>Pending</small>
        <strong>{pending.length}</strong>
      </div>

      <div className="admin-stat approved">
        <small>Approved</small>
        <strong>{approved.length}</strong>
      </div>

      <div className="admin-stat rejected">
        <small>Rejected</small>
        <strong>{rejected.length}</strong>
      </div>

    </div>


    {/* APPLICATION TABLE */}
    <div className="admin-table-card">

      <div className="admin-table-header">
        <h2>Registration Applications</h2>

        <p>
          Applications submitted through the registration website.
        </p>
      </div>


      {loading ? (

        <div className="admin-empty">
          Loading applications...
        </div>

      ) : applications.length === 0 ? (

        <div className="admin-empty">
          <h3>No applications yet</h3>

          <p>
            New registrations will appear here.
          </p>
        </div>

      ) : (

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Applicant</th>
                <th>Email</th>
                <th>Program</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((app) => (

                <tr key={app._id || app.id}>

                  <td>
                    <strong>
                      {app.firstName}{" "}
                      {app.middleName || ""}{" "}
                      {app.lastName}
                    </strong>
                  </td>

                  <td>
                    {app.email}
                  </td>

                  <td>
                    {app.program || "One Year Program"}
                  </td>

                  <td>
                    <span
                      className={`application-status ${app.status}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td>

                    <div className="application-actions">

                      <button
                        className="view-btn"
                        onClick={() => setSelected(app)}
                      >
                        View
                      </button>

                      {app.status === "pending" && (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveApplication(
                                app._id || app.id
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectApplication(
                                app._id || app.id
                              )
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>


    {/* APPLICATION DETAILS MODAL */}

    {selected && (

      <div
        className="application-modal-overlay"
        onClick={() => setSelected(null)}
      >

        <div
          className="application-modal"
          onClick={(e) => e.stopPropagation()}
        >

          <div className="application-modal-header">

            <div>
              <small>
                APPLICATION DETAILS
              </small>

              <h2>
                {selected.firstName}{" "}
                {selected.lastName}
              </h2>
            </div>

            <button
              onClick={() => setSelected(null)}
            >
              ×
            </button>

          </div>


          <div className="application-details">

            <Detail
              label="First Name"
              value={selected.firstName}
            />

            <Detail
              label="Middle Name"
              value={selected.middleName}
            />

            <Detail
              label="Last Name"
              value={selected.lastName}
            />

            <Detail
              label="Email"
              value={selected.email}
            />

            <Detail
              label="Phone"
              value={selected.phone}
            />

            <Detail
              label="Gender"
              value={selected.gender}
            />

            <Detail
              label="Date of Birth"
              value={selected.birthDate}
            />

            <Detail
              label="Address"
              value={selected.address}
            />

            <Detail
              label="Previous Education"
              value={selected.previousEducation}
            />

            <Detail
              label="Institution"
              value={selected.institution}
            />

            <Detail
              label="Graduation Year"
              value={selected.graduationYear}
            />

            <Detail
              label="Program"
              value={selected.program}
            />

            <div>
              <label>Status</label>

              <span
                className={`application-status ${selected.status}`}
              >
                {selected.status}
              </span>
            </div>

          </div>


          {selected.status === "pending" && (

            <div className="application-modal-actions">

              <button
                className="reject-large"
                onClick={() =>
                  rejectApplication(
                    selected._id || selected.id
                  )
                }
              >
                Reject Application
              </button>

              <button
                className="approve-large"
                onClick={() =>
                  approveApplication(
                    selected._id || selected.id
                  )
                }
              >
                Approve Application
              </button>

            </div>

          )}

        </div>

      </div>

    )}

  </div>
);
}

function Detail({ label, value }) {
  return (
    <div>
      <label>{label}</label>
      <p>{value || "—"}</p>
    </div>
  );
}

