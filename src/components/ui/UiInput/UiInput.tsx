import { forwardRef } from 'react';
import { helpers } from '@/utils/helpers';

export interface UiInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
	variant?: 'default' | 'ghost';
	inputSize?: 'sm' | 'md' | 'lg';
}

const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
	(
		{
			label,
			error,
			helperText,
			variant = 'default',
			inputSize = 'md',
			className,
			id,
			disabled,
			...props
		},
		ref
	) => {
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

		const inputClasses = helpers.cn(
			// Base styles
			'w-full rounded-md border bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 transition-colors',
			'focus:outline-none focus:ring-1',
			// Variants
			variant === 'default' &&
				'border-neutral-700 focus:border-accent-secondary focus:ring-accent-secondary',
			variant === 'ghost' &&
				'border-transparent bg-transparent focus:border-neutral-600 focus:bg-neutral-800',
			// Sizes
			inputSize === 'sm' && 'px-2 py-1 text-xs',
			inputSize === 'md' && 'px-3 py-2 text-sm',
			inputSize === 'lg' && 'px-4 py-3 text-base',
			// States
			error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
			disabled && 'cursor-not-allowed opacity-50',
			className
		);

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={inputId}
						className={helpers.cn(
							'block text-sm font-medium text-neutral-300',
							disabled && 'opacity-50'
						)}
					>
						{label}
					</label>
				)}

				<input
					ref={ref}
					id={inputId}
					className={inputClasses}
					disabled={disabled}
					aria-invalid={!!error}
					aria-describedby={
						error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
					}
					{...props}
				/>

				{error && (
					<p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
						{error}
					</p>
				)}

				{helperText && !error && (
					<p id={`${inputId}-helper`} className="text-xs text-neutral-500">
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

UiInput.displayName = 'UiInput';

export default UiInput;
