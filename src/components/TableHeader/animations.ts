import { Variants } from 'framer-motion';

export const tableHeaderVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -15,
		scale: 0.98
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
			staggerChildren: 0.1
		}
	}
};

export const tableImageVariants: Variants = {
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
	},
	hover: {
		scale: 1.05,
		rotate: 2,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
};

export const tableTitleVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -10
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut'
		}
	}
};
