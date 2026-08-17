/*
========================================
CURRENT LOGGED-IN STUDENT
========================================
*/

export function getCurrentStudent() {
  const savedStudent =
    localStorage.getItem(
      "currentStudent"
    );

  if (!savedStudent) {
    return {
      id:
        localStorage.getItem(
          "loggedInStudentId"
        ) || "",

      name:
        localStorage.getItem(
          "studentName"
        ) || "",

      email:
        localStorage.getItem(
          "studentEmail"
        ) || "",

      phone: "",
      gender: "",
      entryYear: "",
      program: "Computer Science",
      level: "Third Year",
      currentMonth: 1,
      gpa: 0,
      status:
        "Learning in Progress",

      results: [],
    };
  }

  try {
    return JSON.parse(
      savedStudent
    );
  } catch (error) {
    console.error(
      "Unable to read current student:",
      error
    );

    return {
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      entryYear: "",
      program:
        "Computer Science",
      level:
        "Third Year",
      currentMonth: 1,
      gpa: 0,
      status:
        "Learning in Progress",
      results: [],
    };
  }
}


/*
========================================
STUDENT RESULTS
========================================
*/

export function getStudentResults() {
  const student =
    getCurrentStudent();

  return student.results || [];
}


/*
========================================
BACKWARD COMPATIBILITY
========================================

Some existing parts of the portal
may still import "students".

We keep an empty array temporarily
so the application does not crash.

The real student now comes from
MongoDB through login.
========================================
*/

export const students = [];