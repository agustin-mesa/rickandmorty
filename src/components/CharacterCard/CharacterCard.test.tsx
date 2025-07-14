/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCard from './CharacterCard';
import { EnumCharacterStatus } from '@/repository/CharactersRepository';

// Mock hook
jest.mock('../../hooks/useCharacterCard', () => ({
	useCharacterCard: () => ({
		handleCharacterClick: jest.fn()
	})
}));

// Mock store
jest.mock('../../store/connections', () => ({
	useConnectionsStore: () => ({
		charactersSelected: {
			FIRST: null,
			SECOND: null
		}
	})
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>
	}
}));

// Mock helper
jest.mock('../../utils/helpers', () => ({
	helpers: {
		cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
		character: {
			getStatusColor: () => 'bg-green-600'
		}
	}
}));

// Mock CharacterImage component
jest.mock('../CharacterImage', () => ({
	CharacterImage: ({ src, alt }: any) => <img src={src} alt={alt} />
}));

const mockCharacter = {
	id: 1,
	name: 'Rick Sanchez',
	status: EnumCharacterStatus.Alive,
	species: 'Human',
	type: '',
	gender: 'Male',
	origin: {
		name: 'Earth',
		url: 'https://example.com'
	},
	location: {
		name: 'Earth',
		url: 'https://example.com'
	},
	image: 'https://example.com/rick.jpg',
	episode: ['S01E01']
};

describe('CharacterCard Component', () => {
	it('renders correctly', () => {
		render(<CharacterCard character={mockCharacter} positionCharacter="FIRST" />);

		expect(screen.getByTestId('character-card-1')).toBeInTheDocument();
		expect(screen.getByTestId('character-name-1')).toBeInTheDocument();
		expect(screen.getByTestId('character-species-1')).toBeInTheDocument();
		expect(screen.getByTestId('character-status-1')).toBeInTheDocument();
	});

	it('displays character information correctly', () => {
		render(<CharacterCard character={mockCharacter} positionCharacter="FIRST" />);

		expect(screen.getByTestId('character-name-1')).toHaveTextContent('Rick Sanchez');
		expect(screen.getByTestId('character-species-1')).toHaveTextContent('Human');
		expect(screen.getByTestId('character-status-1')).toHaveTextContent('Alive');
	});

	it('shows character image with correct alt text', () => {
		render(<CharacterCard character={mockCharacter} positionCharacter="FIRST" />);

		const image = screen.getByAltText('Rick Sanchez');
		expect(image).toHaveAttribute('alt', 'Rick Sanchez');
	});
});
