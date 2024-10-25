<script>
	import '../app.css';
	import { auth, db } from '$lib/firebase/firebase';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { userInfo, loadingStatus } from '$lib/stores/store.svelte';
	import { goto } from '$app/navigation';

	const nonAuthRoutes = ['/'];

	onMount(() => {
		auth.onAuthStateChanged(async (user) => {
			loadingStatus.flip();
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				goto('/');
				loadingStatus.flip();
				return;
			}

			if (user && currentPath === '/') {
				goto('/dashboard');
				loadingStatus.flip();
				return;
			}

			if (!user) {
				loadingStatus.flip();
				return;
			}

			const userRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(userRef);

			let dataToStore;
			if (!docSnap.exists()) {
				dataToStore = {
					email: user.email,
					notes: [],
					reminders: []
				};

				await setDoc(userRef, dataToStore, { merge: true });
			} else {
				dataToStore = docSnap.data();
			}

			userInfo.update(user, dataToStore);
			loadingStatus.flip();
		});
	});
</script>

{#if !loadingStatus.isLoading}
	<slot></slot>
{/if}
