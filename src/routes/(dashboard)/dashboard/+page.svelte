<script lang="ts">
  
  import AdminDashboard from "./admin/AdminDashboard.svelte";
  import StylistDashboard from "./stylist/StylistDashboard.svelte";
  import UserDashboard from "./user/UserDashboard.svelte";

		let role = $state<'user' | 'stylist' | 'admin'>('user');	

		role = "admin"
</script>

<svelte:head>
	<title>Admin Dashboard | BeautySalon</title>
	<meta name="description" content="Admin Dashboard for BeautySalon. Expert stylists, premium services, and a relaxing atmosphere." />
</svelte:head>

{#if role === "admin"}
  <AdminDashboard />
{:else if role === "stylist"}
  <StylistDashboard />
{:else}
  <UserDashboard />
{/if}

