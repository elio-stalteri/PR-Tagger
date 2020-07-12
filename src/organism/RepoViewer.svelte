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

  export let org = "facebook";
  export let repo = "pyre2";
  $: comments = repo != "" ? getRepoComments(org, repo) : false;
</script>

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
        <h1 class=" text-3xl text-orange-600 font-extrabold w-full text-center">
          NO RESULT
        </h1>
      </div>
    {:else}
      {#each result as comment, idx}
        {#if comment}
          <CommentViewer {comment} index={idx} />
        {/if}
      {/each}
    {/if}
  {:catch error}
    {localStorage.removeItem('GithubLogInTocken') ? '' : ''}
    <li>ERROR: {error}</li>
  {/await}
{/if}
