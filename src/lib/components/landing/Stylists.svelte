
<!--
  Stylists section showcasing the team and enabling quick bookings.
  Users can view stylist details (mobile modal) or book directly with a preselected stylist.
  Responsive cards with desktop hover overlays provide extra info and a direct book action.
-->
<script lang="ts">
  import { services as defaultServices } from "$lib/data/services";
  import type { Service } from '$lib/types/services';
  import type { Employee } from '$lib/types/staff';

  interface Props {
    stylists?: Employee[];
    services?: Service[];
  }

  let { 
    stylists = [], 
    services = defaultServices as Service[] 
  } = $props<Props>();

  import { getStylistImage } from "$lib/utils/imageResolver";
  import PrimaryButton from "../ui/PrimaryButton.svelte";
  import BookingModal from "./BookingModal.svelte";

  // Manages selected stylist, booking modal visibility, and prefilled stylist name
  let selectedStylist = $state<Employee | null>(null);
  let openBooking = $state(false);
  let preselectedStylistName = $state("");

  // Data is provided via page `load` and passed as prop.

  const openInfoModal = (stylist: Employee) => {
    selectedStylist = stylist;
  };

  const closeInfoModal = () => {
    selectedStylist = null;
  };

  const openBookingWithStylist = (stylist: Employee) => {
    preselectedStylistName = stylist.name;
    openBooking = true;
  };
</script>

<section
  id="stylists"
  class="relative py-28 overflow-hidden bg-[#F6F2ED]"
>
  <!-- background blobs -->
  <div class="absolute -top-40 -left-40 w-105 h-105 bg-[#D9B79A]/40 rounded-full blur-[140px]"></div>
  <div class="absolute top-1/3 -right-40 w-95 h-95 bg-[#C8A180]/40 rounded-full blur-[130px]"></div>
  <div class="absolute bottom-0 left-1/3 w-105 h-105 bg-[#EFE1D1]/60 rounded-full blur-[160px]"></div>

  <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-20">
      <span class="inline-block mb-4 px-4 py-1.5 text-xs tracking-widest uppercase font-semibold rounded-full bg-[#936C4B]/10 text-[#936C4B]">
        Our Professional Team
      </span>
      <h2 class="text-4xl sm:text-5xl font-serif font-bold text-[#2E1F14]">
        Meet Our Experts
      </h2>
      <p class="mt-6 text-lg text-[#6B5A4A] max-w-2xl mx-auto">
        A curated team of elite stylists combining technique, creativity, and passion.
      </p>
    </div>

    <!-- Grid of stylist cards; desktop shows hover overlay, mobile uses modal -->
    <div class="grid grid-cols-2 gap-16 lg:grid-cols-4">
      {#each stylists as stylist}
        <div class="group">
          <div class="relative aspect-3/4 rounded-[2.5rem] overflow-hidden shadow-xl transition-transform duration-700 group-hover:-translate-y-2">
            <div class="hidden md:block absolute top-5 left-5 z-10">
              <span class="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#936C4B]/90 text-white">
                {stylist.experience}+ yrs
              </span>
            </div>

            <img
              src={getStylistImage(stylist.image)}
              alt={stylist.name}
              class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            <!-- desktop overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#2E1F14]/90 via-[#6B4A2F]/70 to-transparent hidden lg:flex flex-col justify-end p-8">
              <p class="text-xs uppercase tracking-widest text-[#EAD9C8] mb-2">
                {stylist.specialty}
              </p>
              <p class="text-white text-sm leading-relaxed mb-6 line-clamp-3">
                {stylist.bio}
              </p>
              <PrimaryButton
                class="w-full text-sm"
                onclick={() => openBookingWithStylist(stylist)}
              >
                Book with {stylist.name?.split(" ")[0] ?? 'Stylist'}
              </PrimaryButton>
            </div>
          </div>

          <div class="mt-8 text-center">
            <h3 class="text-2xl font-serif font-bold text-[#2E1F14]">
              {stylist.name}
            </h3>
            <p class="mt-1 text-xs uppercase tracking-widest font-semibold text-[#936C4B]">
              {stylist.specialty}
            </p>

            <!-- mobile -->
            <button
              class="mt-4 text-sm font-semibold text-[#936C4B] underline underline-offset-4 lg:hidden"
              onclick={() => openInfoModal(stylist)}
            >
              View info
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Mobile info modal -->
  <!-- Mobile info modal for stylist details and booking action -->
  {#if selectedStylist && !openBooking}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div class="bg-[#F6F2ED] rounded-[2.5rem] max-w-md w-full p-6 relative shadow-2xl">
        <button
          aria-label="Close"
          class="absolute top-4 right-5 text-[#6B5A4A] hover:text-[#2E1F14]"
          onclick={closeInfoModal}
        >
          ✕
        </button>

        <img
          src={getStylistImage(selectedStylist.image)}
          alt={selectedStylist.name}
          class="w-full h-72 object-cover object-top rounded-2xl mb-6"
        />

        <h3 class="text-2xl font-serif font-bold text-[#2E1F14]">
          {selectedStylist.name}
        </h3>

        <p class="mt-1 text-xs uppercase tracking-widest font-semibold text-[#936C4B]">
          {selectedStylist.specialty} · {selectedStylist.experience}+ yrs
        </p>

        <p class="mt-5 text-sm text-[#6B5A4A] leading-relaxed">
          {selectedStylist.bio}
        </p>

        <div class="mt-8">
          <PrimaryButton
            class="w-full"
            onclick={() => {
              if (selectedStylist) {
                preselectedStylistName = selectedStylist.name;
                openBooking = true;
                closeInfoModal();
              }
            }}
          >
            Book Appointment
          </PrimaryButton>
        </div>
      </div>
    </div>
  {/if}
</section>

<BookingModal
  bind:open={openBooking}
  preselectedStylist={preselectedStylistName}
  {services}
  {stylists}
/>
