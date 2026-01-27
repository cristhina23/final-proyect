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
    onDateSelect?: (date: Date | undefined) => void;
    onTimeSelect?: (time: string) => void;
  }>();

  const { selectedDate, selectedTime, onDateSelect, onTimeSelect } = $derived(props);

  // Convert Date to DateValue for calendar
  let calendarValue = $state<DateValue | undefined>(undefined);

  // Time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  
  $effect(() => {
    if (calendarValue) {
      // Convert DateValue to Date
      const date = new Date(calendarValue.year, calendarValue.month - 1, calendarValue.day);
      onDateSelect?.(date);
    } else {
      onDateSelect?.(undefined);
    }
  });

 
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
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {#each timeSlots as time}
          <button
            onclick={() => onTimeSelect?.(time)}
            class="py-2 px-3 rounded-xl border-2 transition-all text-sm font-medium
            {selectedTime === time 
              ? 'border-primary bg-primary/5 text-primary' 
              : 'border-border bg-card hover:border-primary/50 text-foreground'}"
          >
            {time}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
