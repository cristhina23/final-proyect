<script lang="ts">
  import StylistCard from "$lib/components/Dashboard/stylistDashboard/StylistCard.svelte";
  import type { UserRole } from "$lib/types/role";
  import { Calendar, DollarSign, User, Clock, Package, Star, CreditCard } from "lucide-svelte";

  const { role } = $props<{ role: UserRole }>();

  

</script>
<div class="flex h-screen flex-col">
	<div class="w-full py-4 mb-6">
		<h1 class="text-2xl font-bold">Hello, {role}!</h1>
    <p class="text-gray-500">Ready for another day of making people feel beautiful?</p>
	</div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <StylistCard 
      icon={Calendar} 
      indicator="+ more from yesterday" 
      title="Today's appointments"  
      value="8" 
    />

    <StylistCard 
      icon={DollarSign} 
      indicator="10% more than last week" 
      title="Weekly Earnings"  
      value="$800" 
      />

    <div class="w-full max-w-sm bg-primary/70 border rounded-lg shadow-lg">
     <div class="flex flex-col py-6">

    <div class="flex justify-between px-6">
      <User class="w-5 h-5 " />
      <p class="text-xs text-emerald-400 bg-emerald-100 rounded-full px-2 py-1">In 15 minutes</p>

    </div>

    <div class="px-6 mt-4">
      <p class="text-sm text-foreground/80 ">Next Client</p>
      <p class="text-lg text-foreground font bold">Isabella Thorne</p>
      <p class="text-sm text-foreground/80">Balayage & Haircut</p>
    </div>

     </div>
    </div>

  </div>

  <!-- Upcoming Tasks and Recent Activity Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
    <!-- Upcoming Tasks -->
    <div class="bg-white border rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Upcoming Tasks</h2>
        <button class="text-sm text-primary hover:underline">View All</button>
      </div>

      <div class="space-y-4">
        <!-- Task 1: Inventory Check -->
        <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="bg-amber-100 p-2 rounded-lg">
            <Package class="w-5 h-5 text-amber-600" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">Inventory Check</h3>
            <p class="text-sm text-gray-500">Check stock for Olaplex No. 3 and toners</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Due Today, 2:00 PM</p>
            <input type="checkbox" class="mt-1 w-4 h-4 text-primary rounded" />
          </div>
        </div>

        <!-- Task 2: Client Follow-up -->
        <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="bg-orange-100 p-2 rounded-lg">
            <Clock class="w-5 h-5 text-orange-600" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">Client Follow-up</h3>
            <p class="text-sm text-gray-500">Send care instructions to Sarah Miller</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Due Today, 4:30 PM</p>
            <input type="checkbox" class="mt-1 w-4 h-4 text-primary rounded" />
          </div>
        </div>

        <!-- Task 3: Weekly Schedule Review -->
        <div class="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="bg-amber-100 p-2 rounded-lg">
            <Calendar class="w-5 h-5 text-amber-600" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">Weekly Schedule Review</h3>
            <p class="text-sm text-gray-500">Review and approve next week's bookings</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Due Tomorrow</p>
            <input type="checkbox" class="mt-1 w-4 h-4 text-primary rounded" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 border rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-bold mb-6">Recent Activity</h2>

      <div class="space-y-4">
        <!-- Activity 1: New Booking -->
        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">New Booking: Julianne Moore</h3>
            <p class="text-sm text-gray-600">Blowout - Oct 24, 11:00 AM</p>
            <p class="text-xs text-gray-400 mt-1">5 mins ago</p>
          </div>
        </div>

        <!-- Activity 2: New Review -->
        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">New 5-star Review!</h3>
            <p class="text-sm text-gray-600">"Alexandria is amazing with color!" - Maria</p>
            <p class="text-xs text-gray-400 mt-1">2 hours ago</p>
          </div>
        </div>

        <!-- Activity 3: Payment Received -->
        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">Payment Received</h3>
            <p class="text-sm text-gray-600">Completed: Classic Manicure ($45.00)</p>
            <p class="text-xs text-gray-400 mt-1">3 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
