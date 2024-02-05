'use client';

import React from 'react';
import Link from 'next/link';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';
import useStatsStore from '@/stores/statsStore';
import styles from './page.module.css';

interface GraphProps {
	data: number[];
	label: string;
	lineColor: string;
	fillColor: string;
}

const calculateStats = (data: number[]) => {
	const average = data.reduce((sum, value) => sum + value, 0) / data.length;
	const standardDeviation = Math.sqrt(
		data.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / data.length
	);
	const max = Math.max(...data);

	return { average, standardDeviation, max };
};

const Graph: React.FC<GraphProps> = ({ data, label, lineColor, fillColor }) => {
	const stats = calculateStats(data);

	return (
		<div className={styles.statsContainer}>
			<div className={styles.graphContainer}>
				<Line
					data={{
						labels: Array.from({ length: data.length }, (_, i) => (i + 1).toString()),
						datasets: [{
							label,
							data,
							fill: true,
							borderColor: lineColor,
							backgroundColor: fillColor
						}],
					}}
				/>
			</div>
			<div className={styles.statsInfo}>
				<div className={styles.stat}>
					<p>Average: </p>
					<p style={{ color: lineColor }}>{stats.average.toFixed(2)}</p>
				</div>
				<br />
				<div className={styles.stat}>
					<p>Standard deviation: </p>
					<p style={{ color: lineColor }}>{stats.standardDeviation.toFixed(2)}</p>
				</div>
				<br />
				<div className={styles.stat}>
					<p>Max: </p>
					<p style={{ color: lineColor }}>{stats.max.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
};

const StatsPage: React.FC = () => {
	const { stats } = useStatsStore();
	const speeds: number[] = stats.map(item => item.speed);
	const accuracies: number[] = stats.map(item => item.accuracy);

	return (
		<>
			<Link className="backButton" href="/">&#x2b05;</Link>
			<h1 className={styles.statsTitle}>Statistics</h1>
			<Graph
				data={speeds}
				label='Speed (WPM)'
				lineColor='rgba(0, 184, 255, 1)'
				fillColor='rgba(0, 184, 255, 0.1)'
			/>
			<Graph
				data={accuracies}
				label='Accuracy (%)'
				lineColor='rgba(214, 50, 255, 1)'
				fillColor='rgba(214, 50, 255, 0.1)'
			/>
		</>
	);
};

export default StatsPage;