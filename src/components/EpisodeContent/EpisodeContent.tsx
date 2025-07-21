import { EpisodeItem } from '@/components/EpisodeItem';
import { Episode } from '@/repository/EpisodesRepository';

interface EpisodeContentProps {
	episodes: Episode[];
	loading: boolean;
	hasSelectedCharacters: boolean;
}

export default function EpisodeContent({
	episodes,
	loading,
	hasSelectedCharacters
}: EpisodeContentProps) {
	if (loading) {
		return (
			<div className="flex items-center justify-center p-4">
				<div className="text-sm text-neutral-600">Loading episodes...</div>
			</div>
		);
	}

	if (episodes.length === 0) {
		const message = hasSelectedCharacters
			? 'No episodes where only this character appears.'
			: 'Select characters to discover their episodes!';

		return (
			<div className="flex items-center justify-center p-4">
				<div className="text-center text-xs text-neutral-600">{message}</div>
			</div>
		);
	}

	return (
		<>
			{episodes.map((episode) => (
				<EpisodeItem key={episode.id} episode={episode} />
			))}
		</>
	);
}
