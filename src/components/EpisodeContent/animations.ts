import { Variants } from 'framer-motion';

export const EPISODE_CONTENT_ANIMATIONS: {
	[key: string]: Variants;
} = {
	episodeContentVariants: {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeOut',
				staggerChildren: 0.1
			}
		}
	},

	episodeLoadingVariants: {
		hidden: {
			opacity: 0,
			scale: 0.9
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: 'easeOut'
			}
		}
	} as Variants,

	noEpisodesVariants: {
		hidden: {
			opacity: 0,
			y: 10,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: 'easeOut'
			}
		}
	},

	episodeListVariants: {
		hidden: {
			opacity: 0
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.3,
				staggerChildren: 0.05,
				delayChildren: 0.1
			}
		}
	}
};
