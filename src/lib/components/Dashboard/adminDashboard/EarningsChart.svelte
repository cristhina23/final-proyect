<script lang="ts">
  import { scaleBand } from "d3-scale";
  import { BarChart, type ChartContextValue } from "layerchart";
  import TrendingUpIcon from "@lucide/svelte/icons/trending-up";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { cubicInOut } from "svelte/easing";

  const chartData = [
  { day: "Mon", revenue: 820 },
  { day: "Tue", revenue: 680 },
  { day: "Wed", revenue: 350 },
  { day: "Thu", revenue: 220 },
  { day: "Fri", revenue: 940 },
  { day: "Sat", revenue: 810 },
  { day: "Sun", revenue: 660 },
];


  const chartConfig = {
    desktop: { label: "Revenue", color: "var(--brown)" },
  } satisfies Chart.ChartConfig;

  let context = $state<ChartContextValue>();
</script>

<Card.Root class="h-full flex flex-col">
  <Card.Header>
    <Card.Title>Earnings</Card.Title>
    <Card.Description>Weekly Revenue Overview</Card.Description>
  </Card.Header>
  <Card.Content class="flex-1 min-h-0 pb-4">
    <Chart.Container config={chartConfig} class="h-full w-full">
      <BarChart
        bind:context
        data={chartData}
        xScale={scaleBand().padding(0.25)}
        x="day"
        axis="x"
        series={[{ key: "revenue", label: "Revenue", color: chartConfig.desktop.color }]}
        props={{
          bars: {
            stroke: "none",
            rounded: "all",
            radius: 8,
            // use the height of the chart to animate the bars
            initialY: context?.height,
            initialHeight: 0,
            motion: {
              x: { type: "tween", duration: 500, easing: cubicInOut },
              width: { type: "tween", duration: 500, easing: cubicInOut },
              height: { type: "tween", duration: 500, easing: cubicInOut },
              y: { type: "tween", duration: 500, easing: cubicInOut },
            },
          },
          highlight: { area: { fill: "none" } },
          xAxis: { format: (d) => d.slice(0, 3) },
        }}
      >
        {#snippet tooltip()}
          <Chart.Tooltip hideLabel />
        {/snippet}
      </BarChart>
    </Chart.Container>
  </Card.Content>
  <Card.Footer>
    <div class="flex w-full items-start gap-2 text-sm">
      <div class="grid gap-2">
        <div class="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUpIcon class="size-4" />
        </div>
        <div class="text-muted-foreground flex items-center gap-2 leading-none">
          Showing total visitors for the last 6 months
        </div>
      </div>
    </div>
  </Card.Footer>
</Card.Root>
