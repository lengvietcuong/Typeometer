import React, { useState, useEffect, useRef } from 'react';
import styles from './TypingArea.module.css';

interface TypingAreaProps {
    textToType: string;
    onTypingCompletion: (result: { speed: number; accuracy: number }) => void;
    reset: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({ textToType, onTypingCompletion, reset }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(-1);
    const [incorrectEntries, setIncorrectEntries] = useState<number>(0);
    const startTime = useRef<number | null>(null);
    const validChars = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/;

    const handleKeyPress = (event: KeyboardEvent) => {
        if (lastCorrectIndex === textToType.length - 1) return;

        if (startTime.current === null) {
            startTime.current = Date.now();
        }

        const typedChar = event.key;
        const isValidInput = validChars.test(typedChar);

        if (isValidInput) {
            handleValidInput(typedChar);
        } else if (event.key === 'Backspace' && currentIndex > 0) {
            if (!event.altKey) handleBackspace();
            else handleWordDelete();
        }
    };

    const handleWordDelete = () => {
        let wordStart = currentIndex - 1;
        while (wordStart > 0 && textToType[wordStart - 1] !== ' ') {
            wordStart--;
        }

        const newCurrentIndex = Math.max(wordStart, 0);
        setCurrentIndex(newCurrentIndex);
        setLastCorrectIndex((prevIndex) => Math.min(prevIndex, newCurrentIndex - 1));
    };

    const handleValidInput = (typedChar: string) => {
        if (currentIndex === textToType.length) {
            return;
        }
        setCurrentIndex((prevIndex) => prevIndex + 1);

        const expectedChar = textToType[currentIndex];
        if (lastCorrectIndex === currentIndex - 1 && typedChar === expectedChar) {
            setLastCorrectIndex((prevIndex) => prevIndex + 1);
            if (currentIndex === textToType.length - 1) {
                const result = calculateStats();
                onTypingCompletion(result);
            }
        } else {
            setIncorrectEntries((prevCount) => prevCount + 1);
        }
    };

    const handleBackspace = () => {
        const newCurrentIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newCurrentIndex);
        setLastCorrectIndex((prevIndex) => Math.min(prevIndex, newCurrentIndex - 1));
    };

    const calculateStats = () => {
        const endTime = Date.now();
        const secondsElapsed = (endTime - startTime.current!) / 1000;
        const totalChars = textToType.length;

        const speed = parseFloat(((totalChars / 5) / (secondsElapsed / 60)).toFixed(2));
        const accuracy = parseFloat(((totalChars / (totalChars + incorrectEntries)) * 100).toFixed(2));
        return { speed, accuracy };
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentIndex]);

    useEffect(() => {
        if (reset) {
            setCurrentIndex(0);
            setLastCorrectIndex(-1);
            setIncorrectEntries(0);
            startTime.current = null;
        }
    }, [reset]);

    const renderCharacter = (char: string) => {
        const isSpace = char === ' ';
        const isTyped = indexToRender < currentIndex;
        const isCorrect = indexToRender <= lastCorrectIndex;
        const hasCursor = indexToRender === currentIndex;
        const isCorrectCursor = lastCorrectIndex === currentIndex - 1;
    
        let charClass = styles.untyped;
        if (isTyped) {
            charClass = isCorrect ? styles.correct : (isSpace ? styles.incorrectSpace : styles.incorrectLetter);
        }
        if (hasCursor) {
            charClass += ' ' + styles.cursor + ' ' +
                (isCorrectCursor ? styles.correctCursor : styles.incorrectCursor);
        }

        return (
            <span key={indexToRender++} className={charClass}>
                {char}
            </span>
        );
    }
    
    const renderWord = (word: string) => (
        <div className={styles.word}>
            {word.split('').map((char) => renderCharacter(char))}
        </div>
    );

    const renderSpace = () => renderCharacter(' ');
    
    const words = textToType.split(/\s+/);
    let indexToRender = 0;

    return (
        <p className={styles.textToType}>
            {words.map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                    {renderWord(word)}
                    {renderSpace()}
                </React.Fragment>
            ))}
        </p>
    );    
};

export default TypingArea;
