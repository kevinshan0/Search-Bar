import { auth } from "$lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";

export function createUserInfoStore() {
    let user = $state();
    let data = $state();

    return {
        get user() { return user },
        get data() { return data },
        update: (user_param: User, data_param: DocumentData) => {
            user = user_param;
            data = data_param;
        }
    }
}

export function createLoadingStatusStore() {
    let isLoading = $state(false);
    
    return {
        get isLoading() { return isLoading },
        flip: () => { isLoading = !isLoading }
    }
}

export const authHandler = {
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