<script lang="ts">
    import { auth } from "$lib/firebase";
	import { authHandler } from "../../stores/store.svelte";

    let email:string;
    let password:string;
    let confirmPassword:string;

    let registering = true;
    let error = false;

    function authenticate() {
        if (!email || !password || password !== confirmPassword || (registering && !confirmPassword)) {
            error = true;
            return;
        }

        if (registering) {
            const authHandlerInstance = authHandler();
            authHandlerInstance.signup(email, password);
        }
    }

    function switchAuth() {
        registering = !registering;
    }
</script>

<div class="container">
    <form>
        <h1>{registering ? "Sign Up": "Sign In"}</h1>
        <label>
            <p>Email</p>
            {#if error}
                <p class="error">Invalid Credentials</p>
            {/if}
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
        <button on:click={authenticate}>{registering ? "Sign Up": "Sign In"}</button>
    </form>

    <div>
        <p>
            <span>{registering ? "Already have an account?" : "Don't have an account?"}</span>
            <a href="/" on:click={switchAuth}>{registering ? "Sign Up" : "Sign In"}</a>
        </p>
    </div>
</div>