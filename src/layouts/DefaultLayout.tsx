import LayoutStatic from '@/components/LayoutStatic';
import IntroVideoPlayer from '@/components/IntroVideoPlayer';

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
