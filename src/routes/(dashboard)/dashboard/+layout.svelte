<script lang="ts">
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";
  import type { UserRole } from "$lib/types/role";
  import '../../app.css'
  import { Toaster } from 'svelte-french-toast';

  export let data: {
    role: UserRole;
  };

  const { role } = data;
</script>

<div class="flex h-screen bg-background">
  <aside class="hidden md:flex shrink-0 border-r">
    <Sidebar role={role} />
  </aside>

  <div class="flex-1 flex flex-col min-w-0">
    <main class="flex-1 overflow-y-auto md:p-6">
      <Toaster position="top-right" />
      <slot />
    </main>

    <div class="md:hidden">
      <SidebarMobile role={role} />
    </div>
  </div>
</div>
