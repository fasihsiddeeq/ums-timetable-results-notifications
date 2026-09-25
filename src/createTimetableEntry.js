/**
 * US-01: As an admin/coordinator, I want to create a timetable entry for a
 * section, so that classes have a defined schedule.
 *
 * FR-01: reject the entry if a required field is missing (FR-01, AC-2 of US-01).
 */

const REQUIRED_FIELDS = ["day", "startTime", "endTime", "room", "section", "faculty", "course"];

function createTimetableEntry(input, existingEntries = []) {
  const missing = REQUIRED_FIELDS.filter((field) => !input[field]);
  if (missing.length > 0) {
    return { success: false, error: `Missing required field(s): ${missing.join(", ")}` };
  }

  const newEntry = {
    id: `T-${Date.now()}`,
    day: input.day,
    startTime: input.startTime,
    endTime: input.endTime,
    room: input.room,
    section: input.section,
    faculty: input.faculty,
    course: input.course,
    createdAt: new Date().toISOString(),
  };

  return { success: true, entry: newEntry };
}

module.exports = { createTimetableEntry, REQUIRED_FIELDS };
