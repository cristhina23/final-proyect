
<script lang="ts">
  import Header from "$lib/components/Dashboard/adminDashboard/Header.svelte";
  import StaffTable from "$lib/components/Dashboard/adminDashboard/StaffTable.svelte";
  import { stylists } from "$lib/data";
  import type { UserRole } from "$lib/types/role";
  

  const { role } = $props<{ role: UserRole }>();
</script>


    
    <Header />

    <!-- CONTENT -->
    <main class="flex-1 min-w-0 overflow-y-auto p-6">
      <StaffTable staff={stylists} />
    </main>

 





