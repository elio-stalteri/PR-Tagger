<script>
  import { slide } from "svelte/transition";
  import RepoViewer from "./organism/RepoViewer.svelte";
  /*
        import { setClient } from "svelte-apollo";
        //import gql from "graphql-tag";
        //import { REPOS } from "./queyrs.js";
        import { ApolloClient } from "apollo-client";
        import { createHttpLink } from "apollo-link-http";
        import { setContext } from "apollo-link-context";
        import { InMemoryCache } from "apollo-cache-inmemory";
        const cache = new InMemoryCache();
        // content here
        const httpLink = createHttpLink({
        // You should use an absolute URL here
        uri: "https://api.github.com/graphql"
        });

        const authLink = setContext((_, { headers }) => {
        return {
        headers: {
        ...headers,
        authorization: LogInTocken ? `Bearer ${LogInTocken}` : ""
        }
        };
        });
        // Cache implementation
        // Create an Apollo client and pass it to all child components
        // (uses svelte's built-in context)
        const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),

        cache,
        request: operation => {
        operation.setContext({
        headers: {
        Authorization: `bearer ${LogInTocken}`
        }
        });
        }
        });

        setClient(apolloClient);
  */

  export let LogInTocken = false;
  import { getRepos } from "./GitHubApi.js";

  let OrgName = "facebook";
  let SelectedOrgname = "facebook";
  $: repos = getRepos(SelectedOrgname);
  let SelectedRepo = "pyre2";
  let RepoNameSearch = "";
</script>

<div class="flex flex-row absolute top-0 left-0 w-screen">
  <div class="flex-none w-64 h-screen bg-white overflow-y-hidden relative">
    <h1 class=" text-orange-600 font-extrabold text-center text-4xl shadow-lg">
      PR Analyzer
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
          bind:value={OrgName} />
        <button
          class="bg-blue-500 border-blue-500 border hover:bg-blue-700 text-white
          font-bold py-2 px-4 rounded rounded-l-none focus:outline-none text-sm"
          type="button"
          on:click={() => {
            SelectedOrgname = OrgName;
            SelectedRepo = '';
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
          class="mb-4 shadow appearance-none border border-blue-500 rounded
          w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none sticky
          top-0"
          id="organization"
          type="text"
          placeholder="Search"
          bind:value={RepoNameSearch} />
        {#each repos.filter(repo =>
          RepoNameSearch.length > 0
            ? repo.name.indexOf(RepoNameSearch) > -1
            : true
        ) as repo}
          <div
            in:slide={{ duration: 350 }}
            on:click={() => {
              SelectedRepo = repo.name;
            }}
            class="px-2 p-2 border-gray-500 border-opacity-75 border-t {SelectedRepo === repo.name ? 'bg-teal-300 bg-opacity-75' : 'cursor-pointer hover:bg-teal-300 hover:bg-opacity-25'}">
            {repo.name}
          </div>
        {/each}
      {:catch error}
        not found
      {/await}
    </div>
  </div>
  <div
    class="flex-auto bg-orange-300 py-10 block m-0 h-screen overflow-y-scroll">
    <RepoViewer org={SelectedOrgname} repo={SelectedRepo} />
  </div>
</div>
