<script lang="ts">
    let { 
    id,
    label, 
    placeholder = "Select an option", 
    options = [], 
    value = $bindable(null) 
  } = $props<{
    id?: string;
    label?: string;
    placeholder?: string;
    options: { label: string; value: number }[];
    value: number | null;
  }>();

  let open = $state(false);

  type SelectOption = {
    label: string;
    value: number;
  };

  function select(option: SelectOption) {
    value = option.value;
    open = false;
  }

  let selectedLabel = $derived(
    options.find((o: SelectOption) => o.value === value)?.label ?? null
  );
</script>

<div class="space-y-1">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700">
      {label}
    </label>
  {/if}

  <div class="relative">
    <!-- Trigger -->
    <button
      {id}
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
      onclick={() => (open = !open)}
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
          <li>
            <button
              type="button"
              class="
                w-full text-left cursor-pointer px-3 py-2 text-sm
                hover:bg-primary/10
                hover:text-primary
              "
              onclick={() => select(option)}
            >
              {option.label}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
