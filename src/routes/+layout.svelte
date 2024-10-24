<script lang="ts">
	import { auth, db } from "$lib/firebase";
	import { doc, getDoc, setDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	import { createUserInfoStore ,createLoadingStatusStore } from "$lib/stores/store.svelte";
	import { goto } from "$app/navigation";

    const nonAuthRoutes = ["/"];
    const userInfo = createUserInfoStore();
    const loadingStatus = createLoadingStatusStore();

    onMount(() => {
        auth.onAuthStateChanged(async user => {
            loadingStatus.flip();
            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                goto("/");
                loadingStatus.flip();
                return;
            }

            if (user && currentPath === '/') {
                goto("/dashboard");
                loadingStatus.flip();
                return;
            }

            if (!user) {
                loadingStatus.flip();
                return;
            }

            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            let dataToStore;
            if (!docSnap.exists()) {
                dataToStore = {
                    email: user.email
                }

                await setDoc(
                    userRef,
                    dataToStore,
                    { merge: true }
                );
            }
            else {
                dataToStore = docSnap.data();
            }

            userInfo.update(user, dataToStore);
            loadingStatus.flip();
        })
    })
</script>

{#if !loadingStatus.isLoading}
    <slot />
{/if}