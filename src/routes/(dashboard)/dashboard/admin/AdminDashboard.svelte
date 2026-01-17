<!--
  AdminDashboard component for the admin section.
  Displays the admin dashboard layout with sidebar navigation and main content area.
  Allows admins to access different management features easily.
-->
<script>
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";

</script>

<div class="flex h-screen">
	<div class="hidden md:flex  shrink-0 border-r border-muted">
		<Sidebar />
	</div>
	<div class="flex-1 min-w-0">
		<h1>Welcome to the Admin Dashboard</h1>
	</div>
</div>
<SidebarMobile />