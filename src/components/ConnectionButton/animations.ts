import { Variants } from 'framer-motion';

export const CONNECTION_BUTTON_ANIMATIONS: {
	[key: string]: Variants;
} = {
	connectionButtonVariants: {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 20
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
				delay: 0.2
			}
		}
	},

	buttonImageVariants: {
		initial: {
			scale: 1,
			rotate: 0
		},
		disabled: {
			scale: 0.9,
			rotate: 0,
			opacity: 0.5,
			filter: 'grayscale(100%)',
			transition: {
				duration: 0.3,
				ease: 'easeOut'
			}
		},
		enabled: {
			scale: 1,
			rotate: 0,
			opacity: 1,
			filter: 'grayscale(0%)',
			transition: {
				duration: 0.3,
				ease: 'easeOut'
			}
		}
	} as Variants,

	loadingSpinnerVariants: {
		initial: {
			opacity: 0,
			scale: 0.5
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		},
		hidden: {
			opacity: 0,
			scale: 0.5,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		}
	},

	buttonTextVariants: {
		initial: {
			opacity: 0,
			y: 10
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
				ease: 'easeOut'
			}
		},
		loading: {
			opacity: 0.7,
			y: 0,
			transition: {
				duration: 0.2,
				ease: 'easeOut'
			}
		}
	},

	pulseVariants: {
		initial: {
			scale: 1,
			opacity: 1
		},
		pulse: {
			scale: [1, 1.1, 1],
			opacity: [1, 0.8, 1],
			transition: {
				duration: 1,
				ease: 'easeInOut',
				repeat: Infinity,
				times: [0, 0.5, 1]
			}
		}
	}
};
