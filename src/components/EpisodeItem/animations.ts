import { Variants } from 'framer-motion';

export const episodeItemVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -20,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut'
		}
	}
};

export const episodeTitleVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 5
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: 'easeOut',
			delay: 0.1
		}
	}
};

export const episodeInfoVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 5
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
			ease: 'easeOut',
			delay: 0.2
		}
	}
};
