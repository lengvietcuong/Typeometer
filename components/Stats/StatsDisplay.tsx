import React, { useState } from 'react';
import Link from 'next/link';
import StatCell from './StatCell';
import styles from './StatsDisplay.module.css';

interface StatsDisplayProps {
    speed: number;
    accuracy: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ speed, accuracy }) => {
    return (
        <>
            <div className={styles.statCells}>
                <StatCell
                    icon="/speed.svg"
                    label="Speed"
                    value={speed}
                    unit="WPM"
                />
                <StatCell
                    icon="/accuracy.svg"
                    label="Accuracy"
                    value={accuracy}
                    unit="%"
                />
            </div>
            <Link href="/stats" className={styles.graphLink}>&gt; Graph</Link>
        </>
    );
};

export default StatsDisplay;
