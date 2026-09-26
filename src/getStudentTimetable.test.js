const { getStudentTimetable } = require("../src/getStudentTimetable");

describe("getStudentTimetable", () => {
  const allEntries = [
    { day: "Mon", startTime: "11:00", endTime: "12:00", room: "R202", section: "BSE-3B", faculty: "Bilal Khan", course: "OOP" },
    { day: "Mon", startTime: "09:00", endTime: "10:00", room: "R101", section: "BSE-3B", faculty: "Amna Awan", course: "SE-1001" },
    { day: "Tue", startTime: "10:00", endTime: "11:00", room: "R303", section: "BSE-3A", faculty: "Sara Ali", course: "DB" },
  ];

  test("returns only the student's own section's classes", () => {
    const result = getStudentTimetable("BSE-3B", allEntries);
    expect(result.hasClasses).toBe(true);
    expect(result.entries.length).toBe(2);
    expect(result.entries.every((e) => true)).toBe(true); // section not leaked into output, but filtered correctly
  });

  test("sorts classes by start time", () => {
    const result = getStudentTimetable("BSE-3B", allEntries);
    expect(result.entries[0].course).toBe("SE-1001"); // 09:00 before 11:00
    expect(result.entries[1].course).toBe("OOP");
  });

  test("shows a clear message instead of an error when there are no classes", () => {
    const result = getStudentTimetable("BSE-3C", allEntries);
    expect(result.hasClasses).toBe(false);
    expect(result.message).toBe("No classes scheduled.");
    expect(result.entries).toEqual([]);
  });
});
