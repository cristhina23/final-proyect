<script lang="ts">
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";
  import type { UserRole } from "$lib/types/role";

  const { role } = $props<{ role: UserRole }>();

</script>
<div class="flex h-screen">
	<div class="flex-1 min-w-0">
		<h1>Hello, {role}!</h1>
    <p>Ready for another day of making people feel beautiful?</p>
	</div>
</div>
