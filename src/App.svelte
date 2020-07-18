<script>
  import Tailwind from "./tailwind.svelte";
  import LoggedIn from "./Loggedin.svelte";
  import GithubLogin from "./GitHubLogin.svelte";

  console.log("GITHUB CLIENTID",GITHUB_CLIENTID)
  const client_id = GITHUB_CLIENTID;
  export let name;
  const convertQueryParams = url => {
    const query = url;
    const result = {};
    query.split("&").forEach(param => {
      const item = param.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  };
  let LogInTocken = localStorage.getItem("GithubLogInTocken");
  console.log(LogInTocken);
</script>

<style>
  :global(body, html) {
    @apply bg-orange-300;
    @apply p-0;
    @apply m-0;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Tailwind />
{#if !LogInTocken}
  <main>
    <h1 class="font-bold">Hello {name}!</h1>
    <p>
      Visit the
      <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
      to learn how to build Svelte apps.
    </p>

    <GithubLogin
      clientId={client_id}
      scope="user:email"
      redirectUri="http://localhost:5000/"
      on:success={params => {
        fetch('http://localhost:3000/' + params.detail.code)
          .then(function(response) {
            return response.text();
          })
          .then(function(data) {
            LogInTocken = data;
            localStorage.setItem('GithubLogInTocken', LogInTocken);
            console.log('LogInTocken', LogInTocken);
          });
      }}
      on:error={error => console.log(error)}
      let:onLogin>
      <button on:click={onLogin}>Github Login</button>
    </GithubLogin>
  </main>
{:else}
  <LoggedIn />
{/if}
