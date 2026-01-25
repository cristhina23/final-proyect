<!--
  Sidebar component for the dashboard.
  Fixed header + fixed footer
  Scrollable middle section for navigation links
-->

<script lang="ts">
  import Logo from "$lib/assets/logo.png";
  import { page } from "$app/stores";
  import { ChevronRight, X, LogOut } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { sidebarData } from "$lib/data/sidebarData";
  import type { UserRole } from "$lib/types/role";

  const props = $props<{ role?: UserRole }>();

  let collapsed = $state(false);
  
  // Safe derivation of items
  const items = $derived(props.role ? sidebarData[props.role as UserRole] : []);

  function toggleSidebar() {
    collapsed = !collapsed;
  }

  function isActive(route: string) {
    if (!route) return false;
    if (route === "/dashboard") {
       return $page.url.pathname === route;
    }
    return $page.url.pathname.startsWith(route);
  }
</script>


<div
  class="flex flex-col h-screen bg-muted p-4 relative transition-all duration-300 ease-in-out"
  style="width: {collapsed ? '80px' : '256px'}; min-width: {collapsed ? '80px' : '256px'};"
>
  <!-- HEADER (FIJO) -->
  <div class="flex items-center justify-between mb-4 h-12 shrink-0">
    <img
      src={Logo}
      alt="logo"
      class="w-30 transition-all duration-300 {collapsed ? 'hidden' : 'block'}"
    />

    <Button
      class="cursor-pointer absolute right-4 top-4 z-10"
      variant="ghost"
      size="icon"
      onclick={toggleSidebar}
    >
      {#if collapsed}
        <ChevronRight size="24" />
      {:else}
        <X size="24" />
      {/if}
    </Button>
  </div>

  <div class="my-2 mb-6 w-full h-px bg-secondary/50 shrink-0"></div>

  <!-- BODY -->
  <div class="flex flex-col h-full min-h-0">
    
    <!-- NAVIGATION  -->
    <div class="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden pr-1">
      {#each items as item}
        {#if item.desktop}
          <a
            href={item.route}
            class="flex items-center gap-3 p-2 h-10 rounded-lg border-l-4
              transition-all duration-200 text-foreground
              {isActive(item.route || '')
                ? 'bg-secondary/30 border-secondary text-brown font-semibold'
                : 'border-transparent'}
              hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
          >
            <item.icon size={20} class="shrink-0" />
            {#if !collapsed}
              <span class="whitespace-nowrap transition-all duration-300">
                {item.label}
              </span>
            {/if}
          </a>
        {/if}
      {/each}
    </div>

    <!-- FOOTER (FIJO) -->
    <div class="shrink-0 pt-3">
      <div class="my-4 w-full h-px bg-secondary/50"></div>

     
      

      <!-- ACTION BUTTON -->
      {#if !collapsed}
        <Button
          href="/"
          class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          View Website Live
        </Button>
      {:else}
        <Button
          href="/"
          class="w-full mt-4 flex items-center justify-center text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <LogOut size="24" />
        </Button>
      {/if}
    </div>

  </div>
</div>
