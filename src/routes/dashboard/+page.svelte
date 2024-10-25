<script lang="ts">
	import Logout from "$lib/components/Logout.svelte";
	import Note from "$lib/components/Note.svelte";
	import SearchBar from "$lib/components/SearchBar.svelte";
	import { userInfo } from "$lib/stores/store.svelte";
</script>

<Logout/>
<SearchBar/>
{#each userInfo.data.notes as note}
    <Note title={note.title} content={note.content} />
{/each}

{#each userInfo.data.reminders as reminder}
    <Note title={reminder.event} content={reminder.info} />
{/each}