<!--
    SecondaryButton component for less prominent actions in the UI.
    Supports custom styles, disabled state, and optional link behavior.
    Use this for secondary or alternative actions.
-->

<script lang="ts">
	let { 
		type = 'button', 
		disabled = false, 
		href = undefined,
		bg = 'bg-[var(--primary)]',
		text = 'text-[var(--primary-foreground)]', 
		padding = 'px-8 py-2',
		class: className = '',
		children 
	}: { 
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		href?: string;
		bg?: string;
		text?: string;
		padding?: string;
		class?: string;
		children?: any;
	} = $props();

    let baseClasses = $derived(`
        group relative overflow-hidden rounded-full font-semibold shadow-md transition-all duration-500 ease-out
        ${padding} ${text} ${bg} hover:scale-105 hover:shadow-xl 
        inline-flex items-center justify-center
        ${className}
    `);
</script>

{#if href}
    <a {href} class={baseClasses}>
        <!-- Overlay -->
        <span
            class="
            absolute inset-0 bg-white opacity-0
            translate-y-full
            transition-all duration-500 ease-out
            group-hover:translate-y-0 group-hover:opacity-40
            "
        ></span>
        
        <span class="relative z-10 transition-colors duration-300 group-hover:text-[var(--accent-foreground)]">
            {@render children?.()}
        </span>
    </a>
{:else}
    <button {type} {disabled} class={baseClasses}>
        <!-- Overlay -->
        <span
            class="
            absolute inset-0 bg-white opacity-0
            translate-y-full
            transition-all duration-500 ease-out
            group-hover:translate-y-0 group-hover:opacity-40
            "
        ></span>
        
        <span class="relative z-10 transition-colors duration-300 group-hover:text-[var(--accent-foreground)]">
            {@render children?.()}
        </span>
    </button>
{/if}
