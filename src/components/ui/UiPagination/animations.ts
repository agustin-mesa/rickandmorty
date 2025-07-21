import { Variants } from 'framer-motion';

export const UI_PAGINATION_ANIMATIONS: {
	[key: string]: Variants;
} = {
	paginationVariants: {
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
				staggerChildren: 0.05
			}
		}
	},

	paginationButtonVariants: {
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
		},
		hover: {
			scale: 1.1,
			y: -2,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		},
		tap: {
			scale: 0.95,
			y: 0,
			transition: {
				duration: 0.1,
				ease: 'easeOut'
			}
		}
	} as Variants,

	loadingVariants: {
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
	},

	pageNumberVariants: {
		initial: {
			scale: 1,
			opacity: 1
		},
		active: {
			scale: 1.1,
			opacity: 1,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		},
		inactive: {
			scale: 1,
			opacity: 0.7,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		}
	}
};
