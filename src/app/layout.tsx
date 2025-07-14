import type { Metadata } from 'next';
import { Inknut_Antiqua } from 'next/font/google';
import './globals.css';
import DefaultLayout from '@/layouts/DefaultLayout';
import { helpers } from '@/utils/helpers';

const inknutAntiqua = Inknut_Antiqua({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
	title: 'Rick and Morty',
	description: 'Rick and Morty'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={helpers.cn(
					inknutAntiqua.className,
					'h-[100dvh] overflow-y-auto antialiased'
				)}
				cz-shortcut-listen="true"
			>
				<DefaultLayout>{children}</DefaultLayout>
			</body>
		</html>
	);
}
