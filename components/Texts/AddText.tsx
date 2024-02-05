'use client'

import React, { useState } from 'react';
import useTextsStore from '@/stores/textsStore';
import styles from './AddText.module.css';

const AddText: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [showCheckmark, setShowCheckmark] = useState<boolean>(false);
    const { addEntry } = useTextsStore();

    const processString = (input: string): string => {
        const replacements: { [key: string]: string } = {
            '“': '"',
            '”': '"',
            '‘': "'",
            '’': "'",
            '`': "'",
            '´': "'",
            '–': '-',
            '\u2014': ' - ',
            '  ': ' ',
        };

        let processedString = input.trim();
        processedString = processedString.split('\n').join(' ');

        for (const [symbol, replacement] of Object.entries(replacements)) {
            processedString = processedString.split(symbol).join(replacement);
        }

        return processedString;
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSource(event.target.value);
    };

    const handleAddEntry = () => {
        if (!text) return;

        const processedText = processString(text);
        const processedSource = processString(source);

        addEntry(processedText, processedSource);
        setText('');
        setSource('');
        setShowCheckmark(true);
        setTimeout(() => setShowCheckmark(false), 1000);
    };

    return (
        <>
            <h2>Add Text</h2>
            <div className={styles.addTextContainer}>
                <textarea
                    id={styles.text}
                    placeholder="Enter text..."
                    value={text}
                    onChange={handleTextChange}
                    required
                />
                <input
                    id={styles.source}
                    type="text"
                    placeholder="Enter source (optional)"
                    value={source}
                    onChange={handleSourceChange}
                />
                <button
                    id={styles.addButton}
                    onClick={handleAddEntry}
                    className={styles.addButton}
                >
                    {showCheckmark ? '✔' : 'Add'}
                </button>
            </div>
        </>
    );
};

export default AddText;
