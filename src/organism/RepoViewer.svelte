<script>
  import { slide } from "svelte/transition";
  import CommentViewer from "../molecules/CommentViewer.svelte";
  import { getRepoComments } from "../GitHubApi.js";
  /*
        import { getClient, query } from "svelte-apollo";
        const client = getClient();
        import { REPOS } from "../queries.js";
        const repos = query(client, {
        query: REPOS
        });
  */
  /*
    facebook
    pyre2
    Port to python3
  */
  export let menuSelected = "comments";
  export let org = "facebook";
  export let repo = "pyre2";
  $: comments = repo != "" ? getRepoComments(org, repo) : false;

  import { getCommentsIds, getCommentsTagged } from "../indexDB.js";

  let commentsIds = [];
  getCommentsIds().then(res => {
    commentsIds = res;
  });
</script>

{#if menuSelected === 'comments'}
  {#if comments}
    {#await comments}
      {#each [0, 0, 0, 0, 0] as _}
        <CommentViewer loading={true} />
      {/each}
    {:then result}
      {#if result.length === 0}
        <div
          in:slide={{ duration: 150 }}
          class="w-11/12 pt-6 rounded-lg overflow-hidden shadow-lg mx-auto mb-10
          bg-white p-4">
          <h1
            class=" text-3xl text-orange-600 font-extrabold w-full text-center">
            NO RESULT
          </h1>
        </div>
      {:else}
        {#each result as comment, idx}
          {#if comment}
            <CommentViewer bind:commentsIds {comment} index={idx} />
          {/if}
        {/each}
      {/if}
    {:catch error}
      {localStorage.removeItem('GithubLogInTocken') ? '' : ''}
      <li>ERROR: {error}</li>
    {/await}
  {/if}
{:else if menuSelected === 'saved'}
  {#await getCommentsTagged()}
    {#each [0, 0, 0, 0, 0] as _}
      <CommentViewer loading={true} />
    {/each}
  {:then result}
    {#if Object.keys(result).length === 0}
      <div
        in:slide={{ duration: 150 }}
        class="w-11/12 pt-6 rounded-lg overflow-hidden shadow-lg mx-auto mb-10
        bg-white p-4">
        <h1 class=" text-3xl text-orange-600 font-extrabold w-full text-center">
          NO RESULT
        </h1>
      </div>
    {:else}
      {#each Object.entries(result) as [tag, comments], idx}
        {#each Object.values(comments) as comment}
          {#if comment}
            <CommentViewer {tag} {comment} index={idx} />
          {/if}
        {/each}
      {/each}
    {/if}
  {:catch error}
    {localStorage.removeItem('GithubLogInTocken') ? '' : ''}
    <li>ERROR: {error}</li>
  {/await}
{:else}
  <!-- else content here -->
{/if}
