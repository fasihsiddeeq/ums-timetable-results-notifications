const { getNotifications } = require("../src/getNotifications");

describe("getNotifications", () => {
  const all = [
    { id: "N1", userId: "S1", message: "Timetable updated", timestamp: "2026-09-25T09:00:00Z", read: true },
    { id: "N2", userId: "S1", message: "Result published", timestamp: "2026-09-26T09:00:00Z", read: false },
    { id: "N3", userId: "S2", message: "Timetable updated", timestamp: "2026-09-25T09:00:00Z", read: false },
  ];

  test("returns only the user's own notifications, most recent first", () => {
    const result = getNotifications("S1", all);
    expect(result.notifications.length).toBe(2);
    expect(result.notifications[0].id).toBe("N2"); // most recent first
  });

  test("preserves read/unread flags", () => {
    const result = getNotifications("S1", all);
    expect(result.notifications.find((n) => n.id === "N1").read).toBe(true);
    expect(result.notifications.find((n) => n.id === "N2").read).toBe(false);
  });

  test("shows a clear message for an empty list", () => {
    const result = getNotifications("S3", all);
    expect(result.hasNotifications).toBe(false);
    expect(result.message).toBe("No notifications.");
  });
});
