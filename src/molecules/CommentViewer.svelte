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
      <div
        class="w-full mb-6 border-b border-gray-500 border-opacity-75 {toggleComment ? '' : 'h-7'}">
        {#if toggleComment}
          <CodeViewer diffHunk={comment.diff_hunk} />
        {/if}
        <div
          class="w-full text-center cursor-pointer text-green-700 h-7"
          on:click={() => {
            toggleComment = !toggleComment;
          }}>
          {toggleComment ? 'hide code' : 'show code'}
        </div>
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
