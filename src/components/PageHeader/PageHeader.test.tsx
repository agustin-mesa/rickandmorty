import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeader from './PageHeader';

describe('PageHeader Component', () => {
	const defaultProps = {
		title: 'Test Title',
		description: 'Test Description'
	};

	it('renders correctly with required props', () => {
		render(<PageHeader {...defaultProps} />);

		expect(screen.getByTestId('page-header')).toBeInTheDocument();
		expect(screen.getByTestId('page-header-title')).toBeInTheDocument();
		expect(screen.getByTestId('page-header-description')).toBeInTheDocument();
	});

	it('displays the correct title text', () => {
		render(<PageHeader {...defaultProps} />);

		const titleElement = screen.getByTestId('page-header-title');
		expect(titleElement).toHaveTextContent('Test Title');
	});

	it('displays the correct description text', () => {
		render(<PageHeader {...defaultProps} />);

		const descriptionElement = screen.getByTestId('page-header-description');
		expect(descriptionElement).toHaveTextContent('Test Description');
	});
});
