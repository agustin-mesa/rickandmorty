import { Variants } from 'framer-motion';

export const characterCardVariants: Variants = {
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
