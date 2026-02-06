<!-- Sidebar.svelte -->

<script lang="ts">
  import Logo from "$lib/assets/logo.png";
  import { page } from "$app/stores";
  import { ChevronRight, X, LogOut } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import { sidebarData } from "$lib/data/sidebarData";
  import type { UserRole } from "$lib/types/role";

  let { role } = $props<{ role: UserRole }>();

  let collapsed = $state(false);

 
  const items = $derived(sidebarData[role as UserRole] ?? []);

  function toggleSidebar() {
    collapsed = !collapsed;
  }

  function isActive(route?: string) {
    if (!route) return false;
    if (route === "/dashboard") {
      return $page.url.pathname === route;
    }
    return $page.url.pathname.startsWith(route);
  }

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    if (response.ok) {
      window.location.href = '/';
    }
  };
</script>

<div
  class="flex flex-col h-screen bg-muted p-4 relative transition-all duration-300 ease-in-out"
  style="width:{collapsed ? '80px' : '256px'}; min-width:{collapsed ? '80px' : '256px'};"
>
  <!-- HEADER -->
  <div class="flex items-center justify-between h-12 shrink-0">
    {#if !collapsed}
      <img src={Logo} alt="logo" class="h-14" />
    {/if}

    <Button
      variant="ghost"
      size="icon"
      class="absolute right-4 top-4 z-10"
      onclick={toggleSidebar}
    >
      {#if collapsed}
        <ChevronRight size={20}  />
      {:else}
        <X size={20} />
      {/if}
    </Button>
  </div>

  <div class="my-4 h-px bg-secondary/50 shrink-0"></div>

  <!-- NAV -->
  <nav class="flex flex-col gap-2 flex-1 overflow-y-auto pr-1">
    {#each items as item (item.route)}
      {#if item.desktop}
        <a
          href={item.route}
          class="
            flex items-center gap-3 h-10 px-3 rounded-lg border-l-4
            transition-all duration-200
            {isActive(item.route)
              ? 'bg-secondary/30 border-secondary text-brown font-semibold'
              : 'border-transparent text-foreground'}
            hover:bg-secondary/30 hover:border-secondary hover:text-brown
          "
        >
          <item.icon size={20} class="shrink-0" />

          {#if !collapsed}
            <span class="whitespace-nowrap">{item.label}</span>
          {/if}
        </a>
      {/if}
    {/each}
  </nav>

  <!-- FOOTER -->
  <div class="shrink-0 pt-3">
    <div class="my-4 h-px bg-secondary/50"></div>

    {#if collapsed}
        <Button
          variant="ghost"
          size="icon"
          class="w-full flex items-center justify-center gap-2
        hover:text-brown hover:shadow-lg hover:scale-[1.02] transition-all"
          onclick={logout}
        >
          <LogOut size={20} />
        </Button>

    {:else}
    <Button
      href="/"
      class="w-full flex items-center justify-center gap-2
        hover:text-brown hover:shadow-lg hover:scale-[1.02] transition-all"
        aria-label="Logout"
        >
        View Website Live
    </Button>
    {/if}
  </div>
</div>
