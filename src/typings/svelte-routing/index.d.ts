import { SvelteComponent } from 'svelte';

declare module 'svelte-routing' {
  export = SvelteRouting;

  namespace SvelteRouting {
    class Router extends SvelteComponent {}
    class Route extends SvelteComponent {}
    class Link extends SvelteComponent {}

    type StateObject = any;
    interface NavigateOptions {
      state: StateObject | null;
      replace?: boolean;
    }
    function navigate(to: string, opts: NavigateOptions);

    interface Destroyer {
      destroy(): void;
    }
    function link(node: Node): Destroyer;
    function links(node: Node): Destroyer;
  }
}
