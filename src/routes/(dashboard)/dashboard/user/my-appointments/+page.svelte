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

  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // Transform database appointments to view model
  const appointmentsCallback = $derived(
    data.appointments.map(apt => {
      const mainService = apt.items[0]?.service;
      const dateDate = new Date(apt.start_time);
      const statusLower = apt.status.toLowerCase();
      
      let mappedStatus: 'upcoming' | 'completed' | 'cancelled';
      if (['pending', 'confirmed', 'rescheduled'].includes(statusLower)) {
        mappedStatus = 'upcoming';
      } else if (statusLower === 'completed') {
        mappedStatus = 'completed';
      } else {
        mappedStatus = 'cancelled';
      }
      
      return {
        id: apt.id.toString(),
        serviceName: mainService?.name || 'Custom Service',
        serviceImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop', // Fallback as services satisfy no image
        stylistName: apt.stylist?.full_name || 'Unknown Stylist',
        stylistImage: apt.stylist?.photo_url || '',
        date: dateDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: dateDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        duration: apt.items.reduce((acc, item) => acc + (item.duration || 0), 0),
        price: apt.items.reduce((acc, item) => acc + parseFloat(item.price || '0'), 0),
        status: mappedStatus,
        // TODO: specific rating query if needed
      };
    })
  );

  const upcomingAppointments = $derived(
    appointmentsCallback.filter(apt => apt.status === 'upcoming')
  );

  const pastAppointments = $derived(
    appointmentsCallback.filter(apt => ['completed', 'cancelled'].includes(apt.status))
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
