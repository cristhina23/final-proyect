<script lang="ts">
  import type { UserRole } from "$lib/types/role";
  import AdminDashboard from "./admin/AdminDashboard.svelte";
  import StylistDashboard from "./stylist/StylistDashboard.svelte";
  import UserDashboard from "./user/UserDashboard.svelte";


		let role = $state<UserRole>("user");	
      role = "admin";
     // For testing purposes, set the role here
	// <Sidebar role={user.role} /> use this when you need to use the actual user role
</script>

<svelte:head>
	<title>Admin Dashboard | BeautySalon</title>
	<meta name="description" content="Admin Dashboard for BeautySalon. Expert stylists, premium services, and a relaxing atmosphere." />
</svelte:head>

{#if role === "admin"}
  <AdminDashboard role={role} />
{:else if role === "stylist"}
  <StylistDashboard role={role} />
{:else}
  <UserDashboard role={role} />
{/if}

