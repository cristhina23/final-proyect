<script lang="ts">
  import LifeFeedCard from "./LifeFeedCard.svelte";
  import { Clock, CreditCard, ArrowRight } from "lucide-svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button";

  // Mock Data
  const activities = [
    {
      name: "Sophia Chen",
      avatar: "https://i.pravatar.cc/150?u=sophia", // Using pravatar for demo
      timeAgo: "2M AGO",
      action: "Booked",
      target: "HydraFacial Plus",
      detailText: "Today at 14:30",
      DetailIcon: Clock,
      statusText: "",
      statusType: "default" as const
    },
    {
      name: "Marcus James",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      timeAgo: "15M AGO",
      action: "Payment of $125.00 received",
      target: "",
      detailText: "Visa Ending 4421",
      DetailIcon: CreditCard,
      statusText: "",
      statusType: "default" as const
    },
    {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=elena",
      timeAgo: "1H AGO",
      action: "Rescheduled",
      target: "Balayage Session",
      detailText: "",
      DetailIcon: null,
      statusText: "Requires Approval",
      statusType: "warning" as const
    },
    {
      name: "David Smith",
      avatar: "https://i.pravatar.cc/150?u=david",
      timeAgo: "2H AGO",
      action: "New registration completed",
      target: "",
      detailText: "",
      DetailIcon: null,
      statusText: "Verified User",
      statusType: "success" as const
    }
  ];
</script>

<Card.Root class="h-full flex flex-col justify-center">
  <Card.Header class="pb-2">
    <div class="flex items-center justify-between">
      <Card.Title class="text-xl">Live Feed</Card.Title>
      <span class="relative flex h-2.5 w-2.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
    </div>
  </Card.Header>
  <Card.Content class="flex-1 overflow-auto p-4 pt-0">
    <div class="flex flex-col gap-1">
      {#each activities as activity}
        <LifeFeedCard {...activity} />
      {/each}
    </div>
  </Card.Content>
  <Card.Footer class="pt-2 border-t border-border/50">
      <Button variant="ghost" class="w-full text-primary hover:text-primary/80 hover:bg-transparent font-medium group">
        View All Activity 
        <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
  </Card.Footer>
</Card.Root>
