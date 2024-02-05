import { collection, addDoc } from 'firebase/firestore/lite';
import { db, auth } from './firebase';
import { Entry } from '../stores/textsStore';
import defaultEntries from "../public/texts.json"
import useTextsStore from '../stores/textsStore';

const initializeDefaultEntries = async (): Promise<void> => {
    const user = auth.currentUser;
    let entries: Entry[] = [];

    if (!user) {
        entries = defaultEntries.map(({ text, source }, index) => ({ text, source, id: index.toString() }));
    } else {
        for (const defaultEntry of defaultEntries) {
            const { text, source } = defaultEntry;
            const docRef = await addDoc(collection(db, user.uid), { text, source });
            const id = docRef.id;
            entries.push({ text, source, id });
        }
    }

    useTextsStore.setState({ entries: entries });
}

export default initializeDefaultEntries;
