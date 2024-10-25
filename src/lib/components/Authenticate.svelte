<script lang="ts">
	import { authHandler } from "$lib/stores/store.svelte";
	import Button from "./ui/button/button.svelte";
	import Input from "./ui/input/input.svelte";
	import Label from "./ui/label/label.svelte";
    import * as Card from "./ui/card";

    let email:string;
    let password:string;
    let confirmPassword:string;

    let registering = true;
    let authenticating = false;
    let errorOccured = false;

    async function onclick() {
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
            errorOccured = true;
        }

        authenticating = false;
    }

    function switchAuth() {
        registering = !registering;
    }
</script>

<Card.Root class="w-[400px]">
    <Card.Header>
        <Card.Title tag="h1">{registering ? "Sign Up": "Sign In"}</Card.Title>
        {#if errorOccured}
            <p>Invalid Credentials</p>
        {/if}
    </Card.Header>


    <Card.Content>
        <Label for="email">Email</Label>
        <Input id="email" type="email" bind:value={email} placeholder="Email"/>
        
        <Label for="password">Password</Label>
        <Input id="password" type="password" bind:value={password} placeholder="Password"/>

        {#if registering}
            <Label for="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" bind:value={confirmPassword} placeholder="Password"/>
        {/if}

        <Button {onclick}>
            {#if authenticating}
                loading
            {:else}
                {registering ? "Sign Up": "Sign In"}
            {/if}
        </Button>
    </Card.Content>


    <Card.Footer>
        <p>
            <span>{registering ? "Already have an account?" : "Don't have an account?"}</span>
            <a href="/" onclick={switchAuth}>{registering ? "Sign In" : "Sign Up"}</a>
        </p>
    </Card.Footer>
</Card.Root>