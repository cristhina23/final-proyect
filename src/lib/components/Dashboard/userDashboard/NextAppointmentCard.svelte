<!--
  NextAppointmentCard component
  Displays the user's next appointment with date, time, and stylist information.
-->
<script lang="ts">
  import { Calendar, Clock, User } from "lucide-svelte";

  const props = $props<{
    date: string;
    time: string;
    stylistName: string;
    stylistImage?: string;
  }>();

  const { date, time, stylistName, stylistImage } = $derived(props);
</script>

<div class="rounded-xl bg-card border border-border shadow-md p-6 transition hover:shadow-lg">
  <div class="flex items-center gap-2 text-muted-foreground mb-4">
    <Calendar size={18} />
    <h3 class="text-sm font-medium uppercase tracking-wide">Next Appointment</h3>
  </div>

  <div class="space-y-3">
    <!-- Date -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-secondary/30 text-brown flex items-center justify-center">
        <Calendar size={16} />
      </div>
      <span class="text-foreground font-medium">{date}</span>
    </div>

    <!-- Time -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-secondary/30 text-brown flex items-center justify-center">
        <Clock size={16} />
      </div>
      <span class="text-foreground font-medium">{time}</span>
    </div>

    <!-- Stylist -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-secondary/30 text-brown flex items-center justify-center overflow-hidden">
        {#if stylistImage}
          <img src={stylistImage} alt={stylistName} class="w-full h-full object-cover" />
        {:else}
          <User size={16} />
        {/if}
      </div>
      <div>
        <p class="text-xs text-muted-foreground">STYLIST</p>
        <p class="text-foreground font-medium">{stylistName}</p>
      </div>
    </div>
  </div>
</div>
