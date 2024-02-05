import { create } from 'zustand';

interface StatsStore {
	stats: { speed: number; accuracy: number }[];
	addStats: (stats: { speed: number; accuracy: number }) => void;
}

const useStatsStore = create<StatsStore>((set) => ({
	stats: [],
	addStats: (stats) =>
		set((state) => ({ stats: [...state.stats, stats] })),
}));

export default useStatsStore;
