import { Variants } from 'framer-motion';

export const CHARACTER_SECTION_ANIMATIONS: {
	[key: string]: Variants;
} = {
	characterListVariants: {
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
	},

	tableHeaderVariants: {
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
	},

	paginationVariants: {
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
	}
};
