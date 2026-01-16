<script lang="ts">
  import Logo from "$lib/assets/logo.png"
  import Button from "../ui/button/button.svelte";
	
  let occupancy = 75;
  let open = $state(true);

  let collapsed = $state(false);

export function toggleSidebar() {
  collapsed = !collapsed;
}
  
</script>


<div 
  class="flex flex-col h-screen bg-muted p-4 relative transition-all duration-300 ease-in-out"
  style="width: {collapsed ? '80px' : '256px'}; min-width: {collapsed ? '80px' : '256px'};"
>
	<div class="flex items-center justify-between mb-4 h-12">
    <img 
      src={Logo} 
      alt="logo" 
      class="w-30 transition-all duration-300"
      style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};"
    >
    
    <Button 
      class="cursor-pointer absolute right-4 top-4 z-10" 
      variant="ghost" 
      size="icon"
      onclick={() => toggleSidebar()}
    >
      {#if collapsed}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg> 
      {/if}
    </Button>
  </div>
  
  <div class="my-4 w-full h-[1px] bg-secondary/50"></div>
  
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-2">
      <a href="/dashboard" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard shrink-0">
          <rect width="7" height="9" x="3" y="3" rx="1"/>
          <rect width="7" height="5" x="14" y="3" rx="1"/>
          <rect width="7" height="9" x="14" y="12" rx="1"/>
          <rect width="7" height="5" x="3" y="16" rx="1"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Overview</span>
      </a>
      
      <a href="/dashboard/staff" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users shrink-0">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Staff</span>
      </a>
      
      <a href="/dashboard/schedule" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-check shrink-0">
          <path d="M8 2v4"/>
          <path d="M16 2v4"/>
          <rect width="18" height="18" x="3" y="4" rx="2"/>
          <path d="M3 10h18"/>
          <path d="m9 16 2 2 4-4"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Schedule</span>
      </a>
      
      <a href="/dashboard/services" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-heart shrink-0">
          <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/>
          <path d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"/>
          <path d="m2 15 6 6"/>
          <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Services</span>
      </a>
      
      <a href="/dashboard/reports" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-files shrink-0">
          <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>
          <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z"/>
          <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Reports</span>
      </a>
      
      <a href="/dashboard/settings" class="flex items-center gap-3 hover:bg-secondary/30 p-2 rounded-lg border-l-4 border-transparent hover:border-l-4 hover:border-secondary hover:text-brown hover:font-semibold transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings shrink-0">
          <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Settings</span>
      </a>
    </div>
    
    <div>
      <div class="my-4 w-full h-[1px] bg-secondary/50"></div>
      
      <div 
        class="border border-secondary/80 rounded-lg bg-secondary/30 p-3 transition-all duration-300"
        style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};"
      >
        <p class="text-muted-foreground text-sm">Current Occupancy</p>
        <div class="flex items-center justify-between">
          <p class="font-heading text-2xl font-semibold">{occupancy}%</p>
          <p class="text-emerald-500 text-sm">+5% Today</p>
        </div>
        <div class="w-full h-[5px] bg-secondary/50 rounded-xl mt-2 transition-all duration-500">
          <span class="h-full block bg-emerald-500 rounded-xl" style="width: {occupancy}%"></span>
        </div>
      </div>
      
      {#if !collapsed}
        <Button href="/" class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300" variant="default">
          View Website Live
        </Button>
      {:else}
        <Button href="/" class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center" variant="default">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in">
            <path d="m10 17 5-5-5-5"/>
            <path d="M15 12H3"/>
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
          </svg>
        </Button>
      {/if}
    </div>
  </div>
</div>
