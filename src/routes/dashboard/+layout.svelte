<script>
	import { loadingStatus } from "$lib/stores/store.svelte";
</script>

{#if !loadingStatus.isLoading}
    <slot/>
{/if}