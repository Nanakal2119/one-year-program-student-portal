import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import {getStudentResults
} from "./data/mockStudents";
import Login from "./pages/login";
import ExamOTP from "./pages/ExamOTP";
import TakeExam from "./pages/TakeExam";
import ExamResult from "./pages/ExamResult";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminCourses from "./pages/AdminCourses";
import AdminExams from "./pages/AdminExams";
import AdminQuestions from "./pages/AdminQuestions";
import AdminOTP from "./pages/AdminOTP";
import AdminResults from "./pages/AdminResults";
import AdminSettings from "./pages/AdminSettings";
import AdminApplications from "./pages/AdminApplications";
import AdminLayout from "./components/AdminLayout";
import LearningResources from "./pages/LearningResources";
import "./index.css";

/* =========================
   MOCK DATA
========================= */

const courses = [
  {
    month: 1,
    courses: [
      { code: "መሃ 01-ምሥ/ሥላ", name: "ምሥጢረ ሥላሴ", progress: 0, outline: "/course-outlines/month1.pdf" },
    ],
  },
  {
    month: 2,
    courses: [
      { code: "መሃ 02-ምሥ/ሥጋ", name: "ምሥጢረ ሥጋዌ", progress: 0, outline: "/course-outlines/month2.pdf" },
    ],
  },
  {
    month: 3,
    courses: [
      { code: "መሃ 03-ምሥ/ጥም", name: "ምሥጢረ ጥምቀት", progress: 0, outline: "/course-outlines/month3.pdf" },
      { code: "መሃ 04-ምሥ/ቁር", name: "ምሥጢረ ቁርባን", progress: 0, outline: "/course-outlines/month3_2.pdf"  },
    ],
  },
  {
    month: 4,
    courses: [
      { code: "መሃ 05-ምሥ/ትንሣ", name: "ምሥጢረ ትንሣኤ ሙታን", progress: 0, outline: "/course-outlines/month4.pdf" },
      { code: "መሃ 06-ምሥ/ንስሐ", name: "ምሥጢረ ንስሐ", progress: 0, outline: "/course-outlines/month4_2.pdf" },
    ],
  },
  {
    month: 5,
    courses: [
      { code: "መሃ 06-ነገ/ማር", name: "ነገረ ማርያም", progress: 0, outline: "/course-outlines/month5.pdf" },
    ],
  },
  {
    month: 6,
    courses: [
      { code: "መሃ 07-ነገ/ክር", name: "ነገረ ክርስቶስ", progress: 0, outline: "/course-outlines/month6.pdf" },
    ],
  },
  {
    month: 7,
    courses: [
      { code: "መሃ08-ነገ/ሰብዕ", name: "ነገረ ሰብእ", progress: 0, outline: "/course-outlines/month7.pdf" },
      { code: "መሃ08-ነገ/ድኅ", name: "ነገረ ድኅነት", progress: 0, outline: "/course-outlines/month7_2.pdf" },
    ],
  },
  {
    month: 8,
    courses: [
      { code: "ቅድ01-መቅ/አጠ", name: "መሠረታዊ የመጽሐፍ ቅዱስ አረዳድ", progress: 0, outline: "/course-outlines/month8.pdf" },
    ],
  },
  {
    month: 9,
    courses: [
      { code: "መሃ09-ነገ/ቤን /ታሪ01-ነገ/ትውፊ/ /ታሪ02-ነገ/ጉባቤ/", name: "ነገረ ቤተክርስትያን (ነገረ ትውፊት እና ነገረ ጉባኤያተ ቤተክርስትያን)", progress: 0, outline: "/course-outlines/month9.pdf" },
    ],
  },
  {
    month: 10,
    courses: [
      { code: "መሃ11-ሥር/አምል", name: "ሥርዓተ አምልኮ (ሥርዓተ ቅዳሴ)", progress: 0, outline: "/course-outlines/month10.pdf" },
    ],
  },
  {
    month: 11,
    courses: [
      { code: "ሥነ01/ኦርዐ", name: "ኦርቶዶክሳዊ ርእዮተ ዓለምና መንፈሳዊ ሕይወት", progress: 0 },
    ],
  },
];



const exams = [
  {
    code: "CS301",
    course: "ምሥጢረ ጥምቀት",
    date: "Aug 15, 2026",
    time: "10:00 AM",
    duration: "60 min",
    status: "Available Soon",
  },
  {
    code: "CS302",
    course: "ምሥጢረ ሥጋዌ",
    date: "Aug 18, 2026",
    time: "2:00 PM",
    duration: "60 min",
    status: "Upcoming",
  },
  {
    code: "CS303",
    course: "ምሥጢረ ሥላሴ",
    date: "Aug 21, 2026",
    time: "10:00 AM",
    duration: "90 min",
    status: "Upcoming",
  },
];

const results = [
  { code: "CS301", course: "ምሥጢረ ጥምቀት", score: 88, grade: "A" },
  { code: "CS302", course: "ምሥጢረ ሥጋዌ", score: 82, grade: "A-" },
  { code: "CS303", course: "ምሥጢረ ሥላሴ", score: 91, grade: "A+" },
  { code: "CS304", course: "ምሥጢረ ቁርባን", score: 79, grade: "B+" },
];

/* =========================
   SIDEBAR
========================= */

function Sidebar({ isOpen, closeSidebar }) {
  const links = [
    ["Dashboard", "/"],
    ["My Courses", "/courses"],
    ["Exams", "/exams"],
    ["Results", "/results"],
    ["🎥 Learning Resources", "/learning-resources"],
    ["My Profile", "/profile"],
    ["Student Services", "/services"],
    ["Settings", "/settings"],
  ];

  const studentName = getStudentName();
  const studentEmail = getStudentEmail();

  const logout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("currentStudent");

    closeSidebar();

    window.location.href = "/login";
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        <div className="logo">

          <div className="logo-icon">
            K
          </div>

          <div>
            <strong>
              Student Portal
            </strong>

            <small>
              የአ/አ/ቅ/ኪ/ካ/ፍ/ጽ/ሰ/ት/ቤት
            </small>
          </div>

          <button
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            ×
          </button>

        </div>

        <nav>
          {links.map(([name, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={closeSidebar}
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-profile">

            <div className="avatar">
              {studentName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <strong>
                {studentName}
              </strong>

              <small>
                {studentEmail}
              </small>
            </div>

          </div>

          <div className="sidebar-year">
            <span>
              Academic Year
            </span>

            <strong>
              2026
            </strong>
          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}

/* =========================
   CURRENT STUDENT HELPERS
========================= */

export function getLoggedInStudent() {
  try {
    const savedStudent = localStorage.getItem("currentStudent");

    if (!savedStudent) {
      return null;
    }

    return JSON.parse(savedStudent);
  } catch (error) {
    console.error(
      "Could not load current student:",
      error
    );

    return null;
  }
}

function getStudentName() {
  const student = getLoggedInStudent();

  return (
    localStorage.getItem("studentName") ||
    student?.name ||
    "Student"
  );
}

function getStudentEmail() {
  const student = getLoggedInStudent();

  return (
    localStorage.getItem("studentEmail") ||
    student?.email ||
    ""
  );
}

function getStudentId() {
  const student = getLoggedInStudent();

  return (
    localStorage.getItem("loggedInStudentId") ||
    student?.studentId ||
    student?.id ||
    ""
  );
}

function notifyStudentUpdate() {
  window.dispatchEvent(
    new Event("studentSettingsUpdated")
  );
}


/* =========================
   TOPBAR
========================= */

<div className="portal-logo">
  <img
    src="/finot-logo.jpg"
    alt="የአየርጤና አንቀጸ ብርሃን ቅድስት ኪዳነምሕረት ካቴድራል ፍኖተ ጽድቅ ሰንበት ት/ቤት"
  />

  <div className="portal-logo-text">
    <strong>የአየርጤና አንቀጸ ብርሃን ቅድስት ኪዳነምሕረት ካቴድራል ፍኖተ ጽድቅ ሰንበት ት/ቤት</strong>
    <span>Student Portal</span>
  </div>
</div>

function Topbar({ openSidebar }) {
  const navigate = useNavigate();

  const profileImage =
    localStorage.getItem("profileImage") || "";

  const [studentName, setStudentName] =
    useState(getStudentName());

  const [studentEmail, setStudentEmail] =
    useState(getStudentEmail());

  useEffect(() => {
    const updateStudentInfo = () => {
      setStudentName(getStudentName());
      setStudentEmail(getStudentEmail());
    };

    window.addEventListener(
      "studentSettingsUpdated",
      updateStudentInfo
    );

    return () => {
      window.removeEventListener(
        "studentSettingsUpdated",
        updateStudentInfo
      );
    };
  }, []);

  return (
    <header className="topbar">

      <button
        className="mobile-menu-btn"
        onClick={openSidebar}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div>
        <h1>
          እንኳን ወደ ፍኖተ ጽድቅ ሰንበት ት/ቤት በደኅና መጡ,{" "}
          {studentName.split(" ")[0]} 👋
        </h1>

        <p>
          Here's an overview of your academic progress.
        </p>
      </div>

      <button
        className="top-profile"
        onClick={() => navigate("/profile")}
        title="View Profile"
      >

        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="top-profile-image"
          />
        ) : (
          <div className="avatar">
            {studentName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
        )}

        <div className="top-profile-info">

          <strong>
            {studentName}
          </strong>

          <small>
            {studentEmail}
          </small>

        </div>

      </button>

    </header>
  );
}


/* =========================
   LAYOUT
========================= */

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <main className="main">

        <Topbar
          openSidebar={() => setSidebarOpen(true)}
        />

        <div className="content">
          {children}
        </div>

      </main>

    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard() {
  const currentStudent = getLoggedInStudent();

  return (
    <>
      <div className="page-title">
        <div>
          <h1>
            Dashboard
          </h1>

          <p>
            Your academic overview
          </p>
        </div>
      </div>

      <div className="dashboard-grid">

        <section className="card">

          <div className="card-header">
            <h3>
              Current Courses
            </h3>

            <NavLink to="/courses">
              View all
            </NavLink>
          </div>

          {courses[0].courses.map((course) => (
            <div
              className="course-row"
              key={course.code}
            >

              <div>
                <strong>
                  {course.name}
                </strong>

                <small>
                  {course.code}
                </small>
              </div>

              <div className="progress-container">

                <span>
                  {course.progress}%
                </span>

                <div className="progress">
                  <div
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>

              </div>

            </div>
          ))}

        </section>

        <section className="card">

          <div className="card-header">
            <h3>
              Upcoming Exams
            </h3>

            <NavLink to="/exams">
              View all
            </NavLink>
          </div>

          {exams.map((exam) => (
            <div
              className="exam-row"
              key={exam.code}
            >

              <div className="exam-icon">
                📝
              </div>

              <div>
                <strong>
                  {exam.course}
                </strong>

                <small>
                  {exam.date} • {exam.time}
                </small>
              </div>

            </div>
          ))}

        </section>

      </div>

      <section className="card">

        <div className="card-header">
          <h3>
            Recent Results
          </h3>

          <NavLink to="/results">
            View all
          </NavLink>
        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Course</th>
                <th>Code</th>
                <th>Score</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>

              {(currentStudent?.results || [])
                .slice(0, 3)
                .map((result) => (

                  <tr key={result.code}>

                    <td>
                      {result.course}
                    </td>

                    <td>
                      {result.code}
                    </td>

                    <td>
                      {result.score}%
                    </td>

                    <td>
                      <span className="grade">
                        {result.grade}
                      </span>
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
}


/* =========================
   COURSES
========================= */

function Courses() {
  const totalCourses = courses.reduce(
    (total, month) => total + month.courses.length,
    0
  );

  return (
    <>
      <div className="page-title">
        <div>
          <h1>My Courses</h1>
          <p>All courses across your 11-month program</p>
        </div>
      </div>

      {/* PROGRAM SUMMARY */}
      <div className="program-summary">
        <div>
          <strong>11 Months</strong>
          <span>Program Duration</span>
        </div>

        <div>
          <strong>{totalCourses}</strong>
          <span>Total Courses</span>
        </div>

        <div>
          <strong>Month 1</strong>
          <span>Current Month</span>
        </div>
      </div>

      {/* MONTHS */}
      <div className="months-container">
        {courses.map((month) => (
          <section className="month-section" key={month.month}>

            <div className="month-header">
              <div>
                <span className="month-label">
                  MONTH {month.month}
                </span>

                <h2>
                  Month {month.month}
                </h2>

                <p>
                  {month.courses.length}{" "}
                  {month.courses.length === 1 ? "Course" : "Courses"}
                </p>
              </div>

              {month.month === 1 && (
                <span className="current-badge">
                  Current
                </span>
              )}
            </div>

            <div className="course-grid">
              {month.courses.map((course) => (
                <div className="course-card" key={course.code}>

                  <div className="course-top">
                    <span className="course-code">
                      {course.code}
                    </span>

                    <span className="course-credit">
                      {course.credit} Credits
                    </span>
                  </div>

                  <h3>{course.name}</h3>

                  <div className="course-progress">

                    <div className="progress-label">
                      <span>Progress</span>
                      <strong>{course.progress}%</strong>
                    </div>

                    <div className="progress">
                      <div
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>

                  </div>

                  <button
                            className="outline-btn"
                            onClick={() => window.open(course.outline, "_blank")}
                          >
                            View Course
                          </button>

                </div>
              ))}
            </div>

          </section>
        ))}
      </div>
    </>
  );
}

/* =========================
   COURSE OUTLINE
========================= */

function CourseOutline() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const course = courses
    .flatMap((month) => month.courses)
    .find((course) => course.code === code);

  const outline = courseOutlines[code];

  if (!course) {
    return (
      <div className="page-title">
        <h1>Course Not Found</h1>
        <p>The requested course could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-title">
        <div>
          <span className="course-code">
            {course.code}
          </span>

          <h1>{course.name}</h1>

          <p>
            Course outline and learning materials
          </p>
        </div>
      </div>

      <section className="card course-overview">
        <div className="course-overview-header">
          <div>
            <span className="course-code">
              {course.code}
            </span>

            <h2>{course.name}</h2>
          </div>

          <span className="current-badge">
            {course.progress}% Complete
          </span>
        </div>

        <div className="progress-container">
          <span>Course Progress</span>

          <div className="progress">
            <div
              style={{
                width: `${course.progress}%`
              }}
            />
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Course Description</h2>

        <p>
          {outline?.description ||
            "Course description will be available soon."}
        </p>
      </section>

      <section className="card">
        <h2>Learning Objectives</h2>

        <ul className="course-objectives">
          {(outline?.objectives || []).map(
            (objective, index) => (
              <li key={index}>
                {objective}
              </li>
            )
          )}
        </ul>
      </section>

      <section className="card">
        <h2>Course Outline</h2>

        <div className="course-units">
          {(outline?.units || []).map((unit) => (
            <div
              className="course-unit"
              key={unit.number}
            >
              <div className="unit-number">
                {unit.number}
              </div>

              <div className="unit-content">
                <h3>{unit.title}</h3>

                <ul>
                  {unit.topics.map((topic, index) => (
                    <li key={index}>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


/* =========================
   EXAMS
========================= */

function Exams() {
  return (
    <>
      <div className="page-title">
        <div>
          <h1>Exams</h1>
          <p>View your upcoming and available examinations</p>
        </div>
      </div>

      <div className="exam-list">
        {exams.map((exam) => (
          <div className="card exam-card" key={exam.code}>
            <div className="exam-main">
              <div className="big-icon">📝</div>

              <div>
                <span className="course-code">{exam.code}</span>
                <h2>{exam.course}</h2>
                <p>{exam.date} • {exam.time}</p>
              </div>
            </div>

            <div className="exam-info">
              <span>Duration</span>
              <strong>{exam.duration}</strong>
            </div>

            <div>
  {exam.status === "Available Soon" ? (
    <span className="status">{exam.status}</span>
  ) : (
    <NavLink
      to={`/exam/${exam.code}/otp`}
      className="primary-btn"
    >
      Start Exam
    </NavLink>
  )}
</div>
          </div>
        ))}
      </div>

      <div className="info-box">
        <strong>Exam instructions</strong>
        <p>
          Exams become available according to the schedule set by the
          administration. Once an exam starts, the timer cannot be paused.
        </p>
      </div>
    </>
  );
}

/* =========================
   RESULTS
========================= */

function Results() {
  const currentStudent = getLoggedInStudent();


  const [examResults, setExamResults] = useState([]);


  useEffect(() => {
    if (!currentStudent) {
      setExamResults([]);
      return;
    }


    // Get the ID of the currently logged-in student
    const studentId =
      currentStudent.studentId ||
      currentStudent.id;


    // Results belonging specifically to this student
    const studentResults =
      currentStudent.results || [];


    setExamResults(studentResults);
  }, [currentStudent]);


  const averageScore =
    examResults.length > 0
      ? Math.round(
          examResults.reduce(
            (sum, result) =>
              sum + Number(result.score || 0),
            0
          ) / examResults.length
        )
      : 0;

  return (
    <>
      <div className="page-title">
        <div>
          <h1>
            Results
          </h1>

          <p>
            Your academic examination results
          </p>
        </div>
      </div>

      <div className="stats">

        <Stat
          title="Overall GPA"
          value={
            currentStudent?.gpa ||
            "N/A"
          }
          icon="GPA"
        />

        <Stat
          title="Average Score"
          value={
            examResults.length > 0
              ? `${averageScore}%`
              : "N/A"
          }
          icon="%"
        />

        <Stat
          title="Courses Passed"
          value={
            examResults.length
          }
          icon="✓"
        />

        <Stat
          title="Total Credits"
          value={
            examResults.length * 3
          }
          icon="C"
        />

      </div>

      <section className="card">

        <h3>
          Course Results
        </h3>

        {examResults.length === 0 ? (

          <p
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#6b7280",
            }}
          >
            No results available yet.
          </p>

        ) : (

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {examResults.map(
                  (result) => (

                    <tr
                      key={result.code}
                    >

                      <td>
                        {result.course}
                      </td>

                      <td>
                        {result.code}
                      </td>

                      <td>
                        {result.score}%
                      </td>

                      <td>
                        <span className="grade">
                          {result.grade}
                        </span>
                      </td>

                      <td>
                        <span className="passed">
                          Passed
                        </span>
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>
    </>
  );
}

/* =========================
   PROFILE
========================= */

function Profile() {
  const currentStudent = getLoggedInStudent();
  const [studentName, setStudentName] = useState(getStudentName());
  const [studentEmail, setStudentEmail] = useState(getStudentEmail());
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    const updateStudentInfo = () => {
      setStudentName(getStudentName());
      setStudentEmail(getStudentEmail());
    };

    window.addEventListener("studentSettingsUpdated", updateStudentInfo);

    return () => {
      window.removeEventListener("studentSettingsUpdated", updateStudentInfo);
    };
  }, []);

  /* =========================
     UPLOAD PICTURE
  ========================= */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      setProfileImage(image);
      localStorage.setItem("profileImage", image);
      setShowPhotoOptions(false);
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     REMOVE PICTURE
  ========================= */
  const removeProfileImage = () => {
    localStorage.removeItem("profileImage");
    setProfileImage("");
    setShowPhotoOptions(false);
  };

  /* =========================
     OPEN CAMERA
  ========================= */
  const openCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support camera access.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },
        audio: false
      });

      setCameraStream(stream);
      setShowCamera(true);
      setShowPhotoOptions(false);
    } catch (error) {
      console.error("Camera error:", error);
      alert("Could not access your camera. Please allow camera permission and try again.");
    }
  };

  /* =========================
     CONNECT CAMERA TO VIDEO
  ========================= */
  useEffect(() => {
    const video = document.getElementById("camera-preview");
    if (video && cameraStream) {
      video.srcObject = cameraStream;
    }
  }, [cameraStream]);

  /* =========================
     CLOSE CAMERA
  ========================= */
  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setCameraStream(null);
    setShowCamera(false);
  };

  /* =========================
     TAKE PHOTO
  ========================= */
  const capturePhoto = () => {
    const video = document.getElementById("camera-preview");

    if (!video || !video.videoWidth) {
      alert("Camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg", 0.9);

    setProfileImage(image);
    localStorage.setItem("profileImage", image);
    closeCamera();
  };

  return (
    <>
      {/* PAGE TITLE */}
      <div className="page-title">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and account details</p>
        </div>
      </div>

      {/* PROFILE LAYOUT */}
      <div className="profile-layout">
        {/* PROFILE OVERVIEW */}
        <section className="profile-overview">
          <div className="profile-picture-section">
            {/* PROFILE IMAGE */}
            {profileImage ? (
  <img src={profileImage} alt="Profile" className="large-avatar profile-image" />
) : (
  <div className="large-avatar">
    {currentStudent.name
      .split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()}
  </div>
)}

            {/* CHANGE PHOTO */}
            <button className="change-photo-btn" onClick={() => setShowPhotoOptions(!showPhotoOptions)}>
              Change Photo
            </button>

            {/* PHOTO OPTIONS */}
            {showPhotoOptions && (
              <div className="photo-options">
                {/* TAKE PICTURE */}
                <button type="button" className="photo-option" onClick={openCamera}>
                  <span className="photo-option-icon">📷</span>
                  <div>
                    <strong>Take Picture</strong>
                    <small>Use your camera</small>
                  </div>
                </button>

                {/* UPLOAD PICTURE */}
                <label className="photo-option">
                  <span className="photo-option-icon">🖼️</span>
                  <div>
                    <strong>Upload Picture</strong>
                    <small>Choose from your device</small>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>

                {/* REMOVE PICTURE */}
                {profileImage && (
                  <button type="button" className="photo-option remove-photo" onClick={removeProfileImage}>
                    <span className="photo-option-icon">🗑️</span>
                    <div>
                      <strong>Remove Picture</strong>
                      <small>Use your initials instead</small>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          <h2>{studentName}</h2>
          <span className="profile-student-id">{currentStudent?.studentId || currentStudent?.id}</span>
          <div className="profile-status">
            <span className="status-dot"></span>
            Learning in Progress
          </div>

          <div className="profile-summary">
            <div>
              <span>Entry Year</span>
              <strong>{currentStudent.entryYear}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Active</strong>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}
        <section className="profile-information-card">
          <div className="profile-section-title">
            <div>
              <h2>የግል መረጃ</h2>
              <p>Your registered student information</p>
            </div>
          </div>

          <div className="profile-information">
            <div className="profile-field">
              <div className="field-icon">👤</div>
              <div>
                <small>ሙሉ ስም</small>
                <strong>{studentName}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">⚥</div>
              <div>
                <small>ጾታ</small>
                <strong>{currentStudent.gender}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">📅</div>
              <div>
                <small>የገቡበት ዓመት</small>
                <strong>{currentStudent.entryYear}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">✉️</div>
              <div>
                <small>ኢ-ሜይል</small>
                <strong>{studentEmail}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">📱</div>
              <div>
                <small>ስልክ ቁጥር</small>
                <strong>{currentStudent.phone}</strong>
              </div>
            </div>

            <div className="profile-field">
              <div className="field-icon">✓</div>
              <div>
                <small>Learning Status</small>
                <span className="learning-status">● Learning in Progress</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CAMERA MODAL */}
      {showCamera && (
        <div className="camera-modal">
          <div className="camera-box">
            <h2>Take Profile Picture</h2>
            <video
              id="camera-preview"
              autoPlay
              playsInline
              ref={(video) => {
                if (video && cameraStream) {
                  video.srcObject = cameraStream;
                }
              }}
            />
            <div className="camera-actions">
              <button type="button" className="primary-btn" onClick={capturePhoto}>
                📷 Capture
              </button>
              <button type="button" className="outline-btn" onClick={closeCamera}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================
   SETTINGS
========================= */
function Settings() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("portalTheme") || "Default"
  );

  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "Medium"
  );

  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem("emailNotifications") !== "false"
  );

  const [pushNotifications, setPushNotifications] = useState(
    localStorage.getItem("pushNotifications") !== "false"
  );

  const [alerts, setAlerts] = useState(
    localStorage.getItem("alerts") !== "false"
  );

  const [twoFactor, setTwoFactor] = useState(
    localStorage.getItem("twoFactor") === "true"
  );

  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const currentStudent = getCurrentStudent();
const [name, setName] = useState(
  localStorage.getItem("studentName") || currentStudent.name
);

  const [email, setEmail] = useState(
  localStorage.getItem("studentEmail") || currentStudent.email
);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  /* =========================
     DARK MODE
  ========================= */
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  /* =========================
     THEME
  ========================= */
  useEffect(() => {
    document.body.classList.remove(
      "theme-default",
      "theme-blue",
      "theme-green",
      "theme-purple"
    );
    document.body.classList.add(`theme-${theme.toLowerCase()}`);
    localStorage.setItem("portalTheme", theme);
  }, [theme]);

  /* =========================
     FONT SIZE
  ========================= */
  useEffect(() => {
    document.body.classList.remove(
      "font-small",
      "font-medium",
      "font-large",
      "font-extra-large"
    );
    document.body.classList.add(`font-${fontSize.toLowerCase().replace(" ", "-")}`);
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  /* =========================
     SAVE NAME
  ========================= */
  const saveName = () => {
    if (!newName.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    setName(newName);
    localStorage.setItem("studentName", newName);
    setEditName(false);
    notifyStudentUpdate();
  };

  /* =========================
     SAVE EMAIL
  ========================= */
  const saveEmail = () => {
    if (!newEmail.trim() || !newEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setEmail(newEmail);
    localStorage.setItem("studentEmail", newEmail);
    setEditEmail(false);
    notifyStudentUpdate();
  };

  /* =========================
     CHANGE PASSWORD
  ========================= */
const changePassword = () => {
  // Get the stored password
  const storedPassword = localStorage.getItem("studentPassword") || "123456";

  // Check if current password matches
  if (!currentPassword) {
    alert("Please enter your current password.");
    return;
  }

  if (currentPassword !== storedPassword) {
    alert("Current password is incorrect.");
    return;
  }

  // Validate new password
  if (newPassword.length < 6) {
    alert("New password must contain at least 6 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Save the new password
  localStorage.setItem("studentPassword", newPassword);
  
  alert("Password changed successfully. Please use your new password next time you log in.");

  // Clear the form
  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
  setShowPasswordBox(false);
};

  /* =========================
     2FA
  ========================= */
  const toggleTwoFactor = () => {
    const newValue = !twoFactor;
    setTwoFactor(newValue);
    localStorage.setItem("twoFactor", newValue);
    if (newValue) {
      alert("Two-factor authentication has been enabled.");
    } else {
      alert("Two-factor authentication has been disabled.");
    }
  };

  /* =========================
     NOTIFICATIONS
  ========================= */
  const updateNotification = (type, value) => {
    if (type === "email") {
      setEmailNotifications(value);
      localStorage.setItem("emailNotifications", value);
    }
    if (type === "push") {
      setPushNotifications(value);
      localStorage.setItem("pushNotifications", value);
    }
    if (type === "alerts") {
      setAlerts(value);
      localStorage.setItem("alerts", value);
    }
  };

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, privacy, appearance, and notifications</p>
        </div>
      </div>

      <div className="settings-container">
        {/* ACCOUNT SETTINGS */}
        <section className="settings-section card">
          <div className="settings-section-header">
            <div className="settings-section-icon">👤</div>
            <div>
              <h2>Account Settings</h2>
              <p>Manage your personal account information</p>
            </div>
          </div>

          <div className="settings-list">
            {/* NAME */}
            <div className="setting-item">
              <div>
                <strong>Name</strong>
                {editName ? (
                  <div className="settings-edit-box">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <div className="settings-edit-actions">
                      <button className="primary-btn" onClick={saveName}>Save</button>
                      <button className="outline-btn" onClick={() => {
                        setNewName(name);
                        setEditName(false);
                      }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span>{name}</span>
                )}
              </div>
              {!editName && (
                <button className="outline-btn" onClick={() => setEditName(true)}>Edit</button>
              )}
            </div>

            {/* EMAIL */}
            <div className="setting-item">
              <div>
                <strong>Email</strong>
                {editEmail ? (
                  <div className="settings-edit-box">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <div className="settings-edit-actions">
                      <button className="primary-btn" onClick={saveEmail}>Save</button>
                      <button className="outline-btn" onClick={() => {
                        setNewEmail(email);
                        setEditEmail(false);
                      }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span>{email}</span>
                )}
              </div>
              {!editEmail && (
                <button className="outline-btn" onClick={() => setEditEmail(true)}>Change</button>
              )}
            </div>

            {/* PASSWORD */}
            <div className="setting-item">
              <div>
                <strong>Password</strong>
                <span>Change your account password</span>
                {showPasswordBox && (
                  <div className="settings-edit-box">
                    <h4>Change Password</h4>
                    <div className="password-field">
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="password-field">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="password-field">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="settings-edit-actions">
                      <button className="primary-btn" onClick={changePassword}>Change Password</button>
                      <button className="outline-btn" onClick={() => {
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setShowPasswordBox(false);
                      }}>Cancel</button>
                    </div>
                  </div>
                )}
                {!showPasswordBox && (
                  <button className="outline-btn" onClick={() => setShowPasswordBox(true)}>Change</button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY & SECURITY */}
        <section className="settings-section card">
          <div className="settings-section-header">
            <div className="settings-section-icon">🔒</div>
            <div>
              <h2>Privacy & Security</h2>
              <p>Protect your account and control your privacy</p>
            </div>
          </div>

          <div className="settings-list">
            {/* TWO FACTOR */}
            <div className="setting-item">
              <div>
                <strong>Two-Factor Authentication</strong>
                <span>Add an extra layer of security to your account</span>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={twoFactor} onChange={toggleTwoFactor} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* LOGIN SESSIONS */}
            <div className="setting-item">
              <div>
                <strong>Login Sessions</strong>
                <span>View and manage devices where you are logged in</span>
              </div>
              <button className="outline-btn" onClick={() => setShowSessions(!showSessions)}>
                {showSessions ? "Close" : "Manage"}
              </button>
            </div>

            {showSessions && (
              <div className="settings-subpanel">
                <h4>Active Sessions</h4>
                <div className="session-row">
                  <div>
                    <strong>💻 Current Browser</strong>
                    <span>Windows • Chrome</span>
                  </div>
                  <span className="session-active">Active</span>
                </div>
                <button className="danger-btn" onClick={() => alert("All other sessions have been logged out.")}>
                  Log out other sessions
                </button>
              </div>
            )}

            {/* PRIVACY */}
            <div className="setting-item">
              <div>
                <strong>Privacy Controls</strong>
                <span>Control how your personal information is used</span>
              </div>
              <button className="outline-btn" onClick={() => setShowPrivacy(!showPrivacy)}>
                {showPrivacy ? "Close" : "Manage"}
              </button>
            </div>

            {showPrivacy && (
              <div className="settings-subpanel">
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  Show profile information
                </label>
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  Allow academic notifications
                </label>
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  Allow personalized announcements
                </label>
              </div>
            )}

            {/* PERMISSIONS */}
            <div className="setting-item">
              <div>
                <strong>Permissions</strong>
                <span>Manage application and browser permissions</span>
              </div>
              <button className="outline-btn" onClick={() => setShowPermissions(!showPermissions)}>
                {showPermissions ? "Close" : "Manage"}
              </button>
            </div>

            {showPermissions && (
              <div className="settings-subpanel">
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  Camera access
                </label>
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  Browser notifications
                </label>
                <label className="privacy-check">
                  <input type="checkbox" defaultChecked />
                  File uploads
                </label>
              </div>
            )}
          </div>
        </section>

        {/* APPEARANCE */}
        <section className="settings-section card">
          <div className="settings-section-header">
            <div className="settings-section-icon">🎨</div>
            <div>
              <h2>Appearance</h2>
              <p>Customize how your student portal looks</p>
            </div>
          </div>

          <div className="settings-list">
            {/* DARK MODE */}
            <div className="setting-item">
              <div>
                <strong>Light / Dark Mode</strong>
                <span>Switch between light and dark appearance</span>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* THEME */}
            <div className="setting-item">
              <div>
                <strong>Theme</strong>
                <span>Choose your preferred portal theme</span>
              </div>
              <select className="settings-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Purple">Purple</option>
              </select>
            </div>

            {/* FONT SIZE */}
            <div className="setting-item">
              <div>
                <strong>Font Size</strong>
                <span>Adjust the text size across the portal</span>
              </div>
              <select className="settings-select" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="settings-section card">
          <div className="settings-section-header">
            <div className="settings-section-icon">🔔</div>
            <div>
              <h2>Notifications</h2>
              <p>Choose how you want to receive notifications</p>
            </div>
          </div>

          <div className="settings-list">
            {/* EMAIL */}
            <div className="setting-item">
              <div>
                <strong>Email Notifications</strong>
                <span>Receive important updates through email</span>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={emailNotifications} onChange={(e) => updateNotification("email", e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* PUSH */}
            <div className="setting-item">
              <div>
                <strong>Push Notifications</strong>
                <span>Receive notifications directly in your browser</span>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={pushNotifications} onChange={(e) => updateNotification("push", e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* ALERTS */}
            <div className="setting-item">
              <div>
                <strong>Alerts</strong>
                <span>Receive alerts about exams, results, and announcements</span>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={alerts} onChange={(e) => updateNotification("alerts", e.target.checked)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* =========================
   PROTECTED ROUTE
========================= */

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("studentLoggedIn") === "true";

  const studentId =
    localStorage.getItem("loggedInStudentId");

  if (!isLoggedIn || !studentId) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


/* =========================
   SERVICES
========================= */

function Services() {
  const services = [
    ["📢", "Announcements", "View important institutional announcements."],
    ["💬", "Help & Support", "Contact student support."],
    ["📅", "Academic Calendar", "View important academic dates."],
  ];

  return (
    <>
      <div className="page-title">
        <div>
          <h1>Student Services</h1>
          <p>Access services available to you</p>
        </div>
      </div>

      <div className="service-grid">
        {services.map(([icon, title, description]) => (
          <div className="card service-card" key={title}>
            <div className="service-icon">{icon}</div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button className="outline-btn">
              Open Service
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            STUDENT LOGIN
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =========================
            STUDENT PORTAL
        ========================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
  path="/course"
  element={
    <ProtectedRoute>
      <Layout>
        <CourseOutline />
      </Layout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <Layout>
                <Exams />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Layout>
                <Results />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
            path="/learning-resources"
            element={
              <ProtectedRoute>
                <Layout>
                  <LearningResources />
                </Layout>
              </ProtectedRoute>
            }
          />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Layout>
                <Services />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* =========================
            EXAM FLOW
        ========================= */}

        <Route
          path="/exam/:code/otp"
          element={
            <ProtectedRoute>
              <ExamOTP />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam/:code"
          element={
            <ProtectedRoute>
              <TakeExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam-result"
          element={
            <ProtectedRoute>
              <ExamResult />
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="students"
            element={<AdminStudents />}
          />

          <Route
            path="courses"
            element={<AdminCourses />}
          />

          <Route
            path="exams"
            element={<AdminExams />}
          />

          <Route
            path="questions"
            element={<AdminQuestions />}
          />

          <Route
            path="otp"
            element={<AdminOTP />}
          />

          <Route
            path="results"
            element={<AdminResults />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />

          <Route
            path="applications"
            element={<AdminApplications />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
