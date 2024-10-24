<script lang="ts">
	import { auth, db } from "$lib/firebase";
	import { doc, getDoc, setDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	import { authStore } from "../stores/store.svelte";

    const nonAuthRoutes = ["/"];
    const authStoreInstance = authStore();

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            const currentPath = window.location.pathname;

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (user && currentPath === '/') {
                window.location.href = "/dashboard";
                return;
            }

            if (!user)
                return;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            let dataToStore;
            if (!docSnap.exists()) {
                const userRef = doc(db, "user", user.uid);

                dataToStore = {
                    email: user.email
                }

                await setDoc(
                    userRef,
                    dataToStore,
                    { merge: true }
                );
            } else {
                const userData = docSnap.data();
                dataToStore = userData;
            }

            authStoreInstance.update(user, false, dataToStore);
        })
    })
</script>

<slot />