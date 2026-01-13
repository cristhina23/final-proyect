<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Separator } from "$lib/components/ui/separator";
  import PrimaryButton from "$lib/components/ui/PrimaryButton.svelte";
  import { services } from "$lib/data/services";
  import { stylists } from "$lib/data/stylists";
  import { generateTimeSlots } from "$lib/utils/index";
  import { OPEN_HOUR, CLOSE_HOUR, STEP_MINUTES } from "$lib/data";
  import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";

  export let open = false;

  const minDate = today(getLocalTimeZone());
  const allSlots = generateTimeSlots(OPEN_HOUR, CLOSE_HOUR, STEP_MINUTES);

  let loading = false;
  let success = false;

  let form = {
    name: "",
    phone: "",
    service: "",
    stylist: "",
    date: undefined as DateValue | undefined,
    time: "",
    notes: ""
  };

  $: availableSlots = form.date ? allSlots : [];

  async function submitBooking() {
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) return;

    loading = true;
    await new Promise(r => setTimeout(r, 1000));
    loading = false;
    success = true;

    setTimeout(() => {
      success = false;
      open = false;
      form = { name: "", phone: "", service: "", stylist: "", date: undefined, time: "", notes: "" };
    }, 2000);
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--background)] p-6 shadow-lg">
    <Dialog.Header>
      <Dialog.Title class="text-center text-2xl font-serif text-[var(--foreground)]">
        Book your appointment
      </Dialog.Title>
    </Dialog.Header>

    {#if success}
      <Alert class="mt-6 border-l-4 border-green-500 bg-green-50 text-green-800">
        <AlertDescription>
          Your message has been sent. We will contact you shortly.
        </AlertDescription>
      </Alert>
    {:else}
      <div class="space-y-4 mt-6">

        <!-- NAME -->
        <input
          type="text"
          placeholder="Full Name"
          bind:value={form.name}
          disabled={loading}
          class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <!-- PHONE -->
        <input
          type="tel"
          placeholder="Phone"
          bind:value={form.phone}
          disabled={loading}
          class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <Separator />

        <!-- SERVICE -->
        <div class="relative">
          <select
            bind:value={form.service}
            disabled={loading}
            class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 bg-[var(--muted)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="" disabled selected>Select your treatment</option>
            {#each services as s}
              <option value={s.title}>{s.title}</option>
            {/each}
          </select>
        </div>

        <!-- STYLIST -->
        <div class="relative">
          <select
            bind:value={form.stylist}
            disabled={loading}
            class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 bg-[var(--muted)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <option value="" disabled selected>Select stylist</option>
            {#each stylists as st}
              <option value={st.name}>{st.name}</option>
            {/each}
          </select>
        </div>

        <Separator />

        <!-- DATE -->
        <div class="border-[var(--secondary)] rounded-xl p-2 flex justify-center bg-[var(--muted)]">
          <Calendar
            value={form.date}
            onValueChange={(v: DateValue | undefined) => form.date = v}
            minValue={minDate}
          />
        </div>

        <Separator />

        <!-- TIME -->
        <select
          bind:value={form.time}
          disabled={!form.date || loading}
          class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 bg-[var(--muted)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="" disabled selected>Select time</option>
          {#each availableSlots as slot}
            <option value={slot}>{slot}</option>
          {/each}
        </select>

        <!-- NOTES -->
        <textarea
          placeholder="Additional comments (optional)"
          bind:value={form.notes}
          disabled={loading}
          class="w-full rounded-xl border-[var(--secondary)] px-4 py-3 min-h-[80px] bg-[var(--muted)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />

        <!-- SUBMIT -->
        <PrimaryButton
          class="w-full mt-2 rounded-full"
          disabled={!form.name || !form.phone || !form.service || !form.date || !form.time || loading}
          on:click={submitBooking}
        >
          {#if loading}
            <span class="flex items-center justify-center gap-2">
              <span class="h-4 w-4 border-2 border-[var(--primary-foreground)] border-t-transparent rounded-full animate-spin"></span>
              Sending…
            </span>
          {:else}
            Schedule Appointment
          {/if}
        </PrimaryButton>

      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>

<style>
  @media (max-width: 640px) {
    .sm\:max-w-md {
      max-width: 95%;
    }
  }
</style>
