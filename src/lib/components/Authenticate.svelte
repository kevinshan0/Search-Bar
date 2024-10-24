<script lang="ts">
	import { authHandler } from "$lib/stores/store.svelte";

    let email:string;
    let password:string;
    let confirmPassword:string;

    let registering = true;
    let authenticating = false;
    let errorOccured = false;

    async function authenticate() {
        if (authenticating)
            return;

        if (!email || !password ||
        (registering && !confirmPassword) ||
        (registering && (password !== confirmPassword))) {
            errorOccured = true;
            return;
        }

        authenticating = true;

        try {
            if (registering) {
                await authHandler.signup(email, password);
            }
            else {
                await authHandler.signin(email, password);
            }
        }
        catch (error) {
            console.log("authentication error", error);
            authenticating = false;
            errorOccured = true;
        }

    }

    function switchAuth() {
        registering = !registering;
    }
</script>

<div class="container">
    <form>
        <h1>{registering ? "Sign Up": "Sign In"}</h1>
        {#if errorOccured}
            <p class="error">Invalid Credentials</p>
        {/if}
        <label>
            <p>Email</p>
            <input type="email" bind:value={email} placeholder="Email">
        </label>
        <label>
            <p>Password</p>
            <input type="password" bind:value={password} placeholder="Password">
        </label>
        {#if registering}
            <label>
                <p>Confirm Password</p>
                <input type="password" bind:value={confirmPassword} placeholder="Password">
            </label>
        {/if}
        <button on:click={authenticate}>
            {#if authenticating}
                loading
            {:else}
                {registering ? "Sign Up": "Sign In"}
            {/if}
        </button>
    </form>

    <div>
        <p>
            <span>{registering ? "Already have an account?" : "Don't have an account?"}</span>
            <a href="/" on:click={switchAuth}>{registering ? "Sign In" : "Sign Up"}</a>
        </p>
    </div>
</div>