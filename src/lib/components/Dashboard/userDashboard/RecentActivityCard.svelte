<!--
  RecentActivityCard component
  Displays a list of recent user activities.
-->
<script lang="ts">
  import { Activity, CheckCircle, Star, FileText } from "lucide-svelte";

  type ActivityType = "payment" | "review" | "booking";

  type ActivityItem = {
    title: string;
    date: string;
    type: ActivityType;
  };

  const props = $props<{
    activities: ActivityItem[];
  }>();

  const { activities } = $derived(props);

  function getIcon(type: ActivityType) {
    switch (type) {
      case "payment":
        return CheckCircle;
      case "review":
        return Star;
      case "booking":
        return FileText;
      default:
        return Activity;
    }
  }

  function getIconColor(type: ActivityType) {
    switch (type) {
      case "payment":
        return "text-emerald-600";
      case "review":
        return "text-blue-600";
      case "booking":
        return "text-brown";
      default:
        return "text-muted-foreground";
    }
  }
</script>

<div class="rounded-xl bg-card border border-border shadow-md p-6 transition hover:shadow-lg">
  <div class="flex items-center gap-2 text-muted-foreground mb-4">
    <Activity size={18} />
    <h3 class="text-sm font-medium uppercase tracking-wide">Recent Activity</h3>
  </div>

  <div class="space-y-3">
    {#each activities as activity}
      {@const Icon = getIcon(activity.type)}
      <div class="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
        <div class="mt-0.5 {getIconColor(activity.type)}">
          <Icon size={16} />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-foreground font-medium">{activity.title}</p>
          <p class="text-xs text-muted-foreground mt-0.5">{activity.date}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
