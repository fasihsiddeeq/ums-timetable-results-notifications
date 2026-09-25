const { hasClash } = require("../src/clashDetector");

// US-04: As an admin/coordinator, I want the system to detect scheduling
// clashes, so that no room, section, or faculty member is double-booked.
//
// TDD NOTE FOR YOUR EVIDENCE (Q7-b):
// 1. RED   -> write this test file FIRST, before src/clashDetector.js exists
//             (or before hasClash is implemented). Run `npm test` and take
//             a screenshot of the FAILING test output.
// 2. GREEN -> implement the minimum code in src/clashDetector.js to make
//             these tests pass. Run `npm test` again, screenshot the PASS.
// 3. VERIFY-> re-run the full suite one more time as final verification.

describe("hasClash", () => {
  const existing = [
    { id: "E1", day: "Mon", startTime: "09:00", endTime: "10:00", room: "R101", section: "BSE-3B", faculty: "Amna Awan" },
  ];

  test("no clash when the day is different", () => {
    const newEntry = { id: "N1", day: "Tue", startTime: "09:00", endTime: "10:00", room: "R101", section: "BSE-3B", faculty: "Amna Awan" };
    expect(hasClash(newEntry, existing)).toEqual([]);
  });

  test("no clash when times don't overlap on the same day", () => {
    const newEntry = { id: "N2", day: "Mon", startTime: "10:00", endTime: "11:00", room: "R101", section: "BSE-3B", faculty: "Amna Awan" };
    expect(hasClash(newEntry, existing)).toEqual([]);
  });

  test("back-to-back slots (end == start) are NOT a clash", () => {
    const newEntry = { id: "N3", day: "Mon", startTime: "10:00", endTime: "11:00", room: "R101", section: "BSE-3B", faculty: "Amna Awan" };
    expect(hasClash(newEntry, existing).length).toBe(0);
  });

  test("clash detected for same room + overlapping time", () => {
    const newEntry = { id: "N4", day: "Mon", startTime: "09:30", endTime: "10:30", room: "R101", section: "BSE-3A", faculty: "Bilal Khan" };
    const result = hasClash(newEntry, existing);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("E1");
  });

  test("clash detected for same faculty even in a different room", () => {
    const newEntry = { id: "N5", day: "Mon", startTime: "09:15", endTime: "09:45", room: "R202", section: "BSE-3A", faculty: "Amna Awan" };
    expect(hasClash(newEntry, existing).length).toBe(1);
  });

  test("clash detected for same section even with different faculty/room", () => {
    const newEntry = { id: "N6", day: "Mon", startTime: "09:15", endTime: "09:45", room: "R303", section: "BSE-3B", faculty: "Bilal Khan" };
    expect(hasClash(newEntry, existing).length).toBe(1);
  });

  test("partial overlap at the boundary is detected", () => {
    const newEntry = { id: "N7", day: "Mon", startTime: "08:30", endTime: "09:15", room: "R101", section: "BSE-3A", faculty: "Bilal Khan" };
    expect(hasClash(newEntry, existing).length).toBe(1);
  });

  test("returns multiple conflicts if more than one entry overlaps", () => {
    const twoExisting = [
      ...existing,
      { id: "E2", day: "Mon", startTime: "09:30", endTime: "10:15", room: "R999", section: "BSE-3C", faculty: "Sara Ali" },
    ];
    const newEntry = { id: "N8", day: "Mon", startTime: "09:00", endTime: "10:00", room: "R101", section: "BSE-3C", faculty: "Amna Awan" };
    expect(hasClash(newEntry, twoExisting).length).toBe(2);
  });
});
