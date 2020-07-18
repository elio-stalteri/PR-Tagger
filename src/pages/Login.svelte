<script>
  import GithubLogin from "../molecules/GitHubLogin.svelte";
  import Button from "../atoms/Button.svelte";

  const client_id = GITHUB_CLIENTID;
</script>

<main class="p-4 mx-auto my-4 max-w-md text-center">
  <h1
    class=" text-orange-600 font-extrabold text-center text-4xl shadow-lg mb-5
    bg-orange-200">
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
