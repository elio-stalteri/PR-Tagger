<script>
  import { slide } from "svelte/transition";
  import CommentViewer from "../molecules/CommentViewer.svelte";
  import { getRepoComments ,getAllRepoComments} from "../GitHubApi.js";

  import { state } from "../xState/rootState.js";


  
  $: comments  = $state.context.organization && $state.context.repo
      ? getAllRepoComments($state.context.organization, $state.context.repo)
      : false 


  import { getCommentsIds, getCommentsTagged } from "../indexDB.js";

  let commentsIds = [];
  getCommentsIds().then(res => {
    commentsIds = res;
  });
</script>

{#if $state.matches('home.comments')}
  {#if comments}
    {#await comments}
      {#each [0, 0, 0, 0, 0] as _}
        <CommentViewer loading={true} />
      {/each}
    {:then result}
      {#if result.length === 0}
        <div
          in:slide={{ duration: 150 }}
          class="w-11/12 p-4 pt-6 mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg">
          <h1
            class="w-full text-3xl font-extrabold text-center text-orange-600 ">
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
{:else if $state.matches('home.saved')}
  {#await getCommentsTagged()}
    {#each [0, 0, 0, 0, 0] as _}
      <CommentViewer loading={true} />
    {/each}
  {:then result}
    {#if Object.keys(result).length === 0}
      <div
        in:slide={{ duration: 150 }}
        class="w-11/12 p-4 pt-6 mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg">
        <h1 class="w-full text-3xl font-extrabold text-center text-orange-600 ">
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
{/if}
