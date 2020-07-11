<script>
  import { setClient, getClient, query } from "svelte-apollo";
  //import gql from "graphql-tag";
  //import { REPOS } from "./queyrs.js";

  export let LogInTocken = false;

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
  // 1. Create an Apollo client and pass it to all child components
  //    (uses svelte's built-in context)

  setClient(apolloClient);

  // 3. Execute the GET_BOOKS graphql query using the Apollo client
  //    -> Returns a svelte store of promises that resolve as values come in

  /*
  const repo_query = gql`
    query getRepo {
      user(login: "elio-stalteri") {
        repositoriesContributedTo(first: 10) {
          edges {
            node {
              id
              isArchived
              isDisabled
              isFork
              isLocked
              isMirror
              isTemplate
              isPrivate
              name
              mirrorUrl
              owner {
                url
                login
                avatarUrl(size: 10)
              }
            }
          }
        }
      }
    }
  `;
  */
  import { REPOS } from "./queries.js";

  const books = query(apolloClient, {
    query: REPOS
  });
</script>

<div class="flex flex-row absolute top-0 left-0 w-screen">
  <div class="flex-none w-64 h-screen bg-white overflow-y-scroll" >
    <h1 class=" text-orange-600 font-extrabold text-center text-4xl border-gray-900 border-b-1 shadow-lg">PR Analyzer</h1>
  </div>
  <div class="flex-auto bg-orange-300  py-10 block m-0 h-screen overflow-y-scroll">
    {#await $books}
      <li>Loading...</li>
    {:then result}
      {#each result.data.organization.repositories.nodes as repo}
        {#if repo}
          {#each repo.pullRequests.nodes as pr}
            {#if pr}
              {#each pr.reviews.nodes as review}
                {#if review}
                  {#each review.comments.nodes as comment}
                    <div
                      class="w-11/12 rounded-lg overflow-hidden shadow-lg
                      mx-auto mb-10 bg-white p-6">
                      <div>
                        {@html comment.bodyHTML}
                      </div>
                      <pre
                        class="bg-gray-800 text-gray-100 py-8 px-1
                        scrolling-auto overflow-x-scroll w-full font-mono text-sm">

                        {#each comment.diffHunk.split('\n') as row}
                          <span
                            class={`block h-5 bg-opacity-50 w-full text-xs leading-5 align-middle font-mono ${row.charAt(0) == '+' ? 'bg-green-600' : row.charAt(0) == '-' ? 'bg-red-600' : ''}`}>
                            {row.trim()}
                          </span>
                        {/each}
                      </pre>
                    </div>
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
  </div>
</div>
