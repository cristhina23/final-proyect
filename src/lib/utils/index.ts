export function generateTimeSlots(
  openHour = 9,
  closeHour = 19,
  stepMinutes = 30
): string[] {
  const slots: string[] = [];

  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      slots.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
    }
  }

  return slots;
}
