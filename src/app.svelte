<script>
  import Home from './pages/home/home.svelte';
  import Callback from './pages/login/callback/callback.svelte';
  import { Router, Route } from 'svelte-routing';
</script>

<Router>
  <Route path="/">
    <Home />
  </Route>
  <Route path="login/callback">
    <Callback />
  </Route>
</Router>
