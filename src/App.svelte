<script>
  import Tailwind from "./tailwind.svelte";
  import Loggedin from "./Loggedin.svelte";
  import GithubLogin from "./GitHubLogin.svelte";
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
  let LogInTocken = localStorage.getItem('GithubLogInTocken');
  console.log(LogInTocken)
</script>

<style>
:global(body,
  html) {
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
  <!-- content here -->
  <main>
    <h1 class="font-bold">Hello {name}!</h1>
    <p>
      Visit the
      <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
      to learn how to build Svelte apps.
    </p>

    <GithubLogin
      clientId="your client id"
      scope="user:email"
      redirectUri="http://localhost:5000/"
      on:success={params => {
        fetch('http://localhost:3000/' + params.detail.code)
          .then(function(response) {
            return response.text();
          })
          .then(function(data) {
			  LogInTocken = convertQueryParams(data).access_token
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
  <Loggedin {LogInTocken} />
{/if}
