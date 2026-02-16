<script lang="ts">
  import { onMount } from "svelte";
  import Header from "$lib/components/Dashboard/adminDashboard/Header.svelte";
  import StaffTable from "$lib/components/Dashboard/adminDashboard/StaffTable.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import AddStylistModal from "$lib/components/Dashboard/adminDashboard/AddStylistModal.svelte";
  import type { UserRole } from "$lib/types/role";
  import type { Employee } from "$lib/types/staff";
  
  const { role } = $props<{ role: UserRole }>();
  let staff: Employee[] = $state([]);
  let open = $state(false);

  async function loadStaff() {
    try {
      const res = await fetch("/api/stylists");
      if (res.ok) {
        staff = await res.json();
      }
    } catch (error) {
      console.error("Error loading staff:", error);
    }
  }

  onMount(() => {
    loadStaff();
  });

  const handleCreateStylist = async (data: Partial<Employee>) => {
    try {
      const res = await fetch("/api/stylists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || "Error al crear el estilista");
        return;
      }

      const newStylist = await res.json();
      // Optimization: we could just add it, but loadStaff ensures full data consistency
      await loadStaff();
      return newStylist;
    } catch (error) {
      console.error("Error creating stylist:", error);
      alert("Error de conexión al crear el estilista");
    }
  }

</script>

    
    <Header />

    <AddStylistModal bind:open onCreate={handleCreateStylist} />

    <!-- CONTENT -->
    <main class="flex-1 min-w-0 overflow-y-auto p-6">
      <div class="flex justify-end py-2">
        <Button size="sm" onclick={() => open = true}>Add New Stylist</Button>
      </div>

      <StaffTable {staff} />

      

    </main>


 





