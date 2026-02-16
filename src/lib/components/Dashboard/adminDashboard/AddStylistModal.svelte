<script lang="ts">
  import Select from "$lib/components/ui/Select.svelte";
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
  
  async function submit() {
    const result = await onCreate({
      full_name: name,
      email,
      role: "STYLIST",
      specialty,
      years_of_experience: yearsOfExperience,
      availability
    });

    if (result) {
      open = false;
    }
  }
</script>

{#if open}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center md:justify-end z-50 ">
    <div class="bg-white relative h-full max-h-[90vh] md:max-h-full w-full max-w-md rounded-xl md:rounded-none flex flex-col shadow-2xl">
      <!-- Header -->
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold">Add New Stylist</h2>
        <button
          type="button"
          class="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg p-2 transition-colors duration-200"
          onclick={() => open = false}
        >
          <X size={24} />
        </button>
      </div>

      <!-- Scrollable Body -->
      <form class="flex-1 overflow-y-auto p-6 space-y-6" onsubmit={(e) => { e.preventDefault(); submit(); }}>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              id="name"
              bind:value={name} 
              placeholder="Stylist Name" 
              class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="email"
              type="email"
              bind:value={email} 
              placeholder="Email Address" 
              class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 outline-none transition-all"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <input 
                id="specialty"
                bind:value={specialty} 
                placeholder="e.g. Colorist"
                class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 outline-none transition-all"
              />
            </div>
            <div>
              <label for="yearsOfExperience" class="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
              <input 
                id="yearsOfExperience"
                type="number"
                bind:value={yearsOfExperience} 
                placeholder="0"
                class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-brown-500/20 focus:border-brown-500 outline-none transition-all"
              />
            </div>
          </div>        
        </div>
      </form>

      <!-- Fixed Footer -->
      <div class="p-6 border-t bg-gray-50/50 flex justify-end space-x-3">
        <button 
          type="button"
          onclick={() => open = false}
          class="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          onclick={submit}
          class="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/80 shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          Create Stylist
        </button>
      </div>
    </div>
  </div>
{/if}
