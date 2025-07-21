import { forwardRef } from 'react';
import { helpers } from '@/utils/helpers';

export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface UiSelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
	label?: string;
	error?: string;
	helperText?: string;
	placeholder?: string;
	options: SelectOption[];
	variant?: 'default' | 'ghost';
	selectSize?: 'sm' | 'md' | 'lg';
}

const UiSelect = forwardRef<HTMLSelectElement, UiSelectProps>(
	(
		{
			label,
			error,
			helperText,
			placeholder,
			options,
			variant = 'default',
			selectSize = 'md',
			className,
			id,
			disabled,
			...props
		},
		ref
	) => {
		const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

		const selectClasses = helpers.cn(
			// Base styles
			'w-full rounded-md border bg-neutral-800 text-neutral-200 transition-colors',
			'focus:outline-none focus:ring-1 appearance-none cursor-pointer',
			// Variants
			variant === 'default' &&
				'border-neutral-700 focus:border-accent-secondary focus:ring-accent-secondary',
			variant === 'ghost' &&
				'border-transparent bg-transparent focus:border-neutral-600 focus:bg-neutral-800',
			// Sizes
			selectSize === 'sm' && 'px-2 py-1 text-xs',
			selectSize === 'md' && 'px-3 py-2 text-sm',
			selectSize === 'lg' && 'px-4 py-3 text-base',
			// States
			error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
			disabled && 'cursor-not-allowed opacity-50',
			className
		);

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={selectId}
						className={helpers.cn(
							'block text-sm font-medium text-neutral-300',
							disabled && 'opacity-50'
						)}
					>
						{label}
					</label>
				)}

				<div className="relative">
					<select
						ref={ref}
						id={selectId}
						className={selectClasses}
						disabled={disabled}
						aria-invalid={!!error}
						aria-describedby={
							error
								? `${selectId}-error`
								: helperText
									? `${selectId}-helper`
									: undefined
						}
						{...props}
					>
						{placeholder && (
							<option value="" disabled={!props.value}>
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option
								key={option.value}
								value={option.value}
								disabled={option.disabled}
							>
								{option.label}
							</option>
						))}
					</select>

					{/* Custom dropdown arrow */}
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<svg
							className="size-4 text-neutral-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>

				{error && (
					<p id={`${selectId}-error`} className="text-xs text-red-400" role="alert">
						{error}
					</p>
				)}

				{helperText && !error && (
					<p id={`${selectId}-helper`} className="text-xs text-neutral-500">
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

UiSelect.displayName = 'UiSelect';

export default UiSelect;
