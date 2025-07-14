import { Variants } from 'framer-motion';

export const characterSectionVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.98
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: 'easeOut',
			staggerChildren: 0.1
		}
	}
};

export const characterListVariants: Variants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			staggerChildren: 0.05,
			delayChildren: 0.2
		}
	}
};

export const tableHeaderVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -10
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

export const paginationVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
			delay: 0.3
		}
	}
};
