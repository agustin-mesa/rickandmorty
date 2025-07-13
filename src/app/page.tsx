import { RmCharacterCard } from '@/components/RmCharacterCard';
import { RmEpisodeItem } from '@/components/RmEpisodeItem';
import { CharactersRepository } from '@/repository/CharactersRepository';
import { EpisodesRepository } from '@/repository/EpisodesRepository';
import Image from 'next/image';
import { use } from 'react';

const charactersRepository = new CharactersRepository();
const episodesRepository = new EpisodesRepository();

export default function Home() {
	const characters = use(charactersRepository.getCharacters());
	const episodes = use(episodesRepository.getEpisodes());

	return (
		<div className="max-w-8xl mx-auto flex min-h-[100dvh] flex-col justify-center gap-4 px-8 pt-10">
			<div className="flex flex-col justify-center">
				<h1 className="text-center text-xl font-bold text-[#CAB580]">Find connections</h1>
				<p className="text-center text-sm text-neutral-300">
					Click to explore episode connections between characters
				</p>
			</div>
			<div className="flex gap-6">
				<div className="flex flex-1 flex-col gap-2">
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

				<div className="flex flex-col items-center justify-center gap-2">
					<Image
						src="/assets/button-plus.svg"
						alt="plus"
						width={80}
						height={80}
						draggable={false}
						className="cursor-pointer transition-all duration-300 select-none hover:brightness-95 active:scale-95"
					/>
				</div>

				<div className="flex flex-1 flex-col gap-2">
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
			<div className="flex gap-4">
				<div className="flex flex-1 flex-col gap-2">
					<div className="relative flex flex-col items-center justify-center">
						<img
							src="/assets/table-03.svg"
							alt="table-03"
							className="pointer-events-none h-full w-full object-cover select-none"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<h3 className="text-md font-bold text-[#CAB580]">Only Rick Episodes</h3>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
							<div className="h-full flex-1 bg-[#5A7580] p-2">
								<div className="relative h-full flex-1 bg-[#FFEFD8]">
									<div className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2">
										{episodes?.results?.map((episode) => (
											<RmEpisodeItem key={episode.id} episode={episode} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-2">
					<div className="relative flex flex-col items-center justify-center">
						<img
							src="/assets/table-04.svg"
							alt="table-04"
							className="pointer-events-none h-full w-full object-cover select-none"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<h3 className="text-md font-bold text-[#CAB580]">Shared Episodes</h3>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
							<div className="h-full flex-1 bg-[#5A7580] p-2">
								<div className="relative h-full flex-1 bg-[#FFEFD8]">
									<div className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2">
										{episodes?.results?.map((episode) => (
											<RmEpisodeItem key={episode.id} episode={episode} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-2">
					<div className="relative flex flex-col items-center justify-center">
						<img
							src="/assets/table-05.svg"
							alt="table-05"
							className="pointer-events-none h-full w-full object-cover select-none"
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<h3 className="text-md font-bold text-[#CAB580]">
								Only Morty Episodes
							</h3>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
							<div className="h-full flex-1 bg-[#5A7580] p-2">
								<div className="relative h-full flex-1 bg-[#FFEFD8]">
									<div className="scrollbar-rick-morty flex max-h-[20vh] flex-col gap-2 overflow-y-auto p-2">
										{episodes?.results?.map((episode) => (
											<RmEpisodeItem key={episode.id} episode={episode} />
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
