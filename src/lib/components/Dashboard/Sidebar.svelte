


<script lang="ts">
  import Logo from "$lib/assets/logo.png"
  import { ChevronRight } from "lucide-svelte";
  import Button from "../ui/button/button.svelte";
	import {  LogOut, X } from "lucide-svelte";
  import { LayoutDashboard } from "lucide-svelte";
  import { Users } from "lucide-svelte";
  import { HandHeart } from "lucide-svelte";
  import { Files } from "lucide-svelte";
  import { Settings } from "lucide-svelte";
  import { CalendarCheck } from "lucide-svelte";
 
  

  let occupancy = 75;
  let open = $state(true);

  let collapsed = $state(false);

  // Estado para el link activo
  let active = $state('overview');

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
        <ChevronRight size="24" onclick={() => toggleSidebar()}/>
      {:else}
        <X size="24" onclick={() => toggleSidebar()}   /> 
      {/if}
    </Button>
  </div>
  
  <div class="my-4 w-full h-px bg-secondary/50"></div>
  
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-2">
      <a href="/dashboard"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'overview' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'overview'}
        style="padding-left: 24px; justify-content: flex-start;"
      >
        <LayoutDashboard size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Overview</span>
      </a>
      
      <a href="/dashboard/staff"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'staff' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'staff'}
        style="padding-left: {collapsed ? '24px' : '16px'}; justify-content: flex-start;"
      >
        <Users  size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Staff</span>
      </a>
      
      <a href="/dashboard/schedule"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'schedule' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'schedule'}
        style="padding-left: {collapsed ? '24px' : '16px'}; justify-content: flex-start;"
      >
        <CalendarCheck size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Schedule</span>
      </a>
      
      <a href="/dashboard/services"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'services' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'services'}
        style="padding-left: {collapsed ? '24px' : '16px'}; justify-content: flex-start;"
      >
        <HandHeart size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Services</span>
      </a>
      
      <a href="/dashboard/reports"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'reports' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'reports'}
        style="padding-left: {collapsed ? '24px' : '16px'}; justify-content: flex-start;"
      >
        <Files size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Reports</span>
      </a>
      
      <a href="/dashboard/settings"
        class="flex items-center gap-3 p-2 rounded-lg border-l-4 transition-all duration-200 {active === 'settings' ? 'bg-secondary/30 border-secondary text-brown font-semibold' : 'border-transparent'} hover:bg-secondary/30 hover:border-secondary hover:text-brown hover:font-semibold"
        onclick={() => active = 'settings'}
        style="padding-left: {collapsed ? '24px' : '16px'}; justify-content: flex-start;"
      >
        <Settings size="24" style="min-width:24px;" />
        <span class="whitespace-nowrap transition-all duration-300" style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};">Settings</span>
      </a>
    </div>
    
    <div>
      <div class="my-4 w-full h-px bg-secondary/50"></div>
      
      <div 
        class="border border-secondary/80 rounded-lg bg-secondary/30 p-3 transition-all duration-300"
        style="visibility: {collapsed ? 'hidden' : 'visible'}; opacity: {collapsed ? '0' : '1'};"
      >
        <p class="text-muted-foreground text-sm">Current Occupancy</p>
        <div class="flex items-center justify-between">
          <p class="font-heading text-2xl font-semibold">{occupancy}%</p>
          <p class="text-emerald-500 text-sm">+5% Today</p>
        </div>
        <div class="w-full h-1.25 bg-secondary/50 rounded-xl mt-2 transition-all duration-500">
          <span class="h-full block bg-emerald-500 rounded-xl" style="width: {occupancy}%"></span>
        </div>
      </div>
      
      {#if !collapsed}
        <Button href="/" class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300" variant="default">
          View Website Live
        </Button>
      {:else}
        <Button href="/" class="w-full mt-4 text-foreground hover:text-brown hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center" variant="default">
          <LogOut size="24" /> 
        </Button>
      {/if}
    </div>
  </div>
</div>

<style>
  .active {
    background-color: var(--secondary, #f5f5f5);
    border-left-color: var(--secondary, #a3a3a3);
    color: var(--brown, #8d5524);
    font-weight: 600;
  }
</style>