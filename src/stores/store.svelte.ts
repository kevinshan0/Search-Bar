import { auth } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";

export function authStore() {
    let user = $state();
    let loading = $state(true);
    let data = $state();

    return {
        update: (user: User, loading: boolean, data: DocumentData) => {
            user = user;
            loading = loading;
            data = data;
        },
    }
}

export function authHandler() {
    return {
        signup: async (email: string, password: string) => {
            await createUserWithEmailAndPassword(auth, email, password);
        },
        signin: async (email: string, password: string) => {
            await signInWithEmailAndPassword(auth, email, password);
        },
        logout: async () => {
            await signOut(auth);
        }
    }
}