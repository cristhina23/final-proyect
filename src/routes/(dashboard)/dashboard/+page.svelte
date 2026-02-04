<script lang="ts">
  import type { UserRole } from "$lib/types/role";
  import AdminDashboard from "./admin/AdminDashboard.svelte";
  import StylistDashboard from "./stylist/StylistDashboard.svelte";
  import UserDashboard from "./user/UserDashboard.svelte";


		let role = $state<UserRole>("STYLIST");	
      
     // For testing purposes, set the role here
	// <Sidebar role={user.role} /> use this when you need to use the actual user role
</script>


{#if role === "ADMIN"}
  <AdminDashboard role={role} />
{:else if role === "STYLIST"}
  <StylistDashboard role={role} />
{:else}
  <UserDashboard role={role} />
{/if}

