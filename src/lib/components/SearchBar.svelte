<script lang="ts">
    let input:string;
    let errorOccured:boolean;

    function processInput() {
        let actions = ["note", "remind", "gpt", "help"];

        let action = (input.indexOf(" ") !== -1)
         ? input.substring(0, input.indexOf(" "))
         : input;

        if (!actions.includes(action)) {
            window.location.href = `https://www.google.com/search?q=${input}&sourceid=chrome&ie=UTF-8`;
            return;
        }

        switch (action) {
            case "note":
                noteHandler();
                break;
        
            default:
                break;
        }
    }

    function noteHandler() {
        
    }
</script>

<form>
    <label>
        <h1>Search Bar</h1>
        <input type="text" bind:value={input}>
    </label>
    <button on:click={processInput}>
        Enter
    </button>
</form>