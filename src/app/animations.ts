import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
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
};

export const loadingVariants: Variants = {
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
};

export const characterSectionsVariants: Variants = {
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
};

export const episodeSectionsVariants: Variants = {
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
};

export const containerVariants: Variants = {
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
};
