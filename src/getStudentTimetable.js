/**
 * US-02: As a student, I want to view my personalized timetable, so that I
 * know when and where my classes occur.
 *
 * AC: only the student's own enrolled sections show; empty timetable shows
 * a clear message instead of an error.
 */

function getStudentTimetable(studentSection, allEntries) {
  const entries = allEntries.filter((entry) => entry.section === studentSection);

  if (entries.length === 0) {
    return { hasClasses: false, message: "No classes scheduled.", entries: [] };
  }

  const sorted = [...entries].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return {
    hasClasses: true,
    message: `${sorted.length} class(es) found.`,
    entries: sorted.map((e) => ({
      course: e.course,
      day: e.day,
      startTime: e.startTime,
      endTime: e.endTime,
      room: e.room,
      faculty: e.faculty,
    })),
  };
}

module.exports = { getStudentTimetable };
