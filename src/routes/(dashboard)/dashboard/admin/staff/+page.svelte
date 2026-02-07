
<script lang="ts">
  import Header from "$lib/components/Dashboard/adminDashboard/Header.svelte";
  import StaffTable from "$lib/components/Dashboard/adminDashboard/StaffTable.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { stylists } from "$lib/data";
  import type { UserRole } from "$lib/types/role";
  import type { Employee } from "$lib/types/staff";
  

  import AddStylistModal from "$lib/components/Dashboard/adminDashboard/AddStylistModal.svelte";

  const { role } = $props<{ role: UserRole }>();
  let staff: Employee[] = [];
  let open = $state(false);

  async function loadStaff() {
    const res = await fetch("/api/stylists");
    staff = await res.json();
  }
  const handleCreateStylist = async (data: Partial<Employee>) => {
    const res = await fetch("/api/stylists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const newStylist = await res.json();

    staff = [...staff, newStylist];

    loadStaff();
  }

</script>


    
    <Header />

    <AddStylistModal bind:open onCreate={handleCreateStylist} />

    <!-- CONTENT -->
    <main class="flex-1 min-w-0 overflow-y-auto p-6">
      <div class="flex justify-end py-2">
        <Button size="sm" onclick={() => open = true}>Add New Stylist</Button>
      </div>

      <StaffTable staff={stylists} />

      

    </main>


 





