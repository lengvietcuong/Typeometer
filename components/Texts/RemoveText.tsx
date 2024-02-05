'use client'

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Entry } from '@/stores/textsStore';
import useTextsStore from '@/stores/textsStore';
import fetchEntries from '@/lib/fetchEntries';
import styles from './RemoveText.module.css';

interface RowProps {
    index: number;
    entry: Entry;
    expanded: boolean;
    onRowClick: () => void;
    onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Row: React.FC<RowProps> = ({ entry, index, expanded, onRowClick, onRemove }) => {
    const fullText = `${index + 1}. ${entry.text}`;
    const displayString =
        fullText.length <= 70 || expanded ? fullText : `${fullText.slice(0, 67)}...`;

    return (
        <div className={`${styles.rowContainer} ${expanded ? styles.expandedRow : ''}`} onClick={onRowClick}>
            <p>
                {displayString}{expanded && <p><em>{entry.source}</em></p>}
            </p>
            <button onClick={onRemove} className={styles.removeButton}>
                X
            </button>
        </div>
    );
};

const RemoveText: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const { entries, deleteEntry } = useTextsStore();
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        if (entries.length === 0 && !loading) fetchEntries();
    }, [loading]);

    const onRowClick = (index: number) => {
        setExpandedRow((prev) => (prev === index ? null : index));
    };

    const handleRemove = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        const id = entries[index].id;
        deleteEntry(id);
    }

    const handleRemoveAll = () => {
        entries.forEach((entry) => {
            deleteEntry(entry.id);
        });
    }

    return entries.length > 0 && (
        <>
            <h2>Remove Text</h2>
            <div className={styles.textsContainer}>
                {entries.map((entry, index) => (
                    <Row
                        key={index}
                        index={index}
                        entry={entry}
                        expanded={index === expandedRow}
                        onRowClick={() => onRowClick(index)}
                        onRemove={(event) => handleRemove(index, event)}
                    />
                ))}
            </div>
            {entries.length >= 2 &&
                <button onClick={handleRemoveAll} className={styles.removeAllButton}>
                    Remove All
                </button>
            }
        </>
    );
};

export default RemoveText;
