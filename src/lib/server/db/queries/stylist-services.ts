import { db } from '../index';
import { stylist_services, services } from '../schema';
import { eq, and } from 'drizzle-orm';

// assign a service to a stylist
export async function assignServiceToStylist(stylistId: string, serviceId: number) {
  const [assignment] = await db.insert(stylist_services)
    .values({ stylist_id: stylistId, service_id: serviceId })
    .returning();
  return assignment;
}

// get all the services that a stylist offers
export async function getStylistServices(stylistId: string) {
  return await db.select({
    service: services
  })
    .from(stylist_services)
    .innerJoin(services, eq(stylist_services.service_id, services.id))
    .where(eq(stylist_services.stylist_id, stylistId));
}

// remove a service from a stylist
export async function removeServiceFromStylist(stylistId: string, serviceId: number) {
  const [deleted] = await db.delete(stylist_services)
    .where(
      and(
        eq(stylist_services.stylist_id, stylistId),
        eq(stylist_services.service_id, serviceId)
      )
    )
    .returning();
  return deleted;
}