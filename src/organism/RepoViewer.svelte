<script>
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
    <li>Loading...</li>
  {:then result}
    {#if result.length === 0}
      no result
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
