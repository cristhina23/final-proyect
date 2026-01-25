<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { Star, StarIcon, StarOff } from "lucide-svelte";
</script>

<Card.Root class="h-full flex flex-col ">
  <Card.Header>
    <div class="flex items-center justify-center text-primary">
       <Star size={34} class="text-primary fill-primary" />
    </div>
    <Card.Title class="text-center text-xl">Service Quality</Card.Title>
    <Card.Description class="text-center">Based on customer feedback from the last 30 days.</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col gap-4">
     
      <p class="text-center text-gray-500 font-bold"><span class="text-4xl text-primary">9.8</span> / 10</p>
      <div class="flex gap-2 mx-auto" style="color: gold;">
        <StarIcon size={24} class="fill-amber-200" />
        <StarIcon size={24} class="fill-amber-200" />
        <StarIcon size={24} class="fill-amber-200" />
        <StarIcon size={24} class="fill-amber-200" />
        <StarIcon size={24} class="fill-amber-200" />
      </div>
    </div>
  </Card.Content>
</Card.Root>
