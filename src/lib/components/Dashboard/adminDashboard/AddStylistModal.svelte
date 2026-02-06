<script>
	import { createEventDispatcher } from 'svelte';
	

  const dispatch = createEventDispatcher();
  export let open = false

   function submit() {
    dispatch("create", {
      name,
      email,
      role: "STYLIST"
    });

    open = false;
   } 

</script>

{#if open}
   <div class="modal">
    <input bind:value={name} placeholder="Name" />
    <input bind:value={email} placeholder="Email" />

    <button on:click={submit}>Create</button>
  </div>
{/if}