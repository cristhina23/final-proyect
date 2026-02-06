<script lang="ts">
  import type { UserRole } from "$lib/types/role";
  import AdminDashboard from "./admin/AdminDashboard.svelte";
  import StylistDashboard from "./stylist/StylistDashboard.svelte";
  import UserDashboard from "./user/UserDashboard.svelte";

  export let data: {
    role: UserRole;
  };

  const { role } = data;
</script>

{#if role === "ADMIN"}
  <AdminDashboard role={role} />
{:else if role === "STYLIST"}
  <StylistDashboard role={role} />
{:else}
  <UserDashboard role={role} />
{/if}
