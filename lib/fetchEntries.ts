import { collection, getDocs } from 'firebase/firestore/lite';
import { db, auth } from './firebase';
import { Entry } from '../stores/textsStore';
import useTextsStore from '../stores/textsStore';

const fetchEntries = async (): Promise<void> => {
    const user = auth.currentUser;
    if (user) {
        const querySnapshot = await getDocs(collection(db, user.uid));
        const entries = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Entry);
        useTextsStore.setState({ entries: entries });
    }
}

export default fetchEntries;