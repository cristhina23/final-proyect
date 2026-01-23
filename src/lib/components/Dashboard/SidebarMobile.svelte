<!--
  Mobile bottom navigation.
  Uses shared sidebarData.
  Renders role-based navigation items.
-->

<script lang="ts">
  import { sidebarData } from "$lib/data/sidebarData";
  import type { UserRole } from "$lib/types/role";
  import MoreMenuModal from "../ui/MoreMenuModal.svelte";

  
  const props = $props<{ role: UserRole }>();
  const role: UserRole = props.role;


  let showModal = $state(false);

  let active = $state("");
</script>

<nav
  class="fixed bottom-0 left-0 right-0 z-50 h-20 bg-primary/30 border-t border-secondary/70
         flex items-center justify-around md:hidden"
>
  {#each sidebarData[role].filter(item => item.mobile === true) as item}
    
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
