interface PageHeaderProps {
	title: string;
	description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<div className="flex flex-col justify-center" data-testid="page-header">
			<h1
				className="text-title text-center text-xl font-bold"
				data-testid="page-header-title"
			>
				{title}
			</h1>
			<p
				className="text-center text-sm text-neutral-300"
				data-testid="page-header-description"
			>
				{description}
			</p>
		</div>
	);
}
