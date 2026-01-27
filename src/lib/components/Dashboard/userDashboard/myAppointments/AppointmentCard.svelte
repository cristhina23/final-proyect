<!--
  AppointmentCard component
  Displays appointment details with service info, stylist, and action buttons.
-->
<script lang="ts">
  import { Calendar, Clock, Star } from "lucide-svelte";

  type Appointment = {
    id: string;
    serviceName: string;
    serviceImage: string;
    stylistName: string;
    stylistImage?: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    status: 'upcoming' | 'completed' | 'cancelled';
    rating?: number;
  };

  const props = $props<{
    appointment: Appointment;
    isPast: boolean;
  }>();

  const { appointment, isPast } = $derived(props);
</script>

<div class="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
  <div class="flex gap-4">
    <!-- Service Image -->
    <div class="w-20 h-20 rounded-xl overflow-hidden bg-secondary/30 flex-shrink-0">
      <img src={appointment.serviceImage} alt={appointment.serviceName} class="w-full h-full object-cover" />
    </div>

    <!-- Appointment Details -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div class="flex-1 min-w-0">
          <h3 class="font-heading text-lg font-bold text-foreground mb-1">
            {appointment.serviceName}
          </h3>
          <p class="text-sm text-muted-foreground">
            {appointment.stylistName}
          </p>
        </div>
        
        {#if !isPast}
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            Upcoming
          </span>
        {/if}
      </div>

      <!-- Date & Time -->
      <div class="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-2">
          <Calendar size={16} />
          <span>{appointment.date}</span>
        </div>
        <div class="flex items-center gap-2">
          <Clock size={16} />
          <span>{appointment.time} · {appointment.duration} min</span>
        </div>
      </div>

      <!-- Price & Actions -->
      <div class="flex items-center justify-between gap-4">
        <span class="font-semibold text-brown text-lg">
          ${appointment.price.toFixed(2)}
        </span>

        <div class="flex gap-2">
          {#if isPast}
            {#if !appointment.rating}
              <button class="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-secondary transition-colors">
                Rate & Review
              </button>
            {:else}
              <div class="flex items-center gap-1 px-3 py-2 bg-secondary/50 rounded-xl">
                <Star size={14} class="fill-amber-400 text-amber-400" />
                <span class="text-sm font-medium">{appointment.rating}</span>
              </div>
            {/if}
            <button class="px-4 py-2 text-sm font-medium bg-brown text-white rounded-xl hover:bg-brown/90 transition-colors">
              Rebook
            </button>
          {:else}
            <button class="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-secondary transition-colors">
              Reschedule
            </button>
            <button class="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:bg-secondary transition-colors">
              Cancel Appointment
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
