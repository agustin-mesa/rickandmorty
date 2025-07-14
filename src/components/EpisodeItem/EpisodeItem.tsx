import { motion } from 'framer-motion';
import { Episode } from '@/repository/EpisodesRepository';
import { episodeTitleVariants, episodeInfoVariants } from './animations';

interface EpisodeItemProps {
	episode: Episode;
}

export default function EpisodeItem({ episode }: EpisodeItemProps) {
	return (
		<div className="flex h-full flex-1 flex-col px-2 py-1 transition-all duration-300 hover:bg-[#FFE0B4]">
			<motion.h3
				className="line-clamp-2 text-sm leading-6 font-bold text-neutral-800"
				variants={episodeTitleVariants}
				initial="hidden"
				animate="visible"
			>
				{episode.episode}: {episode.name}
			</motion.h3>

			<motion.div
				className="flex w-max items-center gap-2"
				variants={episodeInfoVariants}
				initial="hidden"
				animate="visible"
			>
				<span className="text-xs text-neutral-800 capitalize">{episode.air_date}</span>
			</motion.div>
		</div>
	);
}
