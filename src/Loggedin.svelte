<script>
  import { slide } from "svelte/transition";
  import RepoViewer from "./organism/RepoViewer.svelte";
  import Button from "./atoms/Button.svelte";

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
  import { getRepos } from "./GitHubApi.js";

  let OrgName = "facebook";
  let SelectedOrgname = "facebook";
  $: repos = getRepos(SelectedOrgname);
  let SelectedRepo = "pyre2";
  let RepoNameSearch = "";
  const menu = ["comments", "saved"];
  let menuSelected = "comments";

  import { idbKeyval } from "./indexDB.js";
</script>

<div class="flex flex-row absolute top-0 left-0 w-screen">
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
        {#if repos && repos.length > 0}
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
              class="px-2 p-2 border-gray-500 border-opacity-75 border-t {SelectedRepo === repo.name ? 'bg-orange-300 bg-opacity-75' : 'cursor-pointer hover:bg-orange-300 hover:bg-opacity-25'}">
              {repo.name}
            </div>
          {/each}
        {/if}
      {:catch error}
        not found
      {/await}
    </div>
  </div>
  <div
    class="flex-auto bg-orange-300 pb-10 block m-0 h-screen overflow-y-scroll
    relative">
    <div class="shadow-lg bg-white mb-10 sticky top-0 z-50 flex flex-row">
      <ul class=" flex-grow flex border-b capitalize">
        {#each menu as item}
          <!-- content here -->
          {#if item === menuSelected}
            <!-- content here -->
            <li class="-mb-px mr-1">
              <span
                class="bg-orange-500 bg-opacity-75 inline-block border-l
                border-t border-r rounded-t py-4 px-4 text-white font-semibold">
                {item}
              </span>
            </li>
          {:else}
            <li class="mr-1">
              <span
                class="bg-white inline-block py-4 px-4 text-gray-800
                font-semibold cursor-pointer"
                on:click={() => {
                  menuSelected = item;
                }}>
                {item}
              </span>
            </li>
          {/if}
        {/each}

      </ul>
      <Button
        on:click={() => {
          idbKeyval.clear().then(() => {
            console.log('db cleared');
          });
        }}>
        Clear DB
      </Button>
    </div>
    <RepoViewer org={SelectedOrgname} repo={SelectedRepo} {menuSelected} />
  </div>
</div>
