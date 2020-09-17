<script>
  import GithubLogin from "../molecules/GitHubLogin.svelte";
  import Button from "../atoms/Button.svelte";

  const client_id = GITHUB_CLIENTID;
</script>

<main class="max-w-md p-4 mx-auto my-4 text-center">
  <h1
    class="mb-5 text-4xl font-extrabold text-center text-orange-600 bg-orange-200 shadow-lg ">
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
          localStorage.setItem('GithubLogInTocken', data);
        });
    }}
    on:error={error => console.log(error)}
    let:onLogin>
    <Button on:click={onLogin}>Github Login</Button>
  </GithubLogin>
</main>
