/**
 * BEFORE refactoring (US-06: enter grades).
 * Problem: this single function mixes parsing, range validation, and
 * message formatting all together - hard to test or reuse individually.
 */
function validateAndFormatGrade(rawMarks) {
  // parsing
  const marks = Number(rawMarks);

  // validation
  let isValid = true;
  let errorMessage = "";
  if (Number.isNaN(marks)) {
    isValid = false;
    errorMessage = "Marks must be a number";
  } else if (marks < 0 || marks > 100) {
    isValid = false;
    errorMessage = "Marks must be between 0 and 100";
  }

  // formatting
  if (!isValid) {
    return { valid: false, message: `Invalid entry: ${errorMessage}` };
  }
  let grade = "F";
  if (marks >= 85) grade = "A";
  else if (marks >= 70) grade = "B";
  else if (marks >= 60) grade = "C";
  else if (marks >= 50) grade = "D";

  return { valid: true, message: `Marks ${marks} recorded, Grade: ${grade}`, marks, grade };
}

module.exports = { validateAndFormatGrade };
