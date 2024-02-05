'use client'

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import useTextsStore from '@/stores/textsStore';
import useStatsStore from '@/stores/statsStore';
import Profile from '@/components/Profile/Profile';
import TypingArea from '@/components/Typing/TypingArea';
import StatsDisplay from '@/components/Stats/StatsDisplay';
import NextButton from '@/components/Typing/NextButton';
import getRandomEntry from '@/lib/getRandomEntry';
import fetchEntries from '@/lib/fetchEntries';
import initializeDefaultEntries from '@/lib/initializeDefaultEntries';
import styles from './page.module.css';

const Typeometer: React.FC = () => {
	const [user, loading] = useAuthState(auth);
	const [textEntry, setTextEntry] = useState<{ text: string; source: string } | null>(null);
	const [typingStats, setTypingStats] = useState<{ speed: number; accuracy: number } | null>(null);
	const { addStats } = useStatsStore();
	const [reset, setReset] = useState<boolean>(false);

	const onTypingCompletion = (result: { speed: number, accuracy: number }) => {
		setTypingStats(result);
		addStats(result);
		setReset(false);
	};

	const onNextButtonClick = () => {
		setTypingStats(null);
		setTextEntry(getRandomEntry());
		setReset(true);
	};

	const initializeEntries = async () => {
		await fetchEntries();
		// If database has no entries
		if (useTextsStore.getState().entries.length === 0) initializeDefaultEntries();
		setTextEntry(getRandomEntry());
	}
	useEffect(() => {
		if (!loading) {
			initializeEntries();
			setTypingStats(null);
			setReset(true);
		}
	}, [user, loading]);

	return textEntry && (
		<>
			<Profile />
			<main className={styles.mainContainer}>
				<h1>{textEntry.source}</h1>
				<TypingArea
					textToType={textEntry.text}
					onTypingCompletion={onTypingCompletion}
					reset={reset}
				/>
				{typingStats &&
					<>
						<StatsDisplay speed={typingStats.speed} accuracy={typingStats.accuracy} />
						<NextButton onClick={onNextButtonClick} />
					</>
				}
			</main>
		</>
	);
};

export default Typeometer;
