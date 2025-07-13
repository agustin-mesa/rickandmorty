import { RmCharacterCard } from '@/components/RmCharacterCard';
import { CharactersRepository } from '@/repository/CharactersRepository';
import { use } from 'react';

const charactersRepository = new CharactersRepository();

export default function Home() {
	const characters = use(charactersRepository.getCharacters());
	console.log('✅ | Home | characters:', characters);

	return (
		<div className="mx-auto flex h-[100dvh] max-w-7xl flex-col justify-center gap-4 px-8 pt-20">
			<div className="flex flex-col justify-center">
				<h1 className="text-center text-xl font-bold text-[#CAB580]">Find connections</h1>
				<p className="text-center text-sm text-neutral-300">
					Click to explore episode connections between characters
				</p>
			</div>
			<div className="flex flex-1 gap-6">
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
					<div className="grid max-h-[40vh] grid-cols-2 gap-4 overflow-y-auto px-4 max-xl:grid-cols-1">
						{characters?.results?.map((character) => (
							<RmCharacterCard key={character.id} character={character} />
						))}
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
					<div className="grid max-h-[40vh] grid-cols-2 gap-4 overflow-y-auto px-4 max-xl:grid-cols-1">
						{characters?.results?.map((character) => (
							<RmCharacterCard key={character.id} character={character} />
						))}
					</div>
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
