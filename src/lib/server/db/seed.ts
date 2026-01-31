import { db } from './index';
import * as queries from './queries';

export async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    // 1. Create services
    console.log('Creating services...');
    const service1 = await queries.createService({
      name: 'Cut',
      description: 'Basic cut for men and women',
      duration_minutes: 30,
      price: '25.00',
      category: 'Haircut'
    });

    const service2 = await queries.createService({
      name: 'Complete Dye',
      description: 'Dyeing the entire hair',
      duration_minutes: 120,
      price: '80.00',
      category: 'Color'
    });

    const service3 = await queries.createService({
      name: 'Manicure',
      description: 'Basic manicure',
      duration_minutes: 45,
      price: '45.00',
      category: 'Nails'
    });

    console.log(`Created ${3} services`);

    // 2. Create users
    console.log('Creating users...');
    
    // Admin
    const admin = await queries.createUser({
      email: 'admin@salon.com',
      role: 'ADMIN',
      full_name: 'Admin',
      phone: '555-0000'
    });

    // Estilistas
    const stylist1 = await queries.createUser({
      email: 'john@salon.com',
      role: 'STYLIST',
      full_name: 'John Doe',
      phone: '555-1111'
    });

    const stylist2 = await queries.createUser({
      email: 'sofia@salon.com',
      role: 'STYLIST',
      full_name: 'Sofia Doe',
      phone: '555-2222'
    });

    // Clientes
    const client1 = await queries.createUser({
      email: 'ana@gmail.com',
      role: 'CLIENT',
      full_name: 'Ana Doe',
      phone: '555-3333',
      age: 28
    });

    const client2 = await queries.createUser({
      email: 'pedro@gmail.com',
      role: 'CLIENT',
      full_name: 'Pedro Doe',
      phone: '555-4444',
      age: 35
    });

    console.log(`Created ${5} users (1 admin, 2 stylists, 2 clients)`);

    // 3. Assign services to stylists
    console.log('Assigning services to stylists...');
    await queries.assignServiceToStylist(stylist1.id, service1.id);
    await queries.assignServiceToStylist(stylist1.id, service2.id);
    await queries.assignServiceToStylist(stylist2.id, service1.id);
    await queries.assignServiceToStylist(stylist2.id, service3.id);
    console.log('Assigned services to stylists');

    // 4. Create appointments
    console.log('Creating appointments...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const endTime = new Date(tomorrow);
    endTime.setHours(11, 0, 0, 0);

    const apt1 = await queries.createAppointment({
      client_id: client1.id,
      stylist_id: stylist1.id,
      start_time: tomorrow,
      end_time: endTime,
      status: 'CONFIRMED',
      notes: 'Primera cita'
    });

    // Add service to appointment
    await queries.addAppointmentItem({
      appointment_id: apt1.id,
      service_id: service1.id,
      name: service1.name,
      description: service1.description,
      duration_snapshot: service1.duration_minutes,
      price_snapshot: service1.price,
      is_extra: false
    });

    console.log(`Created ${1} appointment with items`);

    // 5. Create review
    console.log('Creating review...');
    await queries.createReview({
      appointment_id: apt1.id,
      client_id: client1.id,
      stylist_id: stylist1.id,
      rating: 5,
      comment: '¡Excelente servicio!'
    });
    console.log('Created 1 review');

    console.log('\n Database seeding completed successfully!');
    console.log('\nTest queries:');
    console.log('- All services:', await queries.getAllServices());
    console.log('- All stylists:', await queries.getAllStylists());
    console.log('- Stylist 1 average rating:', await queries.getStylistAverageRating(stylist1.id));

  } catch (error) {
    console.error(' Error seeding database:', error);
    throw error;
  }
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}