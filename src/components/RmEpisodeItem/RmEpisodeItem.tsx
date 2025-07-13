import { Episode } from '@/repository/EpisodesRepository';

interface RmEpisodeItemProps {
	episode: Episode;
}

export default function RmEpisodeItem({ episode }: RmEpisodeItemProps) {
	return (
		<div className="flex h-full flex-1 flex-col px-2 py-1 transition-all duration-300 hover:bg-[#FFE0B4]">
			<h3 className="line-clamp-2 text-sm leading-6 font-bold text-neutral-800">
				{episode.episode}: {episode.name}
			</h3>

			<div className="flex w-max items-center gap-2">
				<span className="text-xs text-neutral-800 capitalize">{episode.air_date}</span>
			</div>
		</div>
	);
}
