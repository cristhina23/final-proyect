<script lang="ts">
  import { sidebarData } from "$lib/data/sidebarData";
  import type { UserRole } from "$lib/types/role";
  import { X, LogOut } from "lucide-svelte";
  import Button from "./button/button.svelte";

  export let open = false;
  export let role: UserRole;

  function close() {
    open = false;
  }

  function onBackdropKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === "Enter" || key === " ") {
      // Space key can be reported as " "
      event.preventDefault();
      close();
    }
  }
</script>

{#if open}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-40 bg-black/40"
    role="button"
    tabindex="0"
    aria-label="Close modal"
    on:click={close}
    on:keydown={onBackdropKeydown}
  ></div>

  <!-- Modal -->
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-background
           rounded-t-3xl p-6 shadow-xl animate-slide-up"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-brown">
        More options
      </h3>

      <button on:click={close}>
        <X class="text-brown" />
      </button>
    </div>

    <!-- Options -->
    <div class="flex flex-col gap-4">
      {#each sidebarData[role].filter(item => !item.mobile && item.route) as item}
        <a
          href={item.route}
          class="flex items-center gap-3 text-brown hover:opacity-80"
          on:click={close}
        >
          <svelte:component this={item.icon} size={20} />
          <span>{item.label}</span>
        </a>
      {/each}
      <a
          href="/logout"
          class="flex items-center gap-3 text-brown hover:opacity-80"
          
        >
          <LogOut size={20} />
          <span>Logout</span>
        </a>

      <!-- Divider -->
      <div class="h-px bg-secondary/50 my-2"></div>

      <Button href="/" class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300" variant="default">
          View Website Live
        </Button>

    

      
    </div>
  </div>
{/if}

<style>
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.25s ease-out;
  }
</style>
