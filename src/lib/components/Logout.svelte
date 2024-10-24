<script lang="ts">
	import { authHandler } from "$lib/stores/store.svelte";
</script>

<button on:click={authHandler.logout}>
    Logout
</button>