<script>
  import RepoViewer from "./organism/RepoViewer.svelte";
  import { setClient } from "svelte-apollo";
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

  setClient(apolloClient);
</script>

<div class="flex flex-row absolute top-0 left-0 w-screen">
  <div class="flex-none w-64 h-screen bg-white overflow-y-scroll">
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
          placeholder="Facebook" />
        <button
          class="bg-blue-500 border-blue-500 border hover:bg-blue-700 text-white
          font-bold py-2 px-4 rounded rounded-l-none focus:outline-none text-sm"
          type="button">
          search
        </button>
      </div>
    </div>
  </div>
  <div
    class="flex-auto bg-orange-300 py-10 block m-0 h-screen overflow-y-scroll">
    <RepoViewer />
  </div>
</div>
