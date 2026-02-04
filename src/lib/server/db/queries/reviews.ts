import { db } from '../index';
import { reviews } from '../schema';
import { eq } from 'drizzle-orm';

// create a review 
export async function createReview(data: {
  appointment_id: number;
  client_id: string;
  stylist_id: string;
  rating: number;
  comment?: string;
}) {
  const [review] = await db.insert(reviews).values(data).returning();
  return review;
}

// get reviews by stylist
export async function getReviewsByStylist(stylistId: string) {
  return await db.select().from(reviews).where(eq(reviews.stylist_id, stylistId));
}

// get reviews by client
export async function getReviewsByClient(clientId: string) {
  return await db.select().from(reviews).where(eq(reviews.client_id, clientId));
}

// get review by appointment
export async function getReviewByAppointment(appointmentId: number) {
  const [review] = await db.select()
    .from(reviews)
    .where(eq(reviews.appointment_id, appointmentId));
  return review;
}

// get average rating of a stylist
export async function getStylistAverageRating(stylistId: string) {
  const stylistReviews = await getReviewsByStylist(stylistId);
  
  if (stylistReviews.length === 0) return 0;
  
  const total = stylistReviews.reduce((sum, review) => sum + review.rating, 0);
  return total / stylistReviews.length;
}

// update a review
export async function updateReview(id: number, data: {
  rating?: number;
  comment?: string;
}) {
  const [updated] = await db.update(reviews)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(reviews.id, id))
    .returning();
  return updated;
}

// delete a review
export async function deleteReview(id: number) {
  const [deleted] = await db.delete(reviews)
    .where(eq(reviews.id, id))
    .returning();
  return deleted;
}