import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }) => <div {...props}>{children}</div>,
		button: ({ children, ...props }) => <button {...props}>{children}</button>,
		span: ({ children, ...props }) => <span {...props}>{children}</span>,
		img: ({ children, ...props }) => <img {...props}>{children}</img>
	},
	AnimatePresence: ({ children }) => <>{children}</>
}));

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: (props) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} alt={props.alt} />;
	}
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn(),
		replace: jest.fn(),
		prefetch: jest.fn()
	}),
	useSearchParams: () => ({
		get: jest.fn()
	})
}));

// Mock axios
jest.mock('axios', () => ({
	create: jest.fn(() => ({
		get: jest.fn(),
		post: jest.fn(),
		put: jest.fn(),
		delete: jest.fn()
	}))
}));

// Mock HTMLMediaElement
Object.defineProperty(window, 'HTMLMediaElement', {
	writable: true,
	value: class MockHTMLMediaElement {
		constructor() {
			this.load = jest.fn();
			this.play = jest.fn(() => Promise.resolve());
			this.pause = jest.fn();
			this.currentTime = 0;
			this.duration = 0;
		}
	}
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
};
