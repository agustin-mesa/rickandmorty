import { Variants } from 'framer-motion';

export const PAGE_HEADER_ANIMATIONS: {
	[key: string]: Variants;
} = {
	pageHeaderVariants: {
		hidden: {
			opacity: 0,
			y: -30,
			scale: 0.95
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
				staggerChildren: 0.2
			}
		}
	},

	titleVariants: {
		hidden: {
			opacity: 0,
			y: -20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut'
			}
		}
	} as Variants,

	descriptionVariants: {
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
				delay: 0.1
			}
		}
	}
};
