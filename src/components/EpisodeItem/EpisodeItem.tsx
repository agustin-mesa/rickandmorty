import { Episode } from '@/repository/EpisodesRepository';

interface EpisodeItemProps {
	episode: Episode;
}

export default function EpisodeItem({ episode }: EpisodeItemProps) {
	return (
		<div className="hover:bg-card-hover flex h-full flex-1 flex-col px-2 py-1 transition-all duration-300">
			<h3 className="line-clamp-2 text-sm leading-6 font-bold text-neutral-800">
				{episode.episode}: {episode.name}
			</h3>

			<div className="flex w-max items-center gap-2">
				<span className="text-xs text-neutral-800 capitalize">{episode.air_date}</span>
			</div>
		</div>
	);
}
