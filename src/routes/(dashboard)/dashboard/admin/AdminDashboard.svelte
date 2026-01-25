<!--
  AdminDashboard component for the admin section.
  Displays the admin dashboard layout with sidebar navigation and main content area.
  Allows admins to access different management features easily.
-->
<script lang="ts">
  import Header from "$lib/components/Dashboard/adminDashboard/Header.svelte";
  import Sidebar from "$lib/components/Dashboard/Sidebar.svelte";
  import SidebarMobile from "$lib/components/Dashboard/SidebarMobile.svelte";
	import Card from "$lib/components/Dashboard/adminDashboard/Card.svelte";
  import type { UserRole } from "$lib/types/role";
	import { Wallet, Calendar, Users, ClipboardList, TrendingUp, AlertCircle, Minus } from "lucide-svelte";
  import EarningsChart from "$lib/components/Dashboard/adminDashboard/EarningsChart.svelte";
  import LifeFeed from "$lib/components/Dashboard/adminDashboard/LifeFeed.svelte";
  import PopularServices from "$lib/components/Dashboard/adminDashboard/PopularServices.svelte";
  import ServiceQuality from "$lib/components/Dashboard/adminDashboard/ServiceQuality.svelte";
  

	const { role } = $props<{ role: UserRole }>();

</script>


	<div class="flex-1 flex flex-col min-w-0">

	<main class="flex-1 min-w-0 p-6 gap-6 overflow-y-auto">
		<Header />
		<!-- Main content goes here -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card
				mainIcon={Wallet}
				badgeIcon={TrendingUp}
				badgeText="+4.12%"
				title="Today's Revenue"
				value="$1,280.00"
				badgeVariant="success"
			/>
			<Card
				mainIcon={Calendar}
				badgeIcon={TrendingUp}
				badgeText="+5%"
				title="Total Appointments"
				value={24}
				badgeVariant="success"
			/>
			<Card
				mainIcon={Users}
				badgeIcon={Minus}
				badgeText="Steady"
				title="New Customers"
				value={8}
				badgeVariant="neutral"
			/>
			<Card
				mainIcon={ClipboardList}
				badgeIcon={AlertCircle}
				badgeText="Action"
				title="Pending Requests"
				value={12}
				badgeVariant="action"
			/>
		</div>

	<section class="mt-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Chart Section -->
    <div class="lg:col-span-2 h-full min-h-[450px] shadow-lg">
		 <EarningsChart />
    </div>
    
    <!-- Life Feed Section -->
    <div class="h-full min-h-[450px] shadow-lg">
      <LifeFeed />
    </div>
	</section>

	<section class="mt-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
		<div class="shadow-lg">
			<PopularServices />
		</div>
		<div class="shadow-lg">
			<ServiceQuality />
		</div>
	</section>
		
	</main>

	

	</div>

