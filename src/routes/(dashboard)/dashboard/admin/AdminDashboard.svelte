<!--
  AdminDashboard component for the admin section.
  Displays the admin dashboard layout with sidebar navigation and main content area.
  Allows admins to access different management features easily.
-->
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
	<div class="flex-1 min-w-0 bg-background p-6 overflow-y-auto ">
		<h3 class="text-sm text-stone-500">WELCOME BACK, ADMIN</h3>
		<h1 class="text-2xl  md:text-3xl text-foreground">Admin Dashboard Overview</h1>
	</div>
</div>
<SidebarMobile role={role} />