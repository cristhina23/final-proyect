<!--
  Book Appointment Page
  Multi-step booking flow for scheduling salon appointments.
-->
<script lang="ts">
  import StepIndicator from "$lib/components/Dashboard/userDashboard/Booking/StepIndicator.svelte";
  import ServiceCategoryCard from "$lib/components/Dashboard/userDashboard/Booking/ServiceCategoryCard.svelte";
  import StylistCard from "$lib/components/Dashboard/userDashboard/Booking/StylistCard.svelte";
  import DateTimePicker from "$lib/components/Dashboard/userDashboard/Booking/DateTimePicker.svelte";
  import BookingSummary from "$lib/components/Dashboard/userDashboard/Booking/BookingSummary.svelte";

  import { Scissors, Palette, Sparkles, User as UserIcon, CheckCircle, Calendar, Clock, MapPin } from "lucide-svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  
  // Use derived for all data items from data prop
  const allServices = $derived(data.services);
  const allStylists = $derived(data.stylists);
  const categories = $derived(data.categories);

  // State management
  let currentStep = $state(1);
  let selectedCategory = $state<string | null>(null);
  let selectedService = $state<{ name: string; price: number; category: string; duration: string; id: number } | null>(null);
  let selectedStylist = $state<{ name: string; specialty: string; image?: string; experience: number; id: string } | null>(null);
  let selectedDate = $state<Date | undefined>(undefined);
  let selectedTime = $state<string | null>(null);
  let isConfirmed = $state(false);
  let confirmedAppointment = $state<any>(null);
  let isSubmitting = $state(false);

  // Group services by category
  const serviceCategories = $derived(categories.map(cat => {
    let icon = Scissors;
    if (cat.slug === 'hair') icon = Scissors;
    if (cat.slug === 'color') icon = Palette;
    if (cat.slug === 'beauty' || cat.slug === 'facial' || cat.slug === 'nails') icon = Sparkles;

    return {
      id: cat.id.toString(),
      title: cat.name,
      description: cat.slug === 'hair' ? 'Cuts, styling & treatments' : 
                   cat.slug === 'color' ? 'Highlights & coloring' : 
                   'Beauty & wellness services',
      icon,
      services: allServices.filter(s => s.category_id === cat.id)
    };
  }));

  // Use real stylists data with calculated ratings
  const allStylistsWithRatings = $derived(allStylists.map((stylist, index) => ({
    ...stylist,
    rating: 4.5 + ((stylist.years_of_experience ?? 0) / 30), // Calculate rating based on experience
    reviewCount: Math.floor((stylist.years_of_experience ?? 0) * 8),
    isRecommended: index === 0 // First stylist is recommended
  })));

  const steps = ['SERVICE', 'STYLIST', 'SCHEDULE'];

  // Handlers
  function selectServiceCategory(categoryId: string) {
    selectedCategory = categoryId;
    // Don't auto-advance - let user select individual service
  }

  function selectIndividualService(service: any, categoryTitle: string) {
    selectedService = {
      id: service.id,
      name: service.name,
      price: typeof service.price === 'string' ? parseFloat(service.price) : service.price,
      category: categoryTitle,
      duration: service.duration_minutes.toString()
    };
    currentStep = 2;
  }

  function backToCategories() {
    selectedCategory = null;
    selectedService = null;
  }

  function selectStylist(stylist: typeof allStylistsWithRatings[0]) {
    selectedStylist = {
      id: stylist.id,
      name: stylist.full_name ?? "Unknown",
      specialty: stylist.specialty ?? "Generalist",
      image: stylist.photo_url ?? undefined,
      experience: stylist.years_of_experience ?? 0
    };
    currentStep = 3;
  }

  function handleDateSelect(date: Date | undefined) {
    selectedDate = date;
  }

  function handleTimeSelect(time: string) {
    selectedTime = time;
  }

  async function confirmAppointment() {
    if (selectedService && selectedStylist && selectedDate && selectedTime) {
      isSubmitting = true;
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: selectedService.id,
            stylist_id: selectedStylist.id,
            date: dateStr,
            time: selectedTime
          })
        });

        if (response.ok) {
          const result = await response.json();
          confirmedAppointment = result.appointment;
          isConfirmed = true;
          // Scroll to top
          window.scrollTo(0, 0);
        } else {
          const error = await response.json();
          alert(`Error: ${error.error || 'Failed to book appointment'}`);
        }
      } catch (err) {
        console.error('Error booking appointment:', err);
        alert('An unexpected error occurred. Please try again.');
      } finally {
        isSubmitting = false;
      }
    }
  }

  // Computed values for summary
  const dateTimeForSummary = $derived(
    selectedDate && selectedTime
      ? {
          date: selectedDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          time: selectedTime,
          duration: selectedService ? parseInt(selectedService.duration) : 60
        }
      : null
  );

  // Show all stylists regardless of selected service (as requested)
  const filteredStylists = $derived(allStylistsWithRatings);

  $effect(() => {
    console.log('allStylists:', allStylists);
    console.log('selectedService:', selectedService);
    console.log('filteredStylists:', filteredStylists);
  });
</script>

<svelte:head>
  <title>Book Appointment | BeautySalon</title>
  <meta name="description" content="Book your appointment at BeautySalon. Choose your service, stylist, and preferred time." />
</svelte:head>

<div class="min-h-screen bg-background p-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-foreground mb-2">Book an Appointment</h1>
      <p class="text-muted-foreground">Reserve your spot at Beauty Care in a few simple steps.</p>
    </div>

    <!-- Step Indicator -->
    <StepIndicator {currentStep} {steps} />

    <!-- Main Content -->
    {#if !isConfirmed}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Booking Steps -->
        <div class="lg:col-span-2">
          <!-- Step 1: Select Service -->
          {#if currentStep === 1}
            <div>
              {#if !selectedCategory}
                <!-- Show Categories -->
                <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Select Service Category</h2>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {#each serviceCategories as category}
                    <ServiceCategoryCard
                      title={category.title}
                      description={category.description}
                      icon={category.icon}
                      isSelected={false}
                      onclick={() => selectServiceCategory(category.id)}
                    />
                  {/each}
                </div>
              {:else}
                <!-- Show Services in Selected Category -->
                {@const category = serviceCategories.find(c => c.id === selectedCategory)}
                {#if category}
                  <div class="mb-4">
                    <button
                      onclick={backToCategories}
                      class="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4"
                    >
                      ← Back to Categories
                    </button>
                    <h2 class="text-xl font-heading font-bold text-foreground mb-2">• Select {category.title}</h2>
                    <p class="text-muted-foreground mb-6">Choose a specific service from this category</p>
                  </div>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {#each category.services as service}
                      <button
                        onclick={() => selectIndividualService(service, category.title)}
                        class="p-6 bg-card border-2 border-border rounded-lg hover:border-primary hover:shadow-lg transition-all text-left group"
                      >
                        <h3 class="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p class="text-sm text-muted-foreground mb-4">
                          {service.description || 'Professional service'}
                        </p>
                        <div class="flex items-center justify-between">
                          <span class="text-sm font-medium text-foreground">
                            {service.duration_minutes} min
                          </span>
                          <span class="text-lg font-bold text-primary">
                            ${Number(service.price).toFixed(2)}
                          </span>
                        </div>
                      </button>
                    {/each}
                  </div>
                {/if}
              {/if}
            </div>
          {/if}

          <!-- Step 2: Choose Stylist -->
          {#if currentStep === 2}
            <div>
              <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Choose Stylist</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each filteredStylists as stylist}
                  <StylistCard
                    name={stylist.full_name ?? "Unknown"}
                    image={stylist.photo_url ?? undefined}
                    specialty={stylist.specialty ?? "Generalist"}
                    experience={stylist.years_of_experience ?? 0}
                    rating={stylist.rating}
                    reviewCount={stylist.reviewCount}
                    isSelected={selectedStylist?.name === (stylist.full_name ?? "Unknown")}
                    isRecommended={stylist.isRecommended}
                    onclick={() => selectStylist(stylist)}
                  />
                {/each}
              </div>
            </div>
          {/if}

          <!-- Step 3: Select Date & Time -->
          {#if currentStep === 3}
            <div>
              <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Select Date and Time</h2>
              <DateTimePicker
                {selectedDate}
                {selectedTime}
                stylistId={data.stylists.find(s => s.full_name === selectedStylist?.name)?.id}
                duration={selectedService ? parseInt(selectedService.duration) : 60}
                onDateSelect={handleDateSelect}
                onTimeSelect={handleTimeSelect}
              />
            </div>
          {/if}
        </div>

        <!-- Right: Booking Summary -->
        <div class="lg:col-span-1">
          <BookingSummary
            service={selectedService}
            stylist={selectedStylist}
            dateTime={dateTimeForSummary}
            serviceFee={4.50}
            onConfirm={confirmAppointment}
          />
        </div>
      </div>
    {:else}
      <!-- Confirmation Screen -->
      <div class="max-w-3xl mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden">
        <div class="bg-primary/10 p-8 text-center border-b border-border">
          <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle size={32} />
          </div>
          <h2 class="text-3xl font-heading font-bold text-foreground mb-2">Appointment Confirmed!</h2>
          <p class="text-muted-foreground">Your appointment has been successfully scheduled.</p>
        </div>

        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Appointment Details -->
            <div>
              <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">Appointment Details</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                    <Scissors size={20} />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold tracking-wider">Service</p>
                    <p class="font-medium text-foreground text-lg">{confirmedAppointment?.service?.name}</p>
                    <p class="text-sm text-muted-foreground">{confirmedAppointment?.service?.duration} minutes</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                    <UserIcon size={20} />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold tracking-wider">Stylist</p>
                    <p class="font-medium text-foreground text-lg">{selectedStylist?.name}</p>
                    <p class="text-sm text-muted-foreground">{selectedStylist?.specialty}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Date & Time -->
            <div>
              <h3 class="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">Date & Time</h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold tracking-wider">Date</p>
                    <p class="font-medium text-foreground text-lg">
                      {new Date(confirmedAppointment?.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="p-2 bg-primary/10 rounded-lg text-primary mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold tracking-wider">Time</p>
                    <p class="font-medium text-foreground text-lg">
                      {new Date(confirmedAppointment?.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(confirmedAppointment?.end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Price -->
          <div class="bg-gray-50 p-4 rounded-lg flex items-center justify-between mb-8 border border-border/50">
            <span class="font-bold text-foreground">Total Price</span>
            <span class="text-2xl font-bold text-primary">
              ${parseFloat(confirmedAppointment?.service?.price).toFixed(2)}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard/user" class="px-6 py-3 border border-border rounded-lg text-foreground font-medium hover:bg-gray-50 transition-colors text-center">
              Go to Dashboard
            </a>
            <button 
              onclick={() => window.location.reload()} 
              class="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-md"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

