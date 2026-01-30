<script lang="ts">
  import { onMount } from 'svelte';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { X, Plus, Clock, User, Scissors } from 'lucide-svelte';

  let calendarEl: HTMLDivElement;
  let calendar: Calendar;
  let showModal = $state(false);
  let selectedDate = $state('');
  let selectedTime = $state('09:00');
  let eventTitle = $state('');
  let clientName = $state('');
  let serviceType = $state('');
  let eventDuration = $state('60');
  let editingEvent: any = $state(null);

  // Sample events data
  let events = $state([
    {
      id: '1',
      title: 'Isabella Thorne - Balayage',
      start: '2026-01-27T10:00:00',
      end: '2026-01-27T12:00:00',
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b',
      extendedProps: {
        client: 'Isabella Thorne',
        service: 'Balayage & Haircut'
      }
    },
    {
      id: '2',
      title: 'Sarah Miller - Color Treatment',
      start: '2026-01-27T14:30:00',
      end: '2026-01-27T16:00:00',
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
      extendedProps: {
        client: 'Sarah Miller',
        service: 'Color Treatment'
      }
    },
    {
      id: '3',
      title: 'Julianne Moore - Blowout',
      start: '2026-01-28T11:00:00',
      end: '2026-01-28T12:00:00',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      extendedProps: {
        client: 'Julianne Moore',
        service: 'Blowout'
      }
    }
  ]);

  onMount(() => {
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      allDaySlot: false,
      height: 'auto',
      events: events,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      
      // Handle date selection
      select: (info) => {
        selectedDate = info.startStr.split('T')[0];
        selectedTime = info.startStr.split('T')[1]?.substring(0, 5) || '09:00';
        eventTitle = '';
        clientName = '';
        serviceType = '';
        eventDuration = '60';
        editingEvent = null;
        showModal = true;
      },
      
      // Handle event click for editing
      eventClick: (info) => {
        editingEvent = info.event;
        const startDate = new Date(info.event.start!);
        selectedDate = startDate.toISOString().split('T')[0];
        selectedTime = startDate.toTimeString().substring(0, 5);
        clientName = info.event.extendedProps.client || '';
        serviceType = info.event.extendedProps.service || '';
        eventTitle = info.event.title;
        
        // Calculate duration
        if (info.event.end) {
          const duration = (info.event.end.getTime() - info.event.start!.getTime()) / (1000 * 60);
          eventDuration = duration.toString();
        }
        
        showModal = true;
      },
      
      // Handle event drop/resize
      eventDrop: (info) => {
        updateEventInArray(info.event);
      },
      
      eventResize: (info) => {
        updateEventInArray(info.event);
      }
    });

    calendar.render();
  });

  function updateEventInArray(event: any) {
    const index = events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      events[index] = {
        ...events[index],
        start: event.start.toISOString(),
        end: event.end?.toISOString() || event.start.toISOString()
      };
    }
  }

  function handleSaveEvent() {
    if (!clientName || !serviceType || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const endDateTime = new Date(startDateTime.getTime() + parseInt(eventDuration) * 60000);

    const colors = ['#f59e0b', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (editingEvent) {
      // Update existing event
      editingEvent.setProp('title', `${clientName} - ${serviceType}`);
      editingEvent.setStart(startDateTime);
      editingEvent.setEnd(endDateTime);
      editingEvent.setExtendedProp('client', clientName);
      editingEvent.setExtendedProp('service', serviceType);
      
      // Update in events array
      const index = events.findIndex(e => e.id === editingEvent.id);
      if (index !== -1) {
        events[index] = {
          ...events[index],
          title: `${clientName} - ${serviceType}`,
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          extendedProps: {
            client: clientName,
            service: serviceType
          }
        };
      }
    } else {
      // Create new event
      const newEvent = {
        id: Date.now().toString(),
        title: `${clientName} - ${serviceType}`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        backgroundColor: randomColor,
        borderColor: randomColor,
        extendedProps: {
          client: clientName,
          service: serviceType
        }
      };

      events = [...events, newEvent];
      calendar.addEvent(newEvent);
    }

    closeModal();
  }

  function handleDeleteEvent() {
    if (editingEvent && confirm('Are you sure you want to delete this appointment?')) {
      editingEvent.remove();
      events = events.filter(e => e.id !== editingEvent.id);
      closeModal();
    }
  }

  function closeModal() {
    showModal = false;
    eventTitle = '';
    clientName = '';
    serviceType = '';
    selectedDate = '';
    selectedTime = '09:00';
    eventDuration = '60';
    editingEvent = null;
  }

  function openNewEventModal() {
    const today = new Date();
    selectedDate = today.toISOString().split('T')[0];
    selectedTime = '09:00';
    eventTitle = '';
    clientName = '';
    serviceType = '';
    eventDuration = '60';
    editingEvent = null;
    showModal = true;
  }
</script>

<div class="flex h-screen flex-col p-6">
  <!-- Header -->
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">My Schedule</h1>
      <p class="text-gray-500 mt-1">Manage your appointments and availability</p>
    </div>
    <button
      onclick={openNewEventModal}
      class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
    >
      <Plus class="w-5 h-5" />
      New Appointment
    </button>
  </div>

  <!-- Calendar Container -->
  <div class="bg-white rounded-lg shadow-lg p-6 flex-1 overflow-auto">
    <div bind:this={calendarEl} class="calendar-container"></div>
  </div>
</div>

<!-- Modal for Adding/Editing Events -->
{#if showModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
      <!-- Close Button -->
      <button
        onclick={closeModal}
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Modal Header -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        {editingEvent ? 'Edit Appointment' : 'New Appointment'}
      </h2>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Client Name -->
        <div>
          <label for="clientName" class="block text-sm font-medium text-gray-700 mb-1">
            <div class="flex items-center gap-2">
              <User class="w-4 h-4" />
              Client Name *
            </div>
          </label>
          <input
            type="text"
            id="clientName"
            bind:value={clientName}
            placeholder="Enter client name"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <!-- Service Type -->
        <div>
          <label for="serviceType" class="block text-sm font-medium text-gray-700 mb-1">
            <div class="flex items-center gap-2">
              <Scissors class="w-4 h-4" />
              Service Type *
            </div>
          </label>
          <select
            id="serviceType"
            bind:value={serviceType}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select a service</option>
            <option value="Haircut">Haircut</option>
            <option value="Balayage">Balayage</option>
            <option value="Color Treatment">Color Treatment</option>
            <option value="Blowout">Blowout</option>
            <option value="Highlights">Highlights</option>
            <option value="Keratin Treatment">Keratin Treatment</option>
            <option value="Hair Extensions">Hair Extensions</option>
            <option value="Consultation">Consultation</option>
          </select>
        </div>

        <!-- Date -->
        <div>
          <label for="selectedDate" class="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            type="date"
            id="selectedDate"
            bind:value={selectedDate}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <!-- Time and Duration -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="selectedTime" class="block text-sm font-medium text-gray-700 mb-1">
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                Time *
              </div>
            </label>
            <input
              type="time"
              id="selectedTime"
              bind:value={selectedTime}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label for="eventDuration" class="block text-sm font-medium text-gray-700 mb-1">
              Duration (min)
            </label>
            <select
              id="eventDuration"
              bind:value={eventDuration}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="30">30 min</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="150">2.5 hours</option>
              <option value="180">3 hours</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mt-6">
        {#if editingEvent}
          <button
            onclick={handleDeleteEvent}
            class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        {/if}
        <button
          onclick={closeModal}
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onclick={handleSaveEvent}
          class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          {editingEvent ? 'Update' : 'Save'}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.calendar-container) {
    font-family: inherit;
  }

  :global(.fc) {
    font-size: 0.875rem;
  }

  :global(.fc .fc-button) {
    background-color: hsl(var(--primary));
    border-color: hsl(var(--primary));
    text-transform: capitalize;
    padding: 0.5rem 1rem;
    font-weight: 500;
  }

  :global(.fc .fc-button:hover) {
    background-color: hsl(var(--primary) / 0.9);
    border-color: hsl(var(--primary) / 0.9);
  }

  :global(.fc .fc-button-primary:not(:disabled).fc-button-active) {
    background-color: hsl(var(--primary) / 0.8);
    border-color: hsl(var(--primary) / 0.8);
  }

  :global(.fc .fc-button:focus) {
    box-shadow: 0 0 0 0.2rem hsl(var(--primary) / 0.25);
  }

  :global(.fc-theme-standard td, .fc-theme-standard th) {
    border-color: #e5e7eb;
  }

  :global(.fc-theme-standard .fc-scrollgrid) {
    border-color: #e5e7eb;
  }

  :global(.fc .fc-col-header-cell) {
    background-color: #f9fafb;
    font-weight: 600;
    padding: 0.75rem 0;
  }

  :global(.fc .fc-daygrid-day.fc-day-today) {
    background-color: #fef3c7 !important;
  }

  :global(.fc .fc-timegrid-slot) {
    height: 3rem;
  }

  :global(.fc-event) {
    cursor: pointer;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }

  :global(.fc-event:hover) {
    opacity: 0.9;
  }

  :global(.fc-event-title) {
    font-weight: 500;
  }

  :global(.fc .fc-toolbar-title) {
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
  }
</style>
