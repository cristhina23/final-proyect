<!--
  Mobile bottom navigation.
  Uses shared sidebarData.
  Renders role-based navigation items.
-->

<script lang="ts">
  import { sidebarData } from "$lib/data/sidebarData";
  import type { UserRole } from "$lib/types/role";
  import { page } from "$app/stores";
  import MoreMenuModal from "../ui/MoreMenuModal.svelte";

  
  let { role } = $props<{ role: UserRole }>();
  let showModal = $state(false);
  let active = $state("");

  const items = $derived(
    role && sidebarData[role as UserRole] 
      ? sidebarData[role as UserRole].filter(item => item.mobile) 
      : []
  );
</script>

<nav
  class="h-20 w-full bg-primary/30 border-t border-secondary/70
         flex items-center justify-around"
>
  {#each items as item}
    
      <button
        type="button"
        class="flex flex-col items-center justify-center flex-1 gap-1 transition"
        aria-label={item.label}
        onclick={() => {
            if (item.modal) {
              showModal = true;
            } else {
              active = item.label.toLowerCase();
              window.location.href = item.route!;
            }
          }}
      >
        <!-- Icon -->
        <item.icon
          size={22}
          class={active === item.label.toLowerCase() ? 'text-brown' : 'text-brown/60'}
        ></item.icon>
        <!-- Label -->
        <span class={active === item.label.toLowerCase() ? 'text-xs text-brown font-semibold' : 'text-xs text-brown/60'}>
          {item.label}
        </span>
      </button>
   
  {/each}
</nav>


<MoreMenuModal role={role} bind:open={showModal} />
