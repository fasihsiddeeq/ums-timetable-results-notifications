const { getPublishedResults } = require("../src/getPublishedResults");

describe("getPublishedResults", () => {
  const allResults = [
    { studentId: "S1", course: "SE-1001", grade: "A", creditHours: 3, status: "published" },
    { studentId: "S1", course: "OOP", grade: "B", creditHours: 3, status: "pending" },
    { studentId: "S2", course: "DB", grade: "A", creditHours: 3, status: "published" },
  ];

  test("returns only the student's own published results", () => {
    const result = getPublishedResults("S1", allResults);
    expect(result.hasResults).toBe(true);
    expect(result.results.length).toBe(1);
    expect(result.results[0].course).toBe("SE-1001");
  });

  test("does not include pending/unpublished results", () => {
    const result = getPublishedResults("S1", allResults);
    expect(result.results.find((r) => r.course === "OOP")).toBeUndefined();
  });

  test("shows a clear message when no published results exist", () => {
    const result = getPublishedResults("S3", allResults);
    expect(result.hasResults).toBe(false);
    expect(result.message).toBe("No published results available yet.");
  });
});
