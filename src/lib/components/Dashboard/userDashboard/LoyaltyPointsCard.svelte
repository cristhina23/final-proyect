<!--
  LoyaltyPointsCard component
  Displays user's loyalty points with progress bar to next reward.
-->
<script lang="ts">
  import { Award } from "lucide-svelte";

  const props = $props<{
    points: number;
    nextRewardPoints: number;
  }>();

  const { points, nextRewardPoints } = $derived(props);
  const progress = $derived((points / nextRewardPoints) * 100);
  const pointsUntilReward = $derived(nextRewardPoints - points);
</script>

<div class="rounded-xl bg-card border border-border shadow-md p-6 transition hover:shadow-lg">
  <div class="flex items-center gap-2 text-muted-foreground mb-4">
    <Award size={18} />
    <h3 class="text-sm font-medium uppercase tracking-wide">Loyalty Points</h3>
  </div>

  <div class="space-y-4">
    <!-- Points Display -->
    <div>
      <p class="font-heading text-4xl font-bold text-foreground">
        {points.toLocaleString()}
      </p>
      <p class="text-sm text-muted-foreground mt-1">pts</p>
    </div>

    <!-- Progress Bar -->
    <div class="space-y-2">
      <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          class="bg-brown h-full transition-all duration-500 ease-out rounded-full"
          style="width: {progress}%"
        ></div>
      </div>
      <p class="text-xs text-muted-foreground">
        {pointsUntilReward} points until your next free treatment!
      </p>
    </div>
  </div>
</div>
