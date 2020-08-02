<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';

  import { handleRedirect } from './handle-redirect';

  onMount(async () => {
    try {
      await handleRedirect();
    } catch (e) {
      throw e;
    }

    navigate('/');
  });
</script>
