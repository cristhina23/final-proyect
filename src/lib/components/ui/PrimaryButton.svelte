<!--
	PrimaryButton component for main actions in the UI.
	Supports custom styles, disabled state, and optional link behavior.
	Use this for the most important or primary actions.
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	let { 
		type = 'button', 
		disabled = false, 
		href = undefined,
		bg = 'bg-[var(--primary)]',
		text = 'text-white', 
		padding = 'px-8 py-2',
		class: className = '',
		children, 
		target = '',
	}: { 
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		href?: string;
		bg?: string;
		text?: string;
		padding?: string;
		class?: string;
		children?: any;
		target?: string;
	} = $props();

	let baseClasses = $derived(`
		group relative overflow-hidden rounded-full
		${padding}
		font-semibold
		${text}
		shadow-lg
		transition-all duration-500 ease-out
		${bg}
		hover:scale-105 hover:shadow-2xl
		inline-flex items-center justify-center
		${className}
	`);
</script>

{#if href}
	<a
		{href}
		{target}
		class={baseClasses}
		onclick={(e) => dispatch('click', e)}
	>
		<span
			class="
				absolute inset-0 scale-150 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 rotate-45
				translate-x-[-100%] translate-y-[-25%]
				transition-all duration-900 ease-out
				group-hover:translate-x-[150%]
				group-hover:opacity-45
			"
		></span>

		<span class="relative z-10">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button
		{type}
		{disabled}
		class={baseClasses}
		onclick={(e) => dispatch('click', e)}
	>
		<span
			class="
				absolute inset-0 scale-150 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 rotate-45
				translate-x-[-100%] translate-y-[-25%]
				transition-all duration-900 ease-out
				group-hover:translate-x-[150%]
				group-hover:opacity-45
			"
		></span>

		<span class="relative z-10">
			{@render children?.()}
		</span>
	</button>
{/if}
