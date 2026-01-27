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
  import { Scissors, Palette, Sparkles, User as UserIcon } from "lucide-svelte";
  import { services as allServices } from "$lib/data/services";
  import { stylists as allStylists } from "$lib/data/stylists";

  // State management
  let currentStep = $state(1);
  let selectedService = $state<{ name: string; price: number; category: string; duration: string } | null>(null);
  let selectedStylist = $state<{ name: string; specialty: string; image?: string; experience: number } | null>(null);
  let selectedDate = $state<Date | undefined>(undefined);
  let selectedTime = $state<string | null>(null);

  // Group services by category
  const serviceCategories = [
    {
      id: 'hair',
      title: 'Hair',
      description: 'Cuts, styling & treatments',
      icon: Scissors,
      services: allServices.filter(s => 
        s.title.includes('Haircut') || s.title.includes('Blow Dry') || s.title.includes('Treatment')
      )
    },
    {
      id: 'color',
      title: 'Color',
      description: 'Highlights & coloring',
      icon: Palette,
      services: allServices.filter(s => s.title.includes('Color') || s.title.includes('Highlights'))
    },
    {
      id: 'beauty',
      title: 'Beauty',
      description: 'Nails, makeup & skincare',
      icon: Sparkles,
      services: allServices.filter(s => 
        s.title.includes('Manicure') || s.title.includes('Facial') || s.title.includes('Makeup') || s.title.includes('Eyebrow')
      )
    }
  ];

  // Use real stylists data with calculated ratings
  const allStylistsWithRatings = allStylists.map((stylist, index) => ({
    ...stylist,
    rating: 4.5 + (stylist.experience / 30), // Calculate rating based on experience
    reviewCount: Math.floor(stylist.experience * 8),
    isRecommended: index === 0 // First stylist is recommended
  }));

  // Filter stylists based on selected service category
  const filteredStylists = $derived(
    selectedService
      ? allStylistsWithRatings.filter(stylist => 
          stylist.services?.includes(selectedService?.category ?? '')
        )
      : allStylistsWithRatings
  );

  const steps = ['SERVICE', 'STYLIST', 'SCHEDULE'];

  // Handlers
  function selectServiceCategory(categoryId: string) {
    const category = serviceCategories.find(c => c.id === categoryId);
    if (category && category.services.length > 0) {
      const service = category.services[0];
      selectedService = {
        name: service.title,
        price: parseInt(service.price.replace(/[^0-9]/g, '')),
        category: category.title,
        duration: service.duration
      };
      currentStep = 2;
    }
  }

  function selectStylist(stylist: typeof allStylistsWithRatings[0]) {
    selectedStylist = {
      name: stylist.name,
      specialty: stylist.specialty,
      image: stylist.image,
      experience: stylist.experience
    };
    currentStep = 3;
  }

  function handleDateSelect(date: Date | undefined) {
    selectedDate = date;
  }

  function handleTimeSelect(time: string) {
    selectedTime = time;
  }

  function confirmAppointment() {
    if (selectedService && selectedStylist && selectedDate && selectedTime) {
      alert('Appointment confirmed! (This would navigate to confirmation page)');
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
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Booking Steps -->
      <div class="lg:col-span-2">
        <!-- Step 1: Select Service -->
        {#if currentStep === 1}
          <div>
            <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Select Service Category</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {#each serviceCategories as category}
                <ServiceCategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  isSelected={selectedService?.category === category.title}
                  onclick={() => selectServiceCategory(category.id)}
                />
              {/each}
            </div>
          </div>
        {/if}

        <!-- Step 2: Choose Stylist -->
        {#if currentStep === 2}
          <div>
            <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Choose Stylist</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {#each filteredStylists as stylist}
                <StylistCard
                  name={stylist.name}
                  image={stylist.image}
                  specialty={stylist.specialty}
                  experience={stylist.experience}
                  rating={stylist.rating}
                  reviewCount={stylist.reviewCount}
                  isSelected={selectedStylist?.name === stylist.name}
                  isRecommended={stylist.isRecommended}
                  onclick={() => selectStylist(stylist)}
                />
              {/each}
            </div>
          </div>
        {/if}

        <!-- Step 3: Select Date and Time -->
        {#if currentStep === 3}
          <div>
            <h2 class="text-xl font-heading font-bold text-foreground mb-6">• Select Date and Time</h2>
            <DateTimePicker
              {selectedDate}
              {selectedTime}
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
  </div>
</div>
