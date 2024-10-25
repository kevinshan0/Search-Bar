import { auth, db } from "$lib/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, setDoc, type DocumentData } from "firebase/firestore";

function createUserInfoStore() {
    let user: User|undefined = $state();
    let data: DocumentData = $state({
        email: "",
        notes: [],
        reminders: [],
    });

    return {
        get user() { return user },
        get data() { return data },
        update: async (user_param: User, data_param: DocumentData) => {
            user = user_param;
            data = data_param;
        },
        addNote: (note: {}) => {
            let newData = {
                email: data.email,
                notes: [...data.notes, note],
                reminders: [...data.reminders]
            }

            data = newData;

            if (user === undefined)
                return;

            const userRef = doc(db, "users", user.uid);
            setDoc(userRef, data);
        },
        addReminder: (reminder: {}) => {
            let newData = {
                email: data.email,
                notes: [...data.notes],
                reminders: [...data.reminders, reminder]
            }

            data = newData;

            if (user === undefined)
                return;

            const userRef = doc(db, "users", user.uid);
            setDoc(userRef, data);
        }
    }
}

function createInputStore() {
    let input: string = $state("");

    return {
        set: (newInput: string) => {
            input = newInput;

            if (input === "" || input === undefined || userInfo.user === undefined)
                return;

            let keywords = ["note", "remind", "gpt", "help"];
            let inputArray = newInput.split(" ");
            let keyword = inputArray.splice(0, 1)[0];
            let rest = inputArray;
    
            if (!keywords.includes(keyword)) {
                window.location.href = `https://www.google.com`;
                return;
            }

            switch (keyword.toLowerCase()) {
                case "note":
                    if (rest.length < 2)
                        return;

                    userInfo.addNote({
                        title: rest.splice(0, 1)[0],
                        content: rest.join(" ")
                    });
    
                    return;
                case "remind":
                    if (rest.length < 2)
                        return;
    
                    userInfo.addReminder({
                        event: rest.splice(0, 1)[0],
                        info: rest.join(" ")
                    });
    
                    return;
                case "gpt":
                    //gptHandler();
                    return;
                case "help":
                    //printHelp();
                    return;
            }
        }
    } 
}

function createLoadingStatusStore() {
    let isLoading = $state(false);
    
    return {
        get isLoading() { return isLoading },
        flip: () => { isLoading = !isLoading }
    }
}

export const userInfo = createUserInfoStore();
export const input = createInputStore();
export const loadingStatus = createLoadingStatusStore();

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