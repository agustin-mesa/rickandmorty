import { Variants } from 'framer-motion';

export const navButtonVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
};

export const navButtonHoverVariants: Variants = {
	initial: {
		scale: 1,
		x: 0
	},
	hover: {
		scale: 1.1,
		x: 0,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	},
	tap: {
		scale: 0.95,
		x: 0,
		transition: {
			duration: 0.1,
			ease: 'easeOut'
		}
	}
};

export const navButtonDirectionVariants: Variants = {
	initial: {
		x: 0,
		rotate: 0
	},
	hover: {
		x: 0,
		rotate: 0,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	},
	hoverPrevious: {
		x: -2,
		rotate: -5,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	},
	hoverNext: {
		x: 2,
		rotate: 5,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
};
