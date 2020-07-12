<script>
  // your script goes here
  import { slide } from "svelte/transition";
  import CodeViewer from "./CodeViewer.svelte";
  export let comment = false;
  export let index = 0;
</script>

{#if comment}
  <!-- content here -->
  <div
    transition:slide={{ delay: index * 100 + 500, duration: 500 }}
    class="w-11/12 rounded-lg overflow-hidden shadow-lg mx-auto mb-10 bg-white
    p-6">
    <div class="flex mb-6">
      {#if comment.author}
        <img
          src={comment.author.avatarUrl}
          alt="editor"
          class="rounded-full w-12 h-12 flex-none mr-2" />
      {/if}
      {@html comment.bodyHTML}
    </div>
    <CodeViewer diffHunk={comment.diffHunk} />
  </div>
{/if}
