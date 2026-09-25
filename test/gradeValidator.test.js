const before = require("../src/gradeValidator.before");
const after = require("../src/gradeValidator.after");

// Q7-c REFACTORING EVIDENCE:
// This suite runs the SAME cases against both the BEFORE and AFTER
// implementations. Passing on both proves the refactor preserved behavior.
// Take a screenshot of this file's passing output as your "verification" evidence.

const cases = [
  ["90", { valid: true, grade: "A" }],
  ["72", { valid: true, grade: "B" }],
  ["61", { valid: true, grade: "C" }],
  ["55", { valid: true, grade: "D" }],
  ["40", { valid: true, grade: "F" }],
  ["-5", { valid: false }],
  ["150", { valid: false }],
  ["abc", { valid: false }],
];

describe.each([
  ["BEFORE", before.validateAndFormatGrade],
  ["AFTER", after.validateAndFormatGrade],
])("%s implementation", (_label, validateAndFormatGrade) => {
  test.each(cases)("input %s", (input, expected) => {
    const result = validateAndFormatGrade(input);
    expect(result.valid).toBe(expected.valid);
    if (expected.valid) {
      expect(result.grade).toBe(expected.grade);
    }
  });
});
