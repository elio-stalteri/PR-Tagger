<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button
  class=" w-32 flex-none bg-white hover:bg-gray-100 text-gray-800 font-semibold
  py-2 px-4 border border-gray-400 rounded shadow focus:outline-none
  outline-none leading-3 text-xs focus:border-gray-400" on:click={(e)=>{dispatch("click", e);}}>
  <slot />
</button>
