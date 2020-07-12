<script>
  import { getClient, query } from "svelte-apollo";
  import CommentViewer from "../molecules/CommentViewer.svelte";

  const client = getClient();
  import { REPOS } from "../queries.js";

  /*
    facebook
    pyre2
    Port to python3
  */

  const repos = query(client, {
    query: REPOS
  });
</script>

{#await $repos}
  <li>Loading...</li>
{:then result}
  {#each result.data.organization.repositories.nodes as repo, idx}
    {#if repo}
      <h1 class="bg-green-200">{repo.name}</h1>
      {#each repo.pullRequests.nodes as pr, idx1}
        {#if pr}
          <h1 class="bg-pink-200">{pr.title}</h1>
          {#each pr.reviews.nodes as review, idx2}
            {#if review}
              {#each review.comments.nodes as comment, idx3}
                <CommentViewer {comment} index={idx + idx1 + idx2 + idx3} />
              {/each}
            {/if}
          {/each}
        {/if}
      {/each}
    {/if}
  {/each}
{:catch error}
  {localStorage.removeItem('GithubLogInTocken') ? '' : ''}
  <li>ERROR: {error}</li>
{/await}
