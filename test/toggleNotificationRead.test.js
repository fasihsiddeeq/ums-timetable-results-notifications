const { toggleNotificationRead } = require("../src/toggleNotificationRead");

describe("toggleNotificationRead", () => {
  const all = [
    { id: "N1", read: false },
    { id: "N2", read: true },
  ];

  test("toggles the target notification's read status", () => {
    const result = toggleNotificationRead("N1", all);
    expect(result.find((n) => n.id === "N1").read).toBe(true);
  });

  test("does not affect other notifications", () => {
    const result = toggleNotificationRead("N1", all);
    expect(result.find((n) => n.id === "N2").read).toBe(true); // unchanged
  });

  test("toggles back and forth correctly", () => {
    const once = toggleNotificationRead("N2", all);
    const twice = toggleNotificationRead("N2", once);
    expect(twice.find((n) => n.id === "N2").read).toBe(true); // back to original
  });
});
