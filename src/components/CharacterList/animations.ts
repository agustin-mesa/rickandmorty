import { Variants } from 'framer-motion';

export const characterListVariants: Variants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
};

export const characterListItemVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut'
		}
	}
};

export const noCharactersVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.9
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: 'easeOut'
		}
	}
};
