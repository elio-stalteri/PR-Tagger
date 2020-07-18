<script>
  import Tailwind from "./tailwind.svelte";
  import router from "page";

  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";

  let page;
  let params;

  router("login", () => {
    page = Login;
    params = {};
  });
  router("organization", () => {
    page = Home;
    params = {};
  });
  router(
    "organization/:org_name",
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => {
      page = Home;
      params = {};
    }
  );
  router(
    "organization/:org_name/:repo_name",
    (ctx, next) => {
      params = ctx.params;
      next();
    },
    () => {
      page = Home;
      params = {};
    }
  );
  router("saved", () => {
    page = Home;
    params = {};
  });
  router("*", () => {
    router("organization");
  });

  router.start();
</script>

<style>
  :global(body, html) {
    @apply bg-orange-300;
    @apply p-0;
    @apply m-0;
  }
</style>

<Tailwind />
<svelte:component this={page} {params} />
