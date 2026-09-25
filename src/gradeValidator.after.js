/**
 * AFTER refactoring (US-06: enter grades).
 * Behavior is identical to the BEFORE version (see test/gradeValidator.test.js,
 * which runs the same cases against both), but parsing, validation, and
 * grade-letter assignment are now separate, independently testable functions.
 */

function parseMarks(rawMarks) {
  return Number(rawMarks);
}

function isValidRange(marks) {
  return !Number.isNaN(marks) && marks >= 0 && marks <= 100;
}

function assignGradeLetter(marks) {
  if (marks >= 85) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

function validateAndFormatGrade(rawMarks) {
  const marks = parseMarks(rawMarks);

  if (!isValidRange(marks)) {
    const errorMessage = Number.isNaN(marks)
      ? "Marks must be a number"
      : "Marks must be between 0 and 100";
    return { valid: false, message: `Invalid entry: ${errorMessage}` };
  }

  const grade = assignGradeLetter(marks);
  return { valid: true, message: `Marks ${marks} recorded, Grade: ${grade}`, marks, grade };
}

module.exports = { validateAndFormatGrade, parseMarks, isValidRange, assignGradeLetter };
