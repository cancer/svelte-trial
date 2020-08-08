<script>
  import Home from './pages/home/home.svelte';
  import { Router, Route } from 'svelte-routing';
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
</Router>
