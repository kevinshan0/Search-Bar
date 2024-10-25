<script lang="ts">
	import { authHandler } from "$lib/stores/store.svelte";
	import Button from "./ui/button/button.svelte";
</script>

<Button onclick={authHandler.logout}>Log Out</Button>