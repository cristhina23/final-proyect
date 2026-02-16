<!--
  DateTimePicker component
  Calendar and time slot selection using shadcn calendar.
-->
<script lang="ts">
  import { Calendar } from "$lib/components/ui/calendar";
  import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";

  const props = $props<{
    selectedDate: Date | undefined;
    selectedTime: string | null;
    stylistId?: string;
    duration?: number;
    onDateSelect?: (date: Date | undefined) => void;
    onTimeSelect?: (time: string) => void;
  }>();

  const { selectedDate, selectedTime, stylistId, duration = 60, onDateSelect, onTimeSelect } = $derived(props);

  // Convert Date to DateValue for calendar
  let calendarValue = $state<DateValue | undefined>(undefined);

  // Time slots
  let timeSlots = $state<string[]>([]);
  let loadingSlots = $state(false);

  async function fetchSlots(date: Date) {
    if (!stylistId) return;
    loadingSlots = true;
    try {
      const dateStr = date.toISOString().split('T')[0];
      const res = await fetch(`/api/availability?stylistId=${stylistId}&date=${dateStr}&duration=${duration}`);
      if (res.ok) {
        timeSlots = await res.json();
      } else {
        timeSlots = [];
      }
    } catch (err) {
      console.error('Error fetching slots:', err);
      timeSlots = [];
    } finally {
      loadingSlots = false;
    }
  }
  
  $effect(() => {
    if (calendarValue) {
      // Convert DateValue to Date
      const date = new Date(calendarValue.year, calendarValue.month - 1, calendarValue.day);
      onDateSelect?.(date);
      fetchSlots(date);
    } else {
      onDateSelect?.(undefined);
      timeSlots = [];
    }
  });

  function formatTime(time24: string) {
    const [hours, minutes] = time24.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }

 
  const todayDate = today(getLocalTimeZone());
</script>

<div class="space-y-6">
  <!-- Calendar -->
  <div>
    <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Select Date</h3>
    <div class="flex justify-center">
      <Calendar
        bind:value={calendarValue}
        minValue={todayDate}
        class="rounded-xl border border-border"
        type="single"
      />
    </div>
  </div>

  <!-- Time Selection -->
  {#if selectedDate}
    <div>
      <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">Select Time</h3>
      
      {#if loadingSlots}
        <div class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      {:else if timeSlots.length === 0}
        <div class="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
          No available slots for this day.
        </div>
      {:else}
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {#each timeSlots as time}
            <button
              onclick={() => onTimeSelect?.(time)}
              class="py-2 px-3 rounded-xl border-2 transition-all text-sm font-medium
              {selectedTime === time 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border bg-card hover:border-primary/50 text-foreground'}"
            >
              {formatTime(time)}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
