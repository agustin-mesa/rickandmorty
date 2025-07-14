import { CharacterImage } from '@/components/CharacterImage';
import { useConnectionsStore } from '@/store/connections';

interface CharacterImageDisplayProps {
	position: 'FIRST' | 'SECOND';
	showCondition: 'FIRST' | 'SECOND' | 'BETWEEN';
}

export default function CharacterImageDisplay({
	position,
	showCondition
}: CharacterImageDisplayProps) {
	const { charactersSelected } = useConnectionsStore();

	const character = charactersSelected?.[position];
	if (!character) return null;

	const shouldShow = showCondition === position || showCondition === 'BETWEEN';
	if (!shouldShow) return null;

	const rotationClass = position === 'FIRST' ? '-rotate-6' : 'rotate-6';

	return <CharacterImage src={character.image} alt={character.name} className={rotationClass} />;
}
