import Image from "next/image";

interface RmLayoutProps {
	children: React.ReactNode;
}

export default function RmLayout({ children }: RmLayoutProps) {
	return (
		<>
			<img
				src="/assets/column.svg"
				alt="column-left"
				className="object-cover h-full fixed left-0 z-50 pointer-events-none select-none"
			/>
			<Image
				src="/assets/detail-01.svg"
				alt="detail-01"
				width={100}
				height={100}
				className="absolute top-4 left-0 z-40 pointer-events-none select-none"
			/>
			<div className="fixed left-0 top-0 flex bottom-0 ">
				<div className="w-10 h-full bg-neutral-700"></div>
				<div className="w-6 h-full bg-green-100/10"></div>
			</div>
			<header className="fixed top-0 inset-x-0 h-14 flex items-center justify-center bg-[#69533B] z-10">
				<Image
					src="/assets/logo.svg"
					alt="logo"
					width={35}
					height={35}
					className="pointer-events-none select-none"
				/>
			</header>
			<Image
				src="/assets/detail-02.svg"
				alt="detail-02"
				width={100}
				height={100}
				className="absolute top-4 right-0 z-40 pointer-events-none select-none"
			/>

			<Image
				src="/assets/detail-04.svg"
				alt="detail-04"
				width={30}
				height={30}
				className="absolute top-5 right-24 z-20 pointer-events-none select-none"
			/>
			<Image
				src="/assets/detail-03.svg"
				alt="detail-03"
				width={100}
				height={100}
				className="absolute top-0 right-0 z-10 pointer-events-none select-none"
			/>
			<div className="fixed right-0 flex justify-end items-end top-0 bottom-0">
				<div className="w-6 h-full bg-green-100/10"></div>
				<div className="w-10 h-full bg-neutral-700"></div>
			</div>
			<img
				src="/assets/column.svg"
				alt="column-right"
				className="object-cover h-full fixed right-0 z-30 pointer-events-none select-none"
			/>

			{children}
		</>
	);
}
