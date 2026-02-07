<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import type { Employee } from "$lib/types/staff";
  import { X } from "lucide-svelte";

  let { open = $bindable(true), onCreate } = $props<{ 
    open: boolean, 
    onCreate: (data: Partial<Employee>) => void 
  }>();

  const daysOfWeek = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  let name = $state("");
  let email = $state("");
  let specialty = $state("");
  let yearsOfExperience = $state("");

  let availability = $state([
    { dayFrom: "", dayTo: "", timeFrom: "", timeTo: "" }
  ]);

  function addAvailability() {
    availability = [...availability, { dayFrom: "", dayTo: "", timeFrom: "", timeTo: "" }];
  }

  function removeAvailability(index: number) {
    availability = availability.filter((_, i) => i !== index);
  }
  
  function submit() {
    onCreate({
      name,
      email,
      role: "STYLIST",
      specialty,
      yearsOfExperience,
      availability
    });

    open = false;
  }
</script>

{#if open}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-end  z-50">
    <div class="bg-white relative h-full p-8 w-full max-w-md">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold mb-6">Add New Stylist</h2>
        <button
          type="button"
          class="absolute top-4 right-4 text-sm text-foreground cursor-pointer hover:text-red-400 hover:bg-red-500/10 rounded-lg p-2 transition-colors duration-200"
          onclick={() => open = false}
        >
          <X />
        </button>
      </div>
      <form class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            id="name"
            bind:value={name} 
            placeholder="Stylist Name" 
            class="w-full border rounded p-2"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            id="email"
            bind:value={email} 
            placeholder="Email Address" 
            class="w-full border rounded p-2"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="">
              Specialty
            </label>
            <input 
              id="specialty"
              bind:value={specialty} 
              placeholder="Specialty"
              class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label for="">
              Years of Experience
            </label>
            <input 
              id="yearsOfExperience"
              bind:value={yearsOfExperience} 
              placeholder="Years of Experience"
              class="w-full border rounded p-2"
            />
          </div>
        </div>

       
        <h3 class="font-semibold">Availability</h3>




        
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            onclick={() => open = false}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onclick={submit}
            class="px-4 py-2 bg-brown-600 text-white rounded hover:bg-brown-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
