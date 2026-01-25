<script>
  import { Bell, Moon } from "lucide-svelte";

</script>
<header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between    mb-6">
	<div>
		<h3 class="text-xs sm:text-sm text-stone-500">WELCOME BACK, ADMIN</h3>
		<h1 class="text-xl sm:text-2xl md:text-3xl text-foreground">Admin Dashboard Overview</h1>
	</div>

	<div class="flex items-center gap-3 sm:gap-6">
		<button
			type="button"
			aria-label="Toggle theme"
			class="bg-white hover:bg-muted p-2 rounded-full border border-sidebar-ring/50 shadow-md transition-all"
		>
			<Moon size="22" class="text-stone-500" />
		</button>

		<button
			type="button"
			aria-label="Notifications"
			class="bg-white hover:bg-muted p-2 rounded-full border border-sidebar-ring/50 shadow-md transition-all"
		>
			<Bell size="22" class="text-stone-500" />
		</button>

		<div class="flex items-center gap-3 sm:gap-4">
			<div class="hidden sm:flex flex-col text-right">
				<p class="text-foreground">Isabella V.</p>
				<p class="text-stone-500 text-xs sm:text-sm">Admin</p>
			</div>
			<div>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8_7Qafd4bF14ANfvukHcXCPFlQCIZwB573PDHjYAMw&s"
					alt="User Avatar"
					class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
				/>
			</div>
		</div>
	</div>
</header>