<script>
  import { slide } from "svelte/transition";
  import { getRepos } from "../GitHubApi.js";
  import { state, sendEvent } from "../xState/rootState.js";

  let OrgName = "facebook";
  let SelectedOrgname = "facebook";
  $: repos = getRepos(SelectedOrgname);
  let SelectedRepo = "pyre2";
  let RepoNameSearch = "";

  import { idbKeyval } from "../indexDB.js";
</script>

<div class="flex-none w-64 h-screen bg-white overflow-y-hidden relative">
  <h1
    class=" text-orange-600 font-extrabold text-center text-4xl shadow-lg
    border-r border-grey-500">
    PR Tagger
  </h1>
  <div class="my-4 px-2 pb-4 border-gray-600 border-opacity-50 border-b">
    <label
      class="block text-gray-700 text-sm font-bold mb-2"
      for="organization">
      Organization Name
    </label>
    <div class="flex justify-between">
      <input
        class="shadow appearance-none border border-blue-500 rounded
        rounded-r-none w-full py-1 px-3 text-gray-700 leading-tight
        focus:outline-none"
        id="organization"
        type="text"
        placeholder="Organization"
        on:keydown={event => {
          if (event.keyCode === 13) {
            SelectedOrgname = OrgName;
            SelectedRepo = '';
            sendEvent('UPDATE_SELECTED_ORG', { orgName: SelectedOrgname });
          }
        }}
        bind:value={OrgName} />
      <button
        class="bg-blue-500 border-blue-500 border hover:bg-blue-700 text-white
        font-bold py-2 px-4 rounded rounded-l-none focus:outline-none text-sm"
        type="button"
        on:click={() => {
          SelectedOrgname = OrgName;
          SelectedRepo = '';
          sendEvent('UPDATE_SELECTED_ORG', { orgName: SelectedOrgname });
        }}>
        search
      </button>
    </div>
  </div>
  <div
    class="my-4 px-2 pb-4 border-gray-600 border-opacity-50 border-b
    overflow-y-scroll h-full">
    {#await repos}
      {#each [0, 0, 0, 0, 0, 0, 0] as _}
        <div
          in:slide={{ duration: 350 }}
          class="skeleton-box px-2 p-2 border-gray-500 border-opacity-75
          border-t text-white">
          ...
        </div>
      {/each}
    {:then repos}
      <input
        class="mb-4 shadow appearance-none border border-blue-500 rounded w-full
        py-1 px-3 text-gray-700 leading-tight focus:outline-none sticky top-0"
        id="organization"
        type="text"
        placeholder="Search"
        bind:value={RepoNameSearch} />
      {#if repos && repos.length > 0}
        {#each repos.filter(repo =>
          RepoNameSearch.length > 0
            ? repo.name.indexOf(RepoNameSearch) > -1
            : true
        ) as repo}
          <div
            in:slide={{ duration: 350 }}
            on:click={() => {
              sendEvent('UPDATE_SELECTED_REPO', { repoName: repo.name });
            }}
            class="px-2 p-2 border-gray-500 border-opacity-75 border-t {$state.context.repo === repo.name ? 'bg-orange-300 bg-opacity-75' : 'cursor-pointer hover:bg-orange-300 hover:bg-opacity-25'}">
            {repo.name}
          </div>
        {/each}
      {/if}
    {:catch error}
      not found
    {/await}
  </div>
</div>
