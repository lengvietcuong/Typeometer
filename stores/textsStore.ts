import { create } from 'zustand';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { db, auth } from '../lib/firebase';

export interface Entry {
    text: string;
    source: string;
    id: string;
}

interface TextsStore {
    entries: Entry[];
    addEntry: (text: string, source: string) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
}

const useTextsStore = create<TextsStore>((set) => ({
    entries: [],
    addEntry: async (text: string, source: string) => {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = await addDoc(collection(db, user.uid), { text, source });
        const id = docRef.id;
        set((state) => ({ entries: [...state.entries, { text, source, id }] }));
    },
    deleteEntry: async (id: string) => {
        const user = auth.currentUser;
        if (!user) return;
        await deleteDoc(doc(db, user.uid, id));
        set((state) => ({ entries: state.entries.filter((entry) => entry.id !== id) }));
    },
}));

export default useTextsStore;