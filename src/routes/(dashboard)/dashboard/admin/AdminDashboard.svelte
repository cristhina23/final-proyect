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
	import { Wallet, Calendar, Users, ClipboardList, TrendingUp } from "lucide-svelte";
  import EarningsChart from "$lib/components/Dashboard/adminDashboard/EarningsChart.svelte";
  

	const { role } = $props<{ role: UserRole }>();

</script>

<div class="flex h-screen bg-background ">

	<aside class="hidden md:flex shrink-0 border-r border-muted" aria-label="Sidebar navigation">
		<Sidebar role={role} />
	</aside>

	<div class="flex-1 flex flex-col min-w-0">

	<main class="flex-1 min-w-0 p-6 overflow-y-auto">
		<Header />
		<!-- Main content goes here -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<Card
				mainIcon={Wallet}
				badgeIcon={TrendingUp}
				badgeText="+4.12%"
				title="Today's Revenue"
				value="$1,280.00"
			/>
			<Card
				mainIcon={Calendar}
				badgeIcon={TrendingUp}
				badgeText="+5%"
				title="Total Appointments"
				value={24}
			/>
			<Card
				mainIcon={Users}
				badgeText="– Steady"
				title="New Customers"
				value={8}
			/>
			<Card
				mainIcon={ClipboardList}
				badgeText="Action"
				title="Pending Requests"
				value={12}
			/>
		</div>

	<section class="mt-6">
		<!-- Additional admin dashboard content can go here -->
		 <EarningsChart />
	</section>
		
	</main>

		<div class="md:hidden shrink-0">
      <SidebarMobile role={role} />
    </div>

	</div>
</div>
