<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Select from "$lib/components/ui/select";
  import Toast from "$lib/components/ui/Toast.svelte";

  import { services } from "$lib/data/services";
  import { stylists } from "$lib/data/stylists";
  import { generateTimeSlots } from "$lib/utils/index";
  import { OPEN_HOUR, CLOSE_HOUR, STEP_MINUTES } from "$lib/data/landing";
  import PrimaryButton from "../ui/PrimaryButton.svelte";

  let {
    open = $bindable(false),
    preselectedService = "",
    preselectedStylist = ""
  } = $props();

  let success = $state(false);
  let loading = $state(false);
  let showToast = $state(false);
  let submittedData = $state<any>(null);

  let form = $state({
    name: "",
    phone: "",
    service: "",
    stylist: "",
    date: "",
    time: "",
    notes: ""
  });

  $effect(() => {
    if (open) {
      if (preselectedService) {
        form.service = preselectedService;
      }

      if (preselectedStylist) {
        form.stylist = preselectedStylist;
      }
    }
  });


  const timeSlots = generateTimeSlots(OPEN_HOUR, CLOSE_HOUR, STEP_MINUTES);


  let isFormValid = $derived(
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.service !== "" &&
    form.date !== "" &&
    form.time !== ""
  );


  const today = new Date().toISOString().split('T')[0];

  async function submitBooking() {
    if (!isFormValid) return;

    loading = true;

      
    submittedData = { ...form };

    
    await new Promise((r) => setTimeout(r, 1000));

    loading = false;
    success = true;
    showToast = true;
  }

  function closeAndReset() {
    success = false;
    open = false;
    submittedData = null;
    
    
    form.name = "";
    form.phone = "";
    form.service = "";
    form.stylist = "";
    form.date = "";
    form.time = "";
    form.notes = "";
  }

  
  function formatDate(dateString: string) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
</script>

<Toast bind:show={showToast} message="Appointment scheduled successfully! We'll contact you shortly." />

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-[560px] rounded-3xl max-h-[90vh] overflow-hidden
         border-2 border-primary/20 shadow-2xl modal-content p-0
         flex flex-col">
    
    <div class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
    
    <div class="relative px-6 pt-6">
      <div class="absolute top-0 left-0 w-20 h-20 bg-primary/10 rounded-full blur-3xl"></div>
      <Dialog.Header class="relative pb-6 border-b border-primary/10">
        <Dialog.Title class="text-3xl font-serif font-bold text-foreground">
          Book your appointment
        </Dialog.Title>
        <Dialog.Description class="text-base text-muted-foreground mt-2">
          Fill in the details and we'll contact you shortly.
        </Dialog.Description>
      </Dialog.Header>
    </div>

    <div class="relative flex-1 overflow-y-auto px-6 styled-scrollbar">
      {#if success && submittedData}
        
        <div class="py-6">
          <div class="bg-gradient-to-br from-primary/10 via-white to-secondary/10 border-2 border-primary/30 rounded-2xl p-6 shadow-lg">
            <h3 class="text-2xl font-bold text-foreground mb-6 text-center">Appointment Summary</h3>
            
            <div class="space-y-4">
              
              <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-primary/20">
                <span class="text-sm font-semibold text-muted-foreground">Name</span>
                <span class="font-medium text-foreground">{submittedData.name}</span>
              </div>

              
              <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-primary/20">
                <span class="text-sm font-semibold text-muted-foreground">Phone</span>
                <span class="font-medium text-foreground">{submittedData.phone}</span>
              </div>

              
              <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-primary/20">
                <span class="text-sm font-semibold text-muted-foreground">Service</span>
                <span class="font-medium text-foreground">{submittedData.service}</span>
              </div>

              
              {#if submittedData.stylist}
                <div class="flex justify-between items-center p-3 bg-white rounded-lg border border-primary/20">
                  <span class="text-sm font-semibold text-muted-foreground">Stylist</span>
                  <span class="font-medium text-foreground">{submittedData.stylist}</span>
                </div>
              {/if}

              
              <div class="p-3 bg-white rounded-lg border border-primary/20">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-semibold text-muted-foreground">Date</span>
                  <span class="font-medium text-foreground">{formatDate(submittedData.date)}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-semibold text-muted-foreground">Time</span>
                  <span class="font-medium text-foreground">{submittedData.time}</span>
                </div>
              </div>

              
              {#if submittedData.notes}
                <div class="p-3 bg-white rounded-lg border border-primary/20">
                  <span class="text-sm font-semibold text-muted-foreground block mb-2">Notes</span>
                  <p class="text-sm text-foreground">{submittedData.notes}</p>
                </div>
              {/if}
            </div>

              
            <div class="mt-6">
              <PrimaryButton 
                class="w-full"
                on:click={closeAndReset}
              >
                Close
              </PrimaryButton>
            </div>
          </div>
        </div>
      {:else}
        <div class="grid gap-6 py-6">
            
          <div class="space-y-2">
            <label for="name-input" class="text-sm font-semibold text-foreground flex items-center gap-1">
              Full Name
              <span class="text-primary">*</span>
            </label>
            <Input 
              id="name-input"
              placeholder="Enter your full name" 
              bind:value={form.name} 
              disabled={loading}
              required
              class="border-primary/20 focus:border-primary transition-colors"
            />
          </div>

          
          <div class="space-y-2">
            <label for="phone-input" class="text-sm font-semibold text-foreground flex items-center gap-1">
              Phone Number
              <span class="text-primary">*</span>
            </label>
            <Input 
              id="phone-input"
              placeholder="(123) 456-7890" 
              type="tel" 
              bind:value={form.phone} 
              disabled={loading}
              required
              class="border-primary/20 focus:border-primary transition-colors"
            />
          </div>

          
          <div class="space-y-2">
            <label for="service-select" class="text-sm font-semibold text-foreground flex items-center gap-1">
              Service
              <span class="text-primary">*</span>
            </label>
            <Select.Root type="single" bind:value={form.service} disabled={loading}>
              <Select.Trigger class="border-primary/20 hover:border-primary/40 transition-colors">
                {form.service || "Select a service"}
              </Select.Trigger>
              <Select.Content>
                {#each services as service}
                  <Select.Item value={service.title}>
                    <div class="flex flex-col items-start">
                      <span class="font-medium">{service.title}</span>
                      <span class="text-xs text-muted-foreground">{service.duration} · {service.price}</span>
                    </div>
                  </Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          
          <div class="space-y-2">
            <label for="stylist-select" class="text-sm font-semibold text-foreground">
              Stylist Preference
            </label>
            <Select.Root type="single" bind:value={form.stylist} disabled={loading}>
              <Select.Trigger class="border-primary/20 hover:border-primary/40 transition-colors">
                {form.stylist || "Any stylist"}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="Any stylist">
                  <span class="italic text-muted-foreground">Any stylist</span>
                </Select.Item>
                {#each stylists as stylist}
                  <Select.Item value={stylist.name}>
                    <div class="flex flex-col items-start">
                      <span class="font-medium">{stylist.name}</span>
                      <span class="text-xs text-muted-foreground">{stylist.specialty}</span>
                    </div>
                  </Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          
          <div class="space-y-2">
            <label for="date-input" class="text-sm font-semibold text-foreground flex items-center gap-1">
              Appointment Date
              <span class="text-primary">*</span>
            </label>
            <Input
              id="date-input"
              type="date"
              bind:value={form.date}
              min={today}
              disabled={loading}
              required
              class="border-primary/20 focus:border-primary transition-colors"
            />
          </div>

          
          <div class="space-y-2">
            <label for="time-select" class="text-sm font-semibold text-foreground flex items-center gap-1">
              Appointment Time
              <span class="text-primary">*</span>
            </label>
            <Select.Root 
              type="single"
              bind:value={form.time} 
              disabled={loading || !form.date}
            >
              <Select.Trigger class="border-primary/20 hover:border-primary/40 transition-colors disabled:opacity-50">
                {form.time || (form.date ? "Select a time" : "Select date first")}
              </Select.Trigger>
              <Select.Content>
                {#each timeSlots as slot}
                  <Select.Item value={slot}>
                    {slot}
                  </Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>

          
          <div class="space-y-2">
            <label for="notes-input" class="text-sm font-semibold text-foreground">
              Additional Notes
              <span class="text-xs text-muted-foreground font-normal ml-1">(Optional)</span>
            </label>
            <Textarea
              id="notes-input"
              rows={3}
              placeholder="Any special requests or preferences..."
              bind:value={form.notes}
              disabled={loading}
              class="border-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
      {/if}
    </div>

      
    {#if !success}
      <div class="sticky bottom-0 px-6 py-4 border-t border-primary/10
         bg-background/95 backdrop-blur-md">
        <PrimaryButton 
          class="w-full"
          on:click={submitBooking} 
          disabled={!isFormValid || loading}
        >
          {#if loading}
            <span class="flex items-center gap-3">
              <span class="h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending your request...
            </span>
          {:else}
            <span class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Schedule Appointment
            </span>
          {/if}
        </PrimaryButton>
      </div>
    {/if}
  </Dialog.Content>
</Dialog.Root>

<style>
  
  .styled-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .styled-scrollbar::-webkit-scrollbar-track {
    background: rgba(200, 161, 128, 0.1);
    border-radius: 10px;
  }

  .styled-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  .styled-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }

  
  .styled-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--color-primary) rgba(200, 161, 128, 0.1);
  }
</style>
