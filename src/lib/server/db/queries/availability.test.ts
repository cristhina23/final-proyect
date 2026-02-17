// availability.test.ts
import { AvailabilityService } from './availability';

// Mock de getSalonHours
jest.mock('./salon', () => ({
  getSalonHours: jest.fn().mockResolvedValue([
    { day_of_week: 1, is_open: true, open_time: '09:00', close_time: '18:00' },
    { day_of_week: 2, is_open: true, open_time: '09:00', close_time: '18:00' },
  ]),
}));

// Mock de la base de datos directamente dentro de jest.mock
jest.mock('../index', () => {
  const mockDb = {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue([]), // por defecto no hay resultados
  };
  return { db: mockDb };
});

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  beforeEach(() => {
    service = new AvailabilityService();
    // No necesitas jest.clearAllMocks() si los mocks se redefinen dentro de jest.mock
  });

  it('should return available slots when stylist has availability and no appointments', async () => {
    // Para este test específico, podemos sobrescribir el comportamiento de where
    const { db } = await import('../index'); // importa el mock dinámicamente
    db.where.mockResolvedValueOnce([{ start_time: '09:00', end_time: '12:00' }]);

    const date = new Date('2026-02-17');
    const slots = await service.getAvailableTimeSlots('stylist1', date, 60);
    expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30', '11:00']);
  });
});
