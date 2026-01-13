<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Select from "$lib/components/ui/select";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  import type { DateValue } from "@internationalized/date";

  import { services } from "$lib/data/services";
  import { stylists } from "$lib/data/stylists";

  let { open = $bindable(false) } = $props();

  let success = $state(false);
  let loading = $state(false);

  let form = $state({
    name: "",
    phone: "",
    service: "",
    stylist: "Any stylist",
    date: undefined as DateValue | undefined,
    time: "",
    notes: ""
  });

  async function submitBooking() {

    // TODO: Implement booking logic
    loading = true;

    await new Promise((r) => setTimeout(r, 1500));

    loading = false;
    success = true;

    setTimeout(() => {
      success = false;
      open = false;
    }, 2000);
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[520px] rounded-2xl max-h-[90vh] overflow-y-auto">
    <Dialog.Header>
      <Dialog.Title class="text-2xl font-serif">
        Book your appointment
      </Dialog.Title>
      <Dialog.Description>
        Fill in the details and we’ll contact you shortly.
      </Dialog.Description>
    </Dialog.Header>

    {#if success}
      <Alert class="mt-6 bg-green-50 border-green-200 flex items-start gap-3">
        <svg
          class="h-5 w-5 text-green-600 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <AlertDescription class="text-green-700">
           Your appointment was scheduled successfully.  
          We’ll contact you shortly.
        </AlertDescription>
      </Alert>
    {:else}
      <div class="grid gap-5 mt-6">
        <Input placeholder="Client name" bind:value={form.name} disabled={loading} />
        <Input placeholder="Phone number" type="tel" bind:value={form.phone} disabled={loading} />

        <Select.Root bind:value={form.service} disabled={loading}>
          <Select.Trigger>{form.service || "Select service"}</Select.Trigger>
          <Select.Content>
            {#each services as service}
              <Select.Item value={service.title}>{service.title}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>

        <Select.Root bind:value={form.stylist} disabled={loading}>
          <Select.Trigger>{form.stylist}</Select.Trigger>
          <Select.Content>
            <Select.Item value="Any stylist">Any stylist</Select.Item>
            {#each stylists as stylist}
              <Select.Item value={stylist.name}>{stylist.name}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>

        <div class="border rounded-xl p-2">
          <Calendar bind:value={form.date} />
        </div>

        <Input type="time" bind:value={form.time} disabled={loading} />

        <Textarea
          rows="3"
          placeholder="Additional comments"
          bind:value={form.notes}
          disabled={loading}
        />

        <Button class="rounded-full w-full" on:click={submitBooking} disabled={loading}>
          {#if loading}
            <span class="flex items-center gap-2">
              <span class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending…
            </span>
          {:else}
            Schedule appointment
          {/if}
        </Button>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>
