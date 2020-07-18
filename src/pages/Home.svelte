<script>
  import { slide } from "svelte/transition";
  import RepoViewer from "../organism/RepoViewer.svelte";
  import Button from "../atoms/Button.svelte";
  import { getRepos } from "../GitHubApi.js";
  import { state } from "../xState/rootState.js";
  import LeftMenu from "../organism/LeftMenu.svelte";
  import TopBar from "../organism/TopBar.svelte"

</script>

<div class="flex flex-row absolute top-0 left-0 w-screen">
  <LeftMenu />
  <div
    class="flex-auto bg-orange-300 pb-10 block m-0 h-screen overflow-y-scroll
    relative">
    <TopBar />
    <RepoViewer />
  </div>
</div>
