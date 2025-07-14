import { Variants } from 'framer-motion';

export const episodeSectionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
			delay: 0.4
		}
	}
};

export const episodeContentVariants: Variants = {
	hidden: {
		opacity: 0,
		height: 0
	},
	visible: {
		opacity: 1,
		height: 'auto',
		transition: {
			duration: 0.4,
			ease: 'easeOut',
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
};

export const episodeItemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -20,
		scale: 0.9
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut'
		}
	},
	hover: {
		scale: 1.02,
		x: 5,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
};

export const episodeLoadingVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8
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

export const episodeHeaderVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -15
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut'
		}
	}
};

export const episodeCounterVariants: Variants = {
	initial: {
		scale: 1,
		opacity: 1
	},
	update: {
		scale: [1, 1.2, 1],
		opacity: [1, 0.7, 1],
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			times: [0, 0.3, 1]
		}
	}
};

export const noEpisodesVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut'
		}
	}
};
