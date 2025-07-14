'use client';

import Image from 'next/image';

export default function ConnectionButton() {
	const handleConnectionClick = () => {
		// TODO: Implementar lógica de conexión de personajes
		console.log('Connection button clicked');
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Image
				src="/assets/button-plus.svg"
				alt="plus"
				width={80}
				height={80}
				draggable={false}
				className="cursor-pointer transition-all duration-300 select-none hover:brightness-95 active:scale-95"
				onClick={handleConnectionClick}
			/>
		</div>
	);
}
