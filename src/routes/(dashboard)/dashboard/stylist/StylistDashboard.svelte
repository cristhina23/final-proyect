<script lang="ts">
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";
  import type { UserRole } from "$lib/types/role";

  const { role } = $props<{ role: UserRole }>();

</script>
<div class="flex h-screen">
	<div class="hidden md:flex  shrink-0 border-r border-muted">
		<Sidebar role={role} />
	</div>
	<div class="flex-1 min-w-0">
		<h1>Welcome to the Stylist Dashboard</h1>
	</div>
</div>
<SidebarMobile role={role} />