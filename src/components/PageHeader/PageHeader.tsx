interface PageHeaderProps {
	title: string;
	description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<div className="flex flex-col justify-center">
			<h1 className="text-center text-xl font-bold text-[#CAB580]">{title}</h1>
			<p className="text-center text-sm text-neutral-300">{description}</p>
		</div>
	);
}
