<script>
  import Tailwind from "./tailwind.svelte";
  import LoggedIn from "./Loggedin.svelte";
  import GithubLogin from "./GitHubLogin.svelte";
  import Button from "./atoms/Button.svelte";

  console.log("GITHUB CLIENTID", GITHUB_CLIENTID);
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

</style>

<Tailwind />
{#if !LogInTocken}
  <main class="p-4 mx-auto my-4 max-w-md text-center">
    <h1 class=" text-orange-600 font-extrabold text-center text-4xl shadow-lg mb-5 bg-orange-200">
      PR Tagger
    </h1>

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
      <Button on:click={onLogin}>Github Login</Button>
    </GithubLogin>
  </main>
{:else}
  <LoggedIn />
{/if}
