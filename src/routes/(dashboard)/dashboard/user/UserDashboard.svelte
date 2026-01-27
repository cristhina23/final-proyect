<!--
  UserDashboard component
  Main dashboard view for regular users showing appointments, loyalty points, activity, and promotions.
-->
<script lang="ts">
  import type { UserRole } from "$lib/types/role";
  import NextAppointmentCard from "$lib/components/Dashboard/userDashboard/NextAppointmentCard.svelte";
  import LoyaltyPointsCard from "$lib/components/Dashboard/userDashboard/LoyaltyPointsCard.svelte";
  import RecentActivityCard from "$lib/components/Dashboard/userDashboard/RecentActivityCard.svelte";
  import PromotionCard from "$lib/components/Dashboard/userDashboard/PromotionCard.svelte";

  let { role } = $props<{ role: UserRole }>();

  // Mock data
  const mockActivities = [
    { title: "Paid invoice #8291", date: "Yesterday, 4:12 PM", type: "payment" as const },
    { title: "Left a review for Elena", date: "Oct 10, 11:30 AM", type: "review" as const },
    { title: "Booked Balayage treatment", date: "Oct 10, 10:15 AM", type: "booking" as const }
  ];

  const mockPromotions = [
    {
      title: "38k Hydration Therapy",
      description: "Revitalize your hair with our signature deep conditioning.",
      badgeText: "30% OFF",
      badgeVariant: "new" as const,
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80"
    },
    {
      title: "Autumn Balayage Special",
      description: "Expertly blended tones for a natural sun-kissed look.",
      badgeText: "NEW",
      badgeVariant: "new" as const,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
    },
    {
      title: "Scalp Detox Ritual",
      description: "The ultimate refresh for a healthy, glowing scalp.",
      badgeText: "MEMBERS ONLY",
      badgeVariant: "members" as const,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
    }
  ];
</script>

<div class="flex-1 flex flex-col min-w-0 bg-background">
  <main class="flex-1 min-w-0 p-6 overflow-y-auto">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-foreground">Welcome back, User!</h1>
      <p class="text-muted-foreground mt-1">Ready for your next transformation?</p>
    </div>

    <!-- Top Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <NextAppointmentCard 
        date="October 24, 2023"
        time="02:30 PM"
        stylistName="Elena Rodriguez"
      />
      
      <LoyaltyPointsCard 
        points={1250}
        nextRewardPoints={1500}
      />
      
      <RecentActivityCard activities={mockActivities} />
    </div>

    <!-- Promotions Section -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-heading font-bold text-foreground">Promotions for You</h2>
        <a href="/promotions" class="text-brown hover:text-brown/80 text-sm font-medium transition-colors">
          View all deals →
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each mockPromotions as promo}
          <PromotionCard 
            title={promo.title}
            description={promo.description}
            badgeText={promo.badgeText}
            badgeVariant={promo.badgeVariant}
            image={promo.image}
          />
        {/each}
      </div>
    </section>
  </main>
</div>

