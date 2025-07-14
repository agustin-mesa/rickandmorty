import Image from 'next/image';

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
	return (
		<>
			<img
				src="/assets/column.svg"
				alt="column-left"
				className="pointer-events-none fixed left-0 z-50 h-full object-cover select-none"
			/>
			<Image
				src="/assets/detail-01.svg"
				alt="detail-01"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-4 left-0 z-40 select-none"
			/>
			<div className="fixed top-0 bottom-0 left-0 flex">
				<div className="h-full w-10 bg-neutral-700"></div>
				<div className="h-full w-6 bg-green-100/10"></div>
			</div>
			<header className="absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-center bg-[#69533B]">
				<Image
					src="/assets/brand/logo.svg"
					alt="logo"
					width={35}
					height={35}
					draggable={false}
					className="select-none"
				/>
			</header>
			<Image
				src="/assets/detail-02.svg"
				alt="detail-02"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-4 right-0 z-40 select-none"
			/>

			<Image
				src="/assets/detail-04.svg"
				alt="detail-04"
				width={30}
				height={30}
				draggable={false}
				className="absolute top-5 right-24 z-20 select-none"
			/>
			<Image
				src="/assets/detail-03.svg"
				alt="detail-03"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-0 right-0 z-10 select-none"
			/>
			<div className="fixed top-0 right-0 bottom-0 flex items-end justify-end">
				<div className="h-full w-6 bg-green-100/10"></div>
				<div className="h-full w-10 bg-neutral-700"></div>
			</div>
			<img
				src="/assets/column.svg"
				alt="column-right"
				className="pointer-events-none fixed right-0 z-30 h-full object-cover select-none"
			/>

			{children}
		</>
	);
}
