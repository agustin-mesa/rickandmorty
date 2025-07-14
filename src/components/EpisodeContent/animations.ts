import { Variants } from 'framer-motion';

export const episodeContentVariants: Variants = {
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
};

export const episodeLoadingVariants: Variants = {
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
};

export const noEpisodesVariants: Variants = {
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
};

export const episodeListVariants: Variants = {
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
};
