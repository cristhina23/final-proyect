<script lang="ts">
  
  let active = 'home';
  const nav = [
    { name: 'Home', icon: 'home', route: '/dashboard' },
    { name: 'Bookings', icon: 'calendar', route: '/dashboard/bookings' },
    { name: 'Add', icon: 'plus', route: '/dashboard/add', center: true },
    { name: 'History', icon: 'history', route: '/dashboard/history' },
    { name: 'Profile', icon: 'user', route: '/dashboard/profile' }
  ];
</script>

<nav class="fixed bottom-0 left-0 w-full bg-white shadow flex justify-around items-center h-20 z-50 md:hidden">
  {#each nav as item}
    {#if item.center}
      <button
        class="relative flex flex-col items-center justify-center w-16 h-16 rounded-full bg-brown text-white shadow-lg -mt-8 border-4 border-white focus:outline-none"
        aria-label={item.name}
        on:click={() => active = item.name.toLowerCase()}
      >
        <span class="text-3xl">+</span>
      </button>
    {:else}
      <button
        class="flex flex-col items-center justify-center flex-1 focus:outline-none"
        aria-label={item.name}
        on:click={() => active = item.name.toLowerCase()}
      >
        <span class="text-2xl mb-1">
          
          {#if item.icon === 'home'}🏠{/if}
          {#if item.icon === 'calendar'}📅{/if}
          {#if item.icon === 'history'}⏱️{/if}
          {#if item.icon === 'user'}👤{/if}
        </span>
        <span class="text-xs {active === item.name.toLowerCase() ? 'text-brown font-semibold' : 'text-gray-400'}">
          {item.name}
        </span>
      </button>
    {/if}
  {/each}
</nav>

<style>
  .bg-brown {
    background-color: #8d5524;
  }
  .text-brown {
    color: #8d5524;
  }
</style>
