import useTextsStore from "@/stores/textsStore";
import defaultEntries from "@/public/texts.json";


const getRandomEntry = () => {
    const entries = useTextsStore.getState().entries.length > 0
        ? useTextsStore.getState().entries
        : defaultEntries;

    const randomIndex = Math.floor(Math.random() * entries.length);
    const randomEntry = entries[randomIndex];

    return randomEntry;
}

export default getRandomEntry;