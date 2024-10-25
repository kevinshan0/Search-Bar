<script lang="ts">
	import { input } from "$lib/stores/store.svelte";
	
    import Button from "./ui/button/button.svelte";
	import Input from "./ui/input/input.svelte";
	import Label from "./ui/label/label.svelte";

    let text: string;
    function onclick() {
        input.set(text);
    }
</script>

<Label for="search-bar">Search Bar</Label>
<Input id="search-bar" type="text" bind:value={text}></Input>
<Button {onclick}>Enter</Button>