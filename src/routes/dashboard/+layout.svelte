<script>
	import { createLoadingStatusStore } from "$lib/stores/store.svelte";

    const loadingStatus = createLoadingStatusStore();
</script>

{#if !loadingStatus.isLoading}
    <slot />
{/if}