import { RmCharacterCard } from '@/components/RmCharacterCard';
import { Character, EnumCharacterStatus } from '@/repository/CharactersRepository';

export default function Home() {
	// Datos de ejemplo del personaje
	const characterData: Character = {
		name: 'Summer Smith',
		species: 'Human',
		status: EnumCharacterStatus.Alive,
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		location: {
			name: 'Earth (Replacement Dimension)',
			url: 'https://rickandmortyapi.com/api/location/1'
		},
		episode: Array(50).fill('') // Simulando 50 episodios
	};

	return (
		<div className="mx-auto flex h-[100dvh] max-w-7xl flex-col justify-center px-10 pt-20">
			<div className="flex flex-1 gap-10">
				<div className="flex flex-1 flex-col gap-4">
					<div className="relative flex flex-col items-center justify-center">
						<img
							src="/assets/table-01.svg"
							alt="table-01"
							className="pointer-events-none h-full w-full object-cover select-none"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<h1 className="text-2xl font-bold text-[#CAB580]">CHARACTER #1</h1>
						</div>
					</div>
					<div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
						{/* Character Card */}
						<RmCharacterCard character={characterData} />
						<RmCharacterCard character={characterData} />
						<RmCharacterCard character={characterData} />
						<RmCharacterCard character={characterData} />
						<RmCharacterCard character={characterData} />
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-4">
					<div className="relative flex flex-col items-center justify-center">
						<img
							src="/assets/table-02.svg"
							alt="table-02"
							className="pointer-events-none h-full w-full object-cover select-none"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<h1 className="text-2xl font-bold text-[#CAB580]">CHARACTER #2</h1>
						</div>
					</div>
					<div></div>
				</div>
			</div>
			<div className="flex gap-10">
				<div className="flex flex-1 flex-col gap-4 bg-blue-500">
					<div>asd</div>
					<div></div>
				</div>
				<div className="flex flex-1 flex-col gap-4 bg-blue-500">
					<div>asd</div>
					<div></div>
				</div>
				<div className="flex flex-1 flex-col gap-4 bg-blue-500">
					<div>asd</div>
					<div></div>
				</div>
			</div>
		</div>
	);
}
