/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectionButton from './ConnectionButton';

// Mock store
jest.mock('../../store/connections', () => ({
	useConnectionsStore: () => ({
		charactersSelected: {
			FIRST: null,
			SECOND: null
		},
		episodesLoading: false,
		calculateFilteredEpisodes: jest.fn()
	})
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>
	},
	AnimatePresence: ({ children }: any) => <>{children}</>
}));

// Mock helper
jest.mock('../../utils/helpers', () => ({
	helpers: {
		cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
	}
}));

describe('ConnectionButton Component', () => {
	it('renders correctly', () => {
		render(<ConnectionButton />);

		expect(screen.getByTestId('connection-button')).toBeInTheDocument();
		expect(screen.getByTestId('connection-button-action')).toBeInTheDocument();
		expect(screen.getByTestId('connection-button-text')).toBeInTheDocument();
	});

	it('shows correct text when no characters selected', () => {
		render(<ConnectionButton />);

		const textElement = screen.getByTestId('connection-button-text');
		expect(textElement).toHaveTextContent('Select both characters');
	});

	it('applies custom className', () => {
		render(<ConnectionButton className="custom-class" />);

		const buttonElement = screen.getByTestId('connection-button');
		expect(buttonElement).toHaveClass('custom-class');
	});
});
