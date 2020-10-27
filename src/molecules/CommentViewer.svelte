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
    class="w-11/12 p-4 pt-6 mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg">
    <div class="flex mb-2">
      <div class="flex-none w-12 h-12 mr-2 rounded-full skeleton-box" />
      <div class="flex-grow skeleton-box" />
    </div>
  </div>
{:else if comment && (tag !== false || commentsIds.indexOf(`${comment.id}`) === -1)}
  <div
    in:slide={{ delay: index * 50 + 100, duration: 350 }}
    class="w-11/12 p-4 mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg">
    <div class="w-full py-2 -mt-4 border-b border-gray-500 border-opacity-75">
      <div class="flex flex-row w-full text-grey-700 h-7">
        <Button
          on:click={() => {
            toggleComment = !toggleComment;
          }}>
          {toggleComment ? 'hide code' : 'show code'}
        </Button>

        {#if tag}
          <div
            class="flex-none px-4 py-2 mx-3 text-xs font-semibold leading-3 text-white bg-orange-600 border border-gray-400 rounded-lg shadow outline-none ">
            {tag}
          </div>
        {:else}
          <input
            class="sticky top-0 flex-none w-40 px-3 py-2 mx-3 text-xs leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none"
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
    {#if "comments" in comment}
      {#each comment.comments as comm}
        <div class="flex mb-6">
          {#if comm.user}
            <img
              src={comm.user.avatar_url}
              alt="editor"
              class="flex-none w-12 h-12 mr-2 rounded-full" />
          {/if}
          <div>
            {@html comm.body}
          </div>
        </div>
      {/each}
    {:else}
      <div class="flex mb-6">
        {#if comment.user}
          <img
            src={comment.user.avatar_url}
            alt="editor"
            class="flex-none w-12 h-12 mr-2 rounded-full" />
        {/if}
        <div>
          {@html comment.body}
        </div>
      </div>
    {/if}

  </div>
{/if}
