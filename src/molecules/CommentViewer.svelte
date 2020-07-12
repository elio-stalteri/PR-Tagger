<script>
  import { slide } from "svelte/transition";
  import CodeViewer from "./CodeViewer.svelte";
  export let loading = false;
  export let comment = false;
  export let index = 0;
  let toggleComment = false;
</script>

{#if loading}
  <div
    in:slide={{ duration: 150 }}
    class="w-11/12 pt-6 rounded-lg overflow-hidden shadow-lg mx-auto mb-10
    bg-white p-4">
    <div class="flex mb-2">
      <div class="skeleton-box rounded-full w-12 h-12 flex-none mr-2" />
      <div class="skeleton-box flex-grow" />
    </div>
  </div>
{:else}
  {#if comment}
    <div
      in:slide={{ delay: index * 100 + 300, duration: 350 }}
      class="w-11/12 rounded-lg overflow-hidden shadow-lg mx-auto mb-10 bg-white
      p-4">
      <div class="w-full -mt-4 border-b border-gray-500 border-opacity-75 py-2">
        <div class="w-full text-grey-700 h-7 flex flex-row">
          <button
            class=" w-32 flex-none bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2
            px-4 border border-gray-400 rounded shadow focus:outline-none outline-none leading-3 text-sm"
            on:click={() => {
              toggleComment = !toggleComment;
            }}>
            {toggleComment ? 'hide code' : 'show code'}
          </button>
          <input class=" flex-none shadow appearance-none border border-blue-500 rounded
          w-40 py-2 px-3 ml-3 text-gray-700 leading-tight focus:outline-none sticky
          top-0 text-sm" id="organization" type="text" placeholder="Search Tag">
        </div>
      </div>
      <div
        class="w-full mb-6 ">
        {#if toggleComment}
          <CodeViewer diffHunk={comment.diff_hunk} />
        {/if}
      </div>
      <div class="flex mb-6">
        {#if comment.user}
          <img
            src={comment.user.avatar_url}
            alt="editor"
            class="rounded-full w-12 h-12 flex-none mr-2" />
        {/if}
        <div>
          {@html comment.body}
        </div>
      </div>

    </div>
  {/if}
{/if}
