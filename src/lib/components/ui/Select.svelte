<script lang="ts">
  export let label: string;
  export let placeholder = "Select an option";
  export let options: { label: string; value: number }[] = [];
  export let value: number | null = null;

  let open = false;

  type SelectOption = {
    label: string;
    value: number;
  };

  function select(option: SelectOption) {
    value = option.value;
    open = false;
  }

  $: selectedLabel =
    options.find(o => o.value === value)?.label ?? null;
</script>

<div class="space-y-1">
  {#if label}
    <label class="block text-sm font-medium text-gray-700">
      {label}
    </label>
  {/if}

  <div class="relative">
    <!-- Trigger -->
    <button
      type="button"
      class="
        flex w-full items-center justify-between
        rounded-lg border border-gray-300 bg-white
        px-3 py-2 text-sm
        text-gray-800 shadow-sm
        transition
        hover:border-gray-400
        focus:outline-none focus:ring-2 focus:ring-primary/20
      "
      on:click={() => (open = !open)}
    >
      <span class={selectedLabel ? "text-gray-900" : "text-gray-400"}>
        {selectedLabel ?? placeholder}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown -->
    {#if open}
      <ul
        class="
          absolute z-50 mt-1 max-h-60 w-full overflow-auto
          rounded-lg border border-gray-200 bg-white
          shadow-lg
        "
      >
        {#each options as option}
          <li
            class="
              cursor-pointer px-3 py-2 text-sm
              hover:bg-primary/10
              hover:text-primary
            "
            on:click={() => select(option)}
          >
            {option.label}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
