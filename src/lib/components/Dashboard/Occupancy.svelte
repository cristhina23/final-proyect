<script lang="ts">
  const props = $props<{ collapsed: boolean; occupancy: number }>();
  const collapsed: boolean = props.collapsed;
  const occupancy: number = props.occupancy;
</script>

<div
        class="border border-secondary/80 rounded-lg bg-secondary/30 p-3 transition-all duration-300"
        style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};"
      >
        <p class="text-muted-foreground text-sm">Current Occupancy</p>

        <div class="flex items-center justify-between">
          <p class="font-heading text-2xl font-semibold">{occupancy}%</p>
          <p class="text-emerald-500 text-sm">+5% Today</p>
        </div>

        <div class="w-full h-1.25 bg-secondary/50 rounded-xl mt-2">
          <span
            class="h-full block bg-emerald-500 rounded-xl transition-all duration-500"
            style="width: {occupancy}%"
          ></span>
        </div>
      </div>