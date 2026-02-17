<script lang="ts">
  import { onMount } from 'svelte';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import { 
    ChevronLeft, 
    ChevronRight, 
    Search, 
    Bell, 
    Plus, 
    Calendar as CalendarIcon,
    Clock,
    User,
    Scissors,
    MoreVertical,
    Settings
  } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Avatar from "$lib/components/ui/avatar";
  import SalonHoursEditor from "$lib/components/Dashboard/adminDashboard/SalonHoursEditor.svelte";

  let calendarEl: HTMLDivElement;
  let calendar: Calendar;
  let schedule = $state<any[]>([]);
  let loading = $state(true);
  let currentView = $state("Weekly");
  let openSettings = $state(false);

  const viewsMapping: Record<string, string> = {
    "Weekly": "timeGridWeek",
    "Daily": "timeGridDay",
    "Monthly": "dayGridMonth"
  };

  async function applySalonHours() {
    console.log(' Salon hours updated - reloading page to refresh calendar...');
    // Simply reload the page - the calendar will initialize with the new hours
    window.location.reload();
  }

  async function loadSchedule() {
    console.log(' Loading appointments from database...');
    try {
      const res = await fetch("/api/schedule");
      if (res.ok) {
        const data = await res.json();
        console.log(` Fetched ${data.length} appointments:`, data);
        schedule = data;
        
        // Map to FullCalendar events
        const events = data.map((apt: any) => ({
          id: apt.id,
          title: `${apt.items?.[0]?.name || 'Service'} - ${apt.stylist?.full_name || 'Staff'}`,
          start: apt.start_time,
          end: apt.end_time,
          backgroundColor: apt.status === 'CONFIRMED' ? '#C8A180' : '#4A2F1F',
          borderColor: apt.status === 'CONFIRMED' ? '#C8A180' : '#4A2F1F',
          extendedProps: {
            stylist: apt.stylist?.full_name,
            service: apt.items?.[0]?.name,
            photo_url: apt.stylist?.photo_url
          }
        }));

        console.log(` Mapped ${events.length} events for calendar:`, events);
        calendar.removeAllEvents();
        calendar.addEventSource(events);
        console.log(' Events added to calendar');
      }
    } catch (error) {
      console.error(" Error loading schedule:", error);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    // Fetch salon hours FIRST to get the correct time range
    let initialMinTime = '09:00:00';
    let initialMaxTime = '18:00:00';
    
    console.log(' Initializing calendar - fetching salon hours...');
    try {
      const res = await fetch("/api/admin/salon-hours");
      if (res.ok) {
        const data = await res.json();
        console.log(' Fetched salon hours:', data);
        if (data.length > 0) {
          const openDays = data.filter((d: any) => d.is_open);
          console.log(' Open days:', openDays);
          if (openDays.length > 0) {
            const openTimes = openDays.map((d: any) => d.open_time).sort();
            const closeTimes = openDays.map((d: any) => d.close_time).sort();
            initialMinTime = `${openTimes[0]}:00`;
            initialMaxTime = `${closeTimes[closeTimes.length - 1]}:00`;
            console.log(` Calculated times - Min: ${initialMinTime}, Max: ${initialMaxTime}`);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching initial salon hours:", error);
    }
    
    console.log(`Creating calendar with times: ${initialMinTime} to ${initialMaxTime}`);
    // NOW create the calendar with the correct values
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: false, // We use our custom header
      slotMinTime: initialMinTime,
      slotMaxTime: initialMaxTime,
      allDaySlot: false,
      height: 'auto',
      editable: true,
      selectable: true,
      dayMaxEvents: true,
      weekends: true,
      nowIndicator: true,
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      },
      eventContent: (arg) => {
        return {
          html: `
            <div class="p-1 overflow-hidden">
              <div class="text-[10px] font-bold opacity-80">${arg.timeText}</div>
              <div class="text-xs font-black truncate">${arg.event.extendedProps.service || 'Service'}</div>
              <div class="flex items-center gap-1 mt-1">
                <div class="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center text-[8px]">
                  ${arg.event.extendedProps.stylist?.[0] || 'S'}
                </div>
                <div class="text-[9px] opacity-70 truncate italic">${arg.event.extendedProps.stylist || 'Staff'}</div>
              </div>
            </div>
          `
        };
      }
    });

    calendar.render();
    loadSchedule();
  });

  function switchView(view: string) {
    currentView = view;
    calendar.changeView(viewsMapping[view]);
  }

  function next() { calendar.next(); }
  function prev() { calendar.prev(); }
  function today() { calendar.today(); }
</script>

<div class="flex flex-col h-full bg-[#FEFCFF] text-[#2A2A2F]">
  <!-- Top Header -->
  <header class="flex items-center justify-between p-6 border-b border-gray-100">
    <div class="flex items-center gap-8">
      <h1 class="text-2xl font-bold text-brown">Master Schedule</h1>
      
      <!-- View Tabs -->
      <div class="flex bg-muted rounded-full p-1">
        {#each ["Weekly", "Daily", "Monthly"] as view}
          <button 
            class="px-6 py-1.5 rounded-full text-sm font-medium transition-all {currentView === view ? 'bg-white shadow-sm' : 'hover:bg-white/50'}"
            onclick={() => switchView(view)}
          >
            {view}
          </button>
        {/each}
      </div>
    </div>

    <div class="flex items-center gap-4">
      <!-- Search -->
      <div class="relative group">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          placeholder="Search appointments..." 
          class="pl-10 pr-4 py-2 bg-muted/50 border-none rounded-full w-64 focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all text-sm"
        />
      </div>

      <button 
        onclick={() => openSettings = true}
        class="p-2 rounded-full hover:bg-muted transition-colors" title="Salon Hours"
      >
        <Settings size={20} />
      </button>

      <button class="p-2 rounded-full hover:bg-muted transition-colors relative">
        <Bell size={20} />
        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
      </button>

      
    </div>
  </header>

  <SalonHoursEditor bind:open={openSettings} onsuccess={applySalonHours} />

  <!-- Filter Bar -->
  <div class="flex items-center justify-between px-6 py-4 bg-white/50 border-b border-gray-50">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2 text-sm">
        <span class="text-muted-foreground font-medium">Filter by:</span>
        <select class="bg-transparent font-bold text-brown outline-none cursor-pointer">
          <option>All Stylists</option>
        </select>
        <select class="bg-transparent font-bold text-brown outline-none cursor-pointer">
          <option>All Services</option>
        </select>
      </div>
      
      <div class="w-px h-6 bg-gray-200"></div>
      
      <button 
        onclick={today}
        class="flex items-center gap-2 text-sm font-medium text-primary hover:text-brown transition-colors"
      >
        <CalendarIcon size={16} />
        Go to Today
      </button>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4 bg-muted/30 px-4 py-1.5 rounded-lg">
        <button onclick={prev} class="hover:text-primary transition-colors"><ChevronLeft size={20} /></button>
        <span class="text-sm font-bold min-w-[150px] text-center">Schedule View</span>
        <button onclick={next} class="hover:text-primary transition-colors"><ChevronRight size={20} /></button>
      </div>
    </div>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <!-- Calendar Content -->
    <div class="flex-1 overflow-auto p-6 bg-white">
      <div bind:this={calendarEl} class="calendar-container"></div>
    </div>

    <!-- Sidebar -->
    <aside class="w-80 border-l bg-gray-50/30 flex flex-col">
      <div class="p-6 flex-1 overflow-auto space-y-6">
        <div>
          <h3 class="text-lg font-black text-brown mb-1">Unassigned</h3>
          <p class="text-xs text-muted-foreground font-medium">Drag to schedule onto calendar</p>
        </div>

        <div class="space-y-4">
          <!-- Sample Unassigned Cards to match design -->
          {#each ["Deep Conditioning", "Pedicure Deluxe", "Chemical Peel"] as service, i}
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group">
              <div class="flex justify-between items-start mb-3">
                <span class="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded bg-muted text-brown/70">
                  {i === 0 ? 'Hair Care' : i === 1 ? 'Nail Spa' : 'Skin Care'}
                </span>
                <button class="text-muted-foreground hover:text-brown transition-colors">
                  <MoreVertical size={14} />
                </button>
              </div>
              <h4 class="text-sm font-black text-brown mb-3">{service}</h4>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  <User size={12} class="text-primary" />
                  <span>{i === 0 ? 'Emily Watson' : i === 1 ? 'James Miller' : 'Linda G.'}</span>
                </div>
                <div class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  <Clock size={12} class="text-primary" />
                  <span>{i === 0 ? '45 mins' : i === 1 ? '60 mins' : '90 mins'}</span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="p-6 border-t bg-white">
        <Button class="w-full bg-primary hover:bg-brown text-white font-black py-6 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
          <Plus size={18} />
          New Appointment
        </Button>
      </div>
    </aside>
  </div>
</div>

<style>
  :global(.calendar-container) {
    font-family: inherit;
  }

  :global(.fc) {
    font-size: 0.875rem;
    --fc-border-color: #f3f4f6;
    --fc-today-bg-color: #F9ECE1;
    --fc-page-bg-color: transparent;
  }

  :global(.fc .fc-col-header-cell) {
    padding: 1rem 0;
    background: #fff;
  }

  :global(.fc .fc-col-header-cell-cushion) {
    text-decoration: none;
    color: var(--brown);
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  :global(.fc .fc-timegrid-slot-label-cushion) {
    font-size: 0.65rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
  }

  :global(.fc-v-event) {
    border-radius: 0.75rem;
    border: none;
    padding: 0;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  :global(.fc-timegrid-now-indicator-line) {
    border-color: #ef4444;
  }

  :global(.fc-timegrid-now-indicator-arrow) {
    border-color: #ef4444;
    background-color: #ef4444;
  }
</style>
