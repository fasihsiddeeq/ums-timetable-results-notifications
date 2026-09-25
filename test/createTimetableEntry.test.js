const { createTimetableEntry } = require("../src/createTimetableEntry");

describe("createTimetableEntry", () => {
  test("creates an entry successfully with all required fields", () => {
    const result = createTimetableEntry({
      day: "Mon", startTime: "09:00", endTime: "10:00",
      room: "R101", section: "BSE-3B", faculty: "Amna Awan", course: "SE-1001",
    });
    expect(result.success).toBe(true);
    expect(result.entry.room).toBe("R101");
    expect(result.entry.id).toBeDefined();
  });

  test("rejects an entry missing a required field", () => {
    const result = createTimetableEntry({
      day: "Mon", startTime: "09:00", endTime: "10:00",
      room: "R101", section: "BSE-3B",
      // faculty and course missing
    });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/faculty/);
    expect(result.error).toMatch(/course/);
  });
});
