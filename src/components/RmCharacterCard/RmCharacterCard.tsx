import Image from 'next/image';
import { helpers } from '@/utils/helpers';
import { Character } from '@/repository/CharactersRepository';

interface RmCharacterCardProps {
	character: Character;
}

export default function RmCharacterCard({ character }: RmCharacterCardProps) {
	return (
		<div className="flex gap-6">
			<div className="relative">
				<div className="relative z-10 border border-neutral-700 bg-neutral-200 p-2 pb-7">
					<Image
						src={character.image}
						alt={character.name}
						width={130}
						height={130}
						className="pointer-events-none border border-neutral-700 select-none"
					/>
				</div>
				<div className="absolute inset-0 z-0 mt-1 -mr-2 -mb-1 ml-2 rotate-3 border border-neutral-700 bg-neutral-300" />
			</div>
			<div className="flex-1 border border-neutral-700 bg-[#475A62] pr-1 pb-1">
				<div className="h-full flex-1 bg-[#5A7580] p-2">
					<div className="relative h-full flex-1 bg-[#FFEFD8]">
						<div className="flex h-full flex-1 p-2">
							<div className="flex h-full flex-1 flex-col justify-between border-r border-b border-l border-amber-950/30 px-2 pb-2">
								<h1 className="text-xl font-bold text-neutral-800">
									{character.name}
								</h1>

								<div className="flex flex-col gap-2">
									<span className="text-sm text-neutral-800">
										{character.species}
									</span>
									<div className="flex items-center gap-2">
										<div className="flex size-5 items-center justify-center rounded-full border bg-[#84683D]">
											<div
												className={helpers.cn(
													'size-3 rounded-full border',
													helpers.character.getStatusColor(
														character.status
													)
												)}
											></div>
										</div>
										<span className="text-sm text-neutral-800">
											{character.status}
										</span>
									</div>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-2 border-b border-amber-950/30 px-2 pb-2">
								<div className="flex flex-col">
									<h4 className="text-sm text-neutral-500">Location</h4>
									<span className="text-sm font-bold text-neutral-800">
										{character.location.name}
									</span>
								</div>
								<div className="flex flex-col">
									<h4 className="text-sm text-neutral-500">Episodes</h4>
									<span className="text-sm font-bold text-neutral-800">
										{character.episode.length}
									</span>
								</div>
							</div>
						</div>
						<Image
							src="/assets/line-corner-01.svg"
							alt="line-corner-01"
							width={20}
							height={20}
							className="pointer-events-none absolute top-2 right-2 select-none"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
