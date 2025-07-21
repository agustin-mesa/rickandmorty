import { Variants } from 'framer-motion';

export const PAGE_ANIMATIONS: {
	[key: string]: Variants;
} = {
	pageVariants: {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
				staggerChildren: 0.2
			}
		}
	},

	loadingVariants: {
		hidden: {
			opacity: 0,
			scale: 0.9
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				ease: 'easeOut'
			}
		}
	},

	characterSectionsVariants: {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
				staggerChildren: 0.1
			}
		}
	},

	episodeSectionsVariants: {
		hidden: {
			opacity: 0,
			y: 30
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
				staggerChildren: 0.15,
				delay: 0.3
			}
		}
	},

	containerVariants: {
		hidden: {
			opacity: 0
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: 'easeOut',
				staggerChildren: 0.1
			}
		}
	}
};
