<script>
  import { slide } from "svelte/transition";
  import { getRepos } from "../GitHubApi.js";
  import { state, sendEvent } from "../xState/rootState.js";

  let OrgName = $state.context.organization;
  let SelectedOrgname = $state.context.organization;
  $: repos = getRepos(SelectedOrgname);
  let SelectedRepo = $state.context.repo;
  let RepoNameSearch = "";

  import { idbKeyval } from "../indexDB.js";
</script>

<div class="relative flex-none w-64 h-screen overflow-y-hidden bg-white">
  <h1
    class="text-4xl font-extrabold text-center text-orange-600 border-r shadow-lg  border-grey-500">
    PR Tagger
  </h1>
  <div class="px-2 pb-4 my-4 border-b border-gray-600 border-opacity-50">
    <label
      class="block mb-2 text-sm font-bold text-gray-700"
      for="organization">
      Organization Name
    </label>
    <div class="flex justify-between">
      <input
        class="w-full px-3 py-1 leading-tight text-gray-700 border border-blue-500 rounded rounded-r-none shadow appearance-none focus:outline-none"
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
        class="px-4 py-2 text-sm font-bold text-white bg-blue-500 border border-blue-500 rounded rounded-l-none hover:bg-blue-700 focus:outline-none"
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
    class="h-full px-2 pb-4 my-4 overflow-y-scroll border-b border-gray-600 border-opacity-50">
    {#await repos}
      {#each [0, 0, 0, 0, 0, 0, 0] as _}
        <div
          in:slide={{ duration: 350 }}
          class="p-2 px-2 text-white border-t border-gray-500 border-opacity-75 skeleton-box">
          ...
        </div>
      {/each}
    {:then repos}
      <input
        class="sticky top-0 w-full px-3 py-1 mb-4 leading-tight text-gray-700 border border-blue-500 rounded shadow appearance-none focus:outline-none"
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
