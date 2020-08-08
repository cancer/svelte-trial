<script>
  import Home from './pages/home/home.svelte';
  import { Router, Route } from 'svelte-routing';
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
</Router>

<svelte:head>
  <link rel="stylesheet" href="/bundle.css" />
  <title>Kindle Pusher</title>
</svelte:head>
