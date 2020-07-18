<script>
  import { slide } from "svelte/transition";
  import Button from "../atoms/Button.svelte";
  import { state ,sendEvent} from "../xState/rootState.js";
  import { idbKeyval } from "../indexDB.js";
</script>

<div class="shadow-lg bg-white mb-10 sticky top-0 z-50 flex flex-row">
  <ul class=" flex-grow flex border-b capitalize">
    {#each $state.context.menu as item}
      {#if $state.matches("home."+item.name)}
        <li class="-mb-px mr-1">
          <span
            class="bg-orange-500 bg-opacity-75 inline-block border-l border-t
            border-r rounded-t py-4 px-4 text-white font-semibold">
            {item.name}
          </span>
        </li>
      {:else}
        <li class="mr-1">
          <span
            class="bg-white inline-block py-4 px-4 text-gray-800 font-semibold
            cursor-pointer"
            on:click={() => {
              sendEvent(item.action)
            }}>
            {item.name}
          </span>
        </li>
      {/if}
    {/each}

  </ul>
  <Button
    on:click={() => {
      idbKeyval.clear().then(() => {
        console.log('db cleared');
      });
    }}>
    Clear DB
  </Button>
</div>
