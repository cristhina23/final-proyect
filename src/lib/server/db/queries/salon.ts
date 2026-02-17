import { db } from '../index';
import { salon_hours } from '../schema';


export async function getSalonHours() {
  return await db.select().from(salon_hours).orderBy(salon_hours.day_of_week);
}

export async function updateSalonHours(hours: { day_of_week: number, open_time: string, close_time: string, is_open: boolean }[]) {
  console.log(`--- UPDATE SALON HOURS QUERY ---`);
  console.log(`Input length: ${hours.length}`);
  
  const results = [];
  for (const h of hours) {
    try {
      console.log(`Saving day ${h.day_of_week}: ${h.open_time}-${h.close_time} (Open: ${h.is_open})`);
      const [updated] = await db
        .insert(salon_hours)
        .values(h)
        .onConflictDoUpdate({
          target: salon_hours.day_of_week,
          set: { 
            open_time: h.open_time, 
            close_time: h.close_time, 
            is_open: h.is_open,
            updatedAt: new Date() 
          }
        })
        .returning();
      results.push(updated);
    } catch (err) {
      console.error(`Error saving day ${h.day_of_week}:`, err);
    }
  }
  console.log(`Successfully saved ${results.length} records`);
  return results;
}
