<script lang="ts">
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";
  import type { UserRole } from "$lib/types/role";
  import '../../app.css'
  import { setContext } from 'svelte';
  let { children } = $props();

  const role = $state<UserRole>("stylist");
</script>

<div class="flex h-screen bg-background">
  <aside class="hidden md:flex shrink-0 border-r">
    <Sidebar role={role} />
  </aside>

  <div class="flex-1 flex flex-col min-w-0">
    <main class="flex-1 overflow-y-auto md:p-6">
      {@render children()}  
    </main>

    <div class="md:hidden">
      <SidebarMobile role={role} />
    </div>
  </div>
</div>
