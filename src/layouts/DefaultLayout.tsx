import { LayoutStatic, IntroVideoPlayer } from '@/components';

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
	return (
		<>
			<LayoutStatic />
			<IntroVideoPlayer>{children}</IntroVideoPlayer>
		</>
	);
}
