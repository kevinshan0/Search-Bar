<script lang="ts">
	import { input } from "$lib/stores/store.svelte";

    let text: string;
    function onclick() {
        input.set(text);
    }
</script>

<form>
    <label>
        <h1>Search Bar</h1>
        <input type="text" bind:value={text}>
    </label>
    <button {onclick}>Enter</button>
</form>