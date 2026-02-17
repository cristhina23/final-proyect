/**
 * TimeSlotCalculator
 * ------------------
 * Generates time slots between a start and end time
 * using a fixed duration in minutes.
 */
export class TimeSlotCalculator {
  
  /**
   * Constructor
   * 
   * @param start - The time to start generating slots.
   * @param end - The time to stop generating slots.
   * @param durationMinutes - Length of each slot in minutes.
   */
  constructor(
    private start: Date,
    private end: Date,
    private durationMinutes: number
  ) {}

  /**
   * Generates all available time slots.
   * 
   * @returns Array of Date objects.
   */
  public generateSlots(): Date[] {
    return this.generateRecursive(this.start, []);
  }

  /**
   * Recursively creates time slots.
   * 
   * @param current - Current time being processed.
   * @param slots - List of generated slots so far.
   * @returns Array of Date objects.
   */
  private generateRecursive(current: Date, slots: Date[]): Date[] {
    // Stop when current time is equal to or after the end time
    if (current >= this.end) {
      return slots;
    }

    // Add the current time to the list
    slots.push(new Date(current));

    // Calculate the next slot time
    const next = new Date(
      current.getTime() + this.durationMinutes * 60000
    );

    // Continue generating slots
    return this.generateRecursive(next, slots);
  }
}
