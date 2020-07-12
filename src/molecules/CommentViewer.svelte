<script>
  import { slide } from "svelte/transition";
  import Button from "../atoms/Button.svelte";

  import CodeViewer from "./CodeViewer.svelte";
  export let tag = false;
  export let loading = false;
  export let comment = false;
  export let index = 0;
  let toggleComment = false;

  import { updateTag, getCommentsIds } from "../indexDB.js";

  let TagName = "";

  export let commentsIds = [];
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
{:else if comment && (tag !== false || commentsIds.indexOf(`${comment.id}`) === -1)}
  <div
    in:slide={{ delay: index * 50 + 100, duration: 350 }}
    class="w-11/12 rounded-lg overflow-hidden shadow-lg mx-auto mb-10 bg-white
    p-4">
    <div class="w-full -mt-4 border-b border-gray-500 border-opacity-75 py-2">
      <div class="w-full text-grey-700 h-7 flex flex-row">
        <Button
          on:click={() => {
            toggleComment = !toggleComment;
          }}>
          {toggleComment ? 'hide code' : 'show code'}
        </Button>

        {#if tag}
          <div
            class="flex-none hover:bg-gray-100 font-semibold py-2 px-4 mx-3
            border border-gray-400 rounded-lg shadow outline-none leading-3 text-xs
            text-white bg-orange-600 ">
            {tag}
          </div>
        {:else}
          <input
            class=" flex-none shadow appearance-none border border-blue-500
            rounded w-40 py-2 px-3 mx-3 text-gray-700 leading-tight
            focus:outline-none sticky top-0 text-xs"
            type="text"
            bind:value={TagName}
            placeholder="Tag Name" />
          <Button
            on:click={() => {
              if (TagName !== '') {
                updateTag(TagName, comment).then(() => {
                  console.log('added');
                  getCommentsIds().then(res => {
                    commentsIds = res;
                  });
                });
              }
            }}>
            Save Comment
          </Button>
        {/if}
      </div>
    </div>
    <div class="w-full mb-6 ">
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
