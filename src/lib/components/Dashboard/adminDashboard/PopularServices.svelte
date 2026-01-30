<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";

  const services = [
    { name: "Blow Dry & Finish", percentage: 41 },
    { name: "Color & Highlights", percentage: 24 },
    { name: "Manicure & Pedicure", percentage: 16 },
  ];
</script>

<Card.Root class="h-full flex flex-col">
  <Card.Header>
    <Card.Title>Popular Services</Card.Title>
    <Card.Description>Most Popular Services</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col gap-4">
      {#each services as service}
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span>{service.name}</span>
          </div>
          <span>{service.percentage}%</span>
      </div>
      <div>
        <Progress value={service.percentage} class="h-2" />
      </div>
        </div>
      {/each}  
    </div>
  </Card.Content>
</Card.Root>