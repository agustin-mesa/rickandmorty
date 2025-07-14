import { CharacterSection } from '@/components/CharacterSection';
import { ConnectionButton } from '@/components/ConnectionButton';
import { EpisodeSection } from '@/components/EpisodeSection';
import { PageHeader } from '@/components/PageHeader';
import { CharactersRepository } from '@/repository/CharactersRepository';
import { EpisodesRepository } from '@/repository/EpisodesRepository';
import { use } from 'react';

const charactersRepository = new CharactersRepository();
const episodesRepository = new EpisodesRepository();

export default function Home() {
	const characters = use(charactersRepository.getCharacters());
	const episodes = use(episodesRepository.getEpisodes());

	if (!characters?.results || !episodes?.results) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-8xl mx-auto flex min-h-[100dvh] flex-col justify-center gap-4 px-8 pt-10">
			<PageHeader
				title="Find connections"
				description="Click to explore episode connections between characters"
			/>

			<div className="flex gap-6">
				<CharacterSection
					characters={characters.results}
					positionCharacter="FIRST"
					title="CHARACTER #1"
					imageSrc="/assets/table-01.svg"
					imageAlt="table-01"
				/>

				<ConnectionButton />

				<CharacterSection
					characters={characters.results}
					positionCharacter="SECOND"
					title="CHARACTER #2"
					imageSrc="/assets/table-02.svg"
					imageAlt="table-02"
				/>
			</div>

			<div className="flex gap-4">
				<EpisodeSection
					episodes={episodes.results}
					imageSrc="/assets/table-03.svg"
					imageAlt="table-03"
					positionCharacter="FIRST"
				/>

				<EpisodeSection
					episodes={episodes.results}
					imageSrc="/assets/table-04.svg"
					imageAlt="table-04"
					positionCharacter="BETWEEN"
				/>

				<EpisodeSection
					episodes={episodes.results}
					imageSrc="/assets/table-05.svg"
					imageAlt="table-05"
					positionCharacter="SECOND"
				/>
			</div>
		</div>
	);
}
