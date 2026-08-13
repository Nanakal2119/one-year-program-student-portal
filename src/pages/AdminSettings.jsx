import { useState } from "react";

function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const saveSettings = (e) => {
    e.preventDefault();
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="admin-page-content">

      <div className="admin-page-title">
        <div>
          <h1>Settings</h1>
          <p>
            Configure your administration portal.
          </p>
        </div>
      </div>

      <div className="admin-form-card">

        <form onSubmit={saveSettings}>

          <h2>Institution Information</h2>

          <label>Institution Name</label>

          <input
            defaultValue="Kal Institution"
          />

          <label>Administrator Email</label>

          <input
            type="email"
            defaultValue="admin@institution.edu"
          />

          <h2 className="settings-heading">
            Examination Settings
          </h2>

          <label>Passing Score (%)</label>

          <input
            type="number"
            defaultValue="50"
            min="1"
            max="100"
          />

          <label>Default Exam Duration (minutes)</label>

          <input
            type="number"
            defaultValue="60"
            min="1"
          />

          <button className="primary-btn">
            Save Settings
          </button>

          {saved && (
            <span className="save-message">
              Settings saved successfully.
            </span>
          )}

        </form>

      </div>

    </div>
  );
}

export default AdminSettings;