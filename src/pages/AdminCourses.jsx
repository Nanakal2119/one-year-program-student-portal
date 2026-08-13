import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    month: 1,
    code: "CS101",
    name: "Introduction to Programming",
    instructor: "Mr. Daniel",
    status: "Active",
  },
  {
    id: 2,
    month: 1,
    code: "CS102",
    name: "Computer Fundamentals",
    instructor: "Ms. Hana",
    status: "Active",
  },
  {
    id: 3,
    month: 2,
    code: "CS201",
    name: "Data Structures",
    instructor: "Mr. Daniel",
    status: "Active",
  },
  {
    id: 4,
    month: 2,
    code: "CS202",
    name: "Database Systems",
    instructor: "Dr. Abel",
    status: "Active",
  },
  {
    id: 5,
    month: 3,
    code: "CS301",
    name: "Web Design & Development",
    instructor: "Ms. Sara",
    status: "Active",
  },
  {
    id: 6,
    month: 3,
    code: "CS302",
    name: "Computer Networks",
    instructor: "Mr. Dawit",
    status: "Active",
  },
  {
    id: 7,
    month: 4,
    code: "CS401",
    name: "Software Engineering",
    instructor: "Dr. Abel",
    status: "Active",
  },
];

function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedMonth, setSelectedMonth] = useState("all");

  const [showForm, setShowForm] = useState(false);

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    month: 1,
    instructor: "",
  });

  const filtered =
    selectedMonth === "all"
      ? courses
      : courses.filter(
          (course) =>
            course.month === Number(selectedMonth)
        );

  const addCourse = (e) => {
    e.preventDefault();

    const course = {
      id: Date.now(),
      name: newCourse.name,
      code: newCourse.code,
      month: Number(newCourse.month),
      instructor: newCourse.instructor,
      status: "Active",
    };

    setCourses([...courses, course]);

    setNewCourse({
      name: "",
      code: "",
      month: 1,
      instructor: "",
    });

    setShowForm(false);
  };

  const deleteCourse = (id) => {
    setCourses(
      courses.filter((course) => course.id !== id)
    );
  };

  return (
    <div className="admin-page-content">

      <div className="admin-page-title">

        <div>
          <h1>Courses</h1>
          <p>
            Manage the 11-month academic curriculum.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Course
        </button>

      </div>

      {showForm && (
        <div className="admin-form-card">

          <h2>Add Course</h2>

          <form onSubmit={addCourse}>

            <div className="form-grid">

              <div>
                <label>Course Name</label>

                <input
                  required
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Course Code</label>

                <input
                  required
                  placeholder="CS501"
                  value={newCourse.code}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      code: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Month</label>

                <select
                  value={newCourse.month}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      month: e.target.value,
                    })
                  }
                >
                  {Array.from(
                    { length: 11 },
                    (_, i) => i + 1
                  ).map((month) => (
                    <option key={month} value={month}>
                      Month {month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Instructor</label>

                <input
                  required
                  value={newCourse.instructor}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      instructor: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <button className="primary-btn">
              Save Course
            </button>

          </form>

        </div>
      )}

      <div className="course-filter">

        <label>Filter by month:</label>

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
        >
          <option value="all">All Months</option>

          {Array.from(
            { length: 11 },
            (_, i) => i + 1
          ).map((month) => (
            <option key={month} value={month}>
              Month {month}
            </option>
          ))}
        </select>

      </div>

      <div className="admin-section">

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Course Code</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filtered.map((course) => (
                <tr key={course.id}>

                  <td>
                    <strong>
                      Month {course.month}
                    </strong>
                  </td>

                  <td>{course.code}</td>

                  <td>{course.name}</td>

                  <td>{course.instructor}</td>

                  <td>
                    <span className="admin-status available">
                      Active
                    </span>
                  </td>

                  <td>
                    <button
                      className="admin-action-btn danger-btn"
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                    >
                      Delete
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

export default AdminCourses;