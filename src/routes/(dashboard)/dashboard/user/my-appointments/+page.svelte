<!--
  My Appointments Page
  Displays user's upcoming and past appointments.
-->
<script lang="ts">
  import AppointmentCard from "$lib/components/Dashboard/userDashboard/myAppointments/AppointmentCard.svelte";
  import { List, Calendar as CalendarIcon } from "lucide-svelte";

  // State
  let activeTab = $state<'upcoming' | 'past'>('upcoming');
  let viewMode = $state<'list' | 'calendar'>('list');

  // Mock appointment data
  const mockAppointments = [
    {
      id: '1',
      serviceName: 'Balayage & Styling',
      serviceImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
      stylistName: 'Elena Rodriguez',
      stylistImage: '',
      date: 'Oct 10, 2023',
      time: '2:30 PM',
      duration: 60,
      price: 85.00,
      status: 'upcoming' as const,
    },
    {
      id: '2',
      serviceName: 'Color & Conditioning',
      serviceImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&h=200&fit=crop',
      stylistName: 'Sarah J.',
      stylistImage: '',
      date: 'Oct 16, 2023',
      time: '10:30 AM',
      duration: 120,
      price: 150.00,
      status: 'upcoming' as const,
    },
    {
      id: '3',
      serviceName: 'Signature Trim & Blowout',
      serviceImage: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=200&h=200&fit=crop',
      stylistName: 'Michael R.',
      stylistImage: '',
      date: 'Sep 15, 2023',
      time: '3:00 PM',
      duration: 45,
      price: 65.00,
      status: 'completed' as const,
      rating: 5.0,
    },
    {
      id: '4',
      serviceName: 'Full Head Highlights',
      serviceImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop',
      stylistName: 'Jessica T.',
      stylistImage: '',
      date: 'Aug 20, 2023',
      time: '11:00 AM',
      duration: 180,
      price: 200.00,
      status: 'completed' as const,
    },
    {
      id: '5',
      serviceName: 'Deep Hydration Mask',
      serviceImage: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=200&h=200&fit=crop',
      stylistName: 'Emily K.',
      stylistImage: '',
      date: 'Jul 5, 2023',
      time: '1:00 PM',
      duration: 60,
      price: 75.00,
      status: 'completed' as const,
      rating: 4.5,
    }
  ];

  const upcomingAppointments = $derived(
    mockAppointments.filter(apt => apt.status === 'upcoming')
  );

  const pastAppointments = $derived(
    mockAppointments.filter(apt => apt.status !== 'upcoming')
  );

  const displayedAppointments = $derived(
    activeTab === 'upcoming' ? upcomingAppointments : pastAppointments
  );
</script>

<svelte:head>
  <title>My Appointments | BeautySalon</title>
  <meta name="description" content="Manage and track your salon bookings." />
</svelte:head>

<div class="min-h-screen bg-background p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-foreground mb-2">My Appointments</h1>
      <p class="text-muted-foreground">Manage and track your salon bookings.</p>
    </div>

    <!-- Tabs & View Toggle -->
    <div class="flex items-center justify-between mb-6">
      <!-- Tabs -->
      <div class="flex gap-2 bg-muted p-1 rounded-xl">
        <button
          onclick={() => activeTab = 'upcoming'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors
          {activeTab === 'upcoming' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
        >
          Upcoming Appointments
        </button>
        <button
          onclick={() => activeTab = 'past'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors
          {activeTab === 'past' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
        >
          Past Appointments
        </button>
      </div>

      <!-- View Toggle -->
      <div class="flex gap-2 bg-muted p-1 rounded-xl">
        <button
          onclick={() => viewMode = 'list'}
          class="p-2 rounded-lg transition-colors
          {viewMode === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
          aria-label="List view"
        >
          <List size={20} />
        </button>
        <button
          onclick={() => viewMode = 'calendar'}
          class="p-2 rounded-lg transition-colors
          {viewMode === 'calendar' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}"
          aria-label="Calendar view"
        >
          <CalendarIcon size={20} />
        </button>
      </div>
    </div>

    <!-- Appointments List -->
    {#if displayedAppointments.length > 0}
      <div class="space-y-4">
        {#each displayedAppointments as appointment (appointment.id)}
          <AppointmentCard {appointment} isPast={activeTab === 'past'} />
        {/each}
      </div>
    {:else}
      <div class="text-center py-12">
        <p class="text-muted-foreground">
          {activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
        </p>
      </div>
    {/if}
  </div>
</div>
