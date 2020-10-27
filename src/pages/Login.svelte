<script>
  import { onMount} from "svelte";
  import Button from "../atoms/Button.svelte";
  import {state,sendEvent} from "../xState/rootState"

const redirectUri="http://localhost:5000/login"
  const client_id = GITHUB_CLIENTID;
  const urlGithub = "https://github.com/login/oauth/authorize";
  const scope="user:email"

  let GithHubCode = false;

  onMount(()=>{
    GithHubCode =location.href.split("?")[1].split("&").reduce((acc,v)=>{
      const formatted = v.split("=").map((p)=>decodeURIComponent(p));
      return {...acc,[formatted[0]]:formatted[1]}
    },{})
  })

  $: console.log($state)

  $: if(GithHubCode){
    console.log(GithHubCode);
    fetch('http://localhost:3000/' + GithHubCode.code)
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          console.log(data)
          localStorage.setItem('GithubLogInTocken', data);
          sendEvent("HOME")
        });
  }

  const useParam = (name, variable) => {
    if (variable) {
      return `&${name}=${variable}`;
    }
    return "";
  };
  const onLogin = ()=>{
    let urlParams = `client_id=${client_id}`;
    urlParams += useParam("scope", scope);
    urlParams += useParam("redirect_uri", redirectUri);
    urlParams += useParam("allow_signup", "false");
    console.log(`${urlGithub}?${urlParams}`);
    location.href = `${urlGithub}?${urlParams}`;
  }
</script>

<main class="max-w-md p-4 mx-auto my-4 text-center">
  <h1
    class="mb-5 text-4xl font-extrabold text-center text-orange-600 bg-orange-200 shadow-lg ">
    PR Tagger
  </h1>

  
    <Button on:click={onLogin}>Github Login</Button>

</main>
