<!--
  BookingSummary component
  Persistent sidebar showing booking details and total cost.
-->
<script lang="ts">
  import { Calendar, Clock, User, Scissors } from "lucide-svelte";

  type Service = {
    name: string;
    price: number;
  } | null;

  type Stylist = {
    name: string;
    specialty: string;
    image?: string;
  } | null;

  type DateTime = {
    date: string;
    time: string;
    duration: number;
  } | null;

  const props = $props<{
    service: Service;
    stylist: Stylist;
    dateTime: DateTime;
    serviceFee: number;
    onConfirm?: () => void;
  }>();

  const { service, stylist, dateTime, serviceFee, onConfirm } = $derived(props);
  const subtotal = $derived(service?.price ?? 0);
  const total = $derived(subtotal + serviceFee);
  const canConfirm = $derived(service && stylist && dateTime);
</script>

<div class="bg-card border border-border rounded-2xl p-6 sticky top-6">
  <h2 class="text-xl font-heading font-bold text-foreground mb-6">Booking Summary</h2>

  <div class="space-y-6">
    <!-- Service -->
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Scissors size={16} />
        <span class="uppercase tracking-wide font-medium">Service</span>
      </div>
      {#if service}
        <div>
          <p class="font-semibold text-foreground">{service.name}</p>
          <p class="text-sm text-brown font-medium">${service.price.toFixed(2)}</p>
        </div>
      {:else}
        <p class="text-sm text-muted-foreground italic">No service selected</p>
      {/if}
    </div>

    <!-- Stylist -->
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <User size={16} />
        <span class="uppercase tracking-wide font-medium">Stylist</span>
      </div>
      {#if stylist}
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-secondary/30">
            {#if stylist.image}
              <img src={stylist.image} alt={stylist.name} class="w-full h-full object-cover" />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-muted-foreground">
                <User size={20} />
              </div>
            {/if}
          </div>
          <div>
            <p class="font-semibold text-foreground">{stylist.name}</p>
            <p class="text-xs text-muted-foreground">{stylist.specialty}</p>
          </div>
        </div>
      {:else}
        <p class="text-sm text-muted-foreground italic">No stylist selected</p>
      {/if}
    </div>

    <!-- Date & Time -->
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar size={16} />
        <span class="uppercase tracking-wide font-medium">Date & Time</span>
      </div>
      {#if dateTime}
        <div>
          <p class="font-semibold text-foreground">{dateTime.date}</p>
          <p class="text-sm text-muted-foreground">{dateTime.time}</p>
          <p class="text-xs text-muted-foreground mt-1">({dateTime.duration} minutes duration)</p>
        </div>
      {:else}
        <p class="text-sm text-muted-foreground italic">No date selected</p>
      {/if}
    </div>
  </div>

  <!-- Divider -->
  <div class="border-t border-border my-6"></div>

  <!-- Pricing -->
  <div class="space-y-3">
    <div class="flex justify-between text-sm">
      <span class="text-muted-foreground">Subtotal</span>
      <span class="font-medium text-foreground">${subtotal.toFixed(2)}</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-muted-foreground">Service Fee</span>
      <span class="font-medium text-foreground">${serviceFee.toFixed(2)}</span>
    </div>
    <div class="border-t border-border pt-3 flex justify-between">
      <span class="font-semibold text-foreground">Total</span>
      <span class="font-bold text-lg text-brown">${total.toFixed(2)}</span>
    </div>
  </div>

  <!-- Confirm Button -->
  <button
    onclick={onConfirm}
    disabled={!canConfirm}
    class="w-full mt-6 py-3 px-6 rounded-xl font-semibold transition-all
    {canConfirm 
      ? 'bg-brown text-white hover:bg-brown/90' 
      : 'bg-muted text-muted-foreground cursor-not-allowed'}"
  >
    Confirm Appointment
  </button>
</div>
