import { CharactersRepository } from '@/repository/CharactersRepository';
import { PageHeader } from '@/components/PageHeader';
import { MainWrapper } from '@/components/MainWrapper';

export default async function Home() {
	const charactersRepository = new CharactersRepository();
	const initialCharacters = await charactersRepository.getCharacters({ page: 1 });

	return (
		<div className="max-w-8xl mx-auto flex min-h-[100dvh] flex-col justify-center gap-4 px-8 pt-16 max-md:px-4 max-md:pt-20 max-md:pb-10">
			<PageHeader
				title="Find connections"
				description="Explore episode connections between characters"
			/>

			<MainWrapper
				initialCharactersFirst={initialCharacters}
				initialCharactersSecond={initialCharacters}
			/>
		</div>
	);
}
