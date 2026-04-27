"use client";

import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

type StepStatus = "wait" | "process" | "finish" | "error";

type StepItem = {
	key?: string;
	title: React.ReactNode;
	description?: React.ReactNode;
	icon?: React.ReactNode;
	status?: StepStatus;
	disabled?: boolean;
};

type StepsProps = Omit<React.ComponentProps<"ol">, "onChange"> & {
	items?: readonly StepItem[];
	current?: number;
	status?: StepStatus;
	direction?: "horizontal" | "vertical";
	labelPlacement?: "horizontal" | "vertical";
	animated?: boolean;
	onChange?: (current: number) => void;
};

const getStepStatus = (
	index: number,
	current: number,
	overrideStatus?: StepStatus,
	itemStatus?: StepStatus,
): StepStatus => {
	if (itemStatus) {
		return itemStatus;
	}

	if (index < current) {
		return "finish";
	}

	if (index === current) {
		return overrideStatus ?? "process";
	}

	return "wait";
};

const statusClasses: Record<StepStatus, string> = {
	finish:
		"border-[var(--photon-site-accent,#14b8a6)] bg-[var(--photon-site-accent,#14b8a6)] text-white",
	process:
		"border-[var(--photon-site-accent,#14b8a6)] bg-[var(--photon-site-background,transparent)] text-[var(--photon-site-accent,#14b8a6)]",
	error: "border-red-500 bg-red-500 text-white",
	wait: "border-[var(--photon-site-border,currentColor)] bg-[color-mix(in_oklab,var(--photon-site-surface,currentColor)_70%,transparent)] text-[var(--photon-site-muted-text,currentColor)]",
};

function Steps({
	items,
	current = 0,
	status,
	direction = "horizontal",
	labelPlacement = "horizontal",
	animated = true,
	onChange,
	children,
	className,
	...props
}: StepsProps) {
	const renderedItems =
		items ??
		React.Children.toArray(children)
			.filter(React.isValidElement)
			.map((child) => (child as React.ReactElement<StepProps>).props);
	const horizontal = direction === "horizontal";

	return (
		<ol
			data-slot="steps"
			data-direction={direction}
			className={cn(
				horizontal ? "flex w-full items-start" : "grid gap-5",
				className,
			)}
			{...props}
		>
			{renderedItems.map((item, index) => {
				const stepStatus = getStepStatus(index, current, status, item.status);
				const clickable = Boolean(onChange) && !item.disabled;
				const isLast = index === renderedItems.length - 1;
				const content = (
					<>
						<span
							data-slot="step-icon"
							className={cn(
								"relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
								animated && "transition-all duration-300 ease-out",
								statusClasses[stepStatus],
							)}
						>
							{item.icon ??
								(stepStatus === "finish" ? (
									<Check className="h-4 w-4" />
								) : (
									index + 1
								))}
						</span>
						<span
							data-slot="step-content"
							className={cn(
								"min-w-0",
								labelPlacement === "vertical" && horizontal
									? "mt-2 text-center"
									: "ml-3",
							)}
						>
							<span
								data-slot="step-title"
								className={cn(
									"block text-sm font-semibold",
									animated && "transition-colors duration-300",
									stepStatus === "wait"
										? "text-[var(--photon-site-muted-text,currentColor)]"
										: "text-[var(--photon-site-text,currentColor)]",
									stepStatus === "error" && "text-red-500",
								)}
							>
								{item.title}
							</span>
							{item.description ? (
								<span
									data-slot="step-description"
									className="mt-1 block text-xs leading-5 text-[var(--photon-site-muted-text,currentColor)]"
								>
									{item.description}
								</span>
							) : null}
						</span>
					</>
				);

				return (
					<li
						key={item.key ?? index}
						data-slot="step"
						data-status={stepStatus}
						data-disabled={item.disabled ? "true" : undefined}
						className={cn(
							"relative min-w-0",
							horizontal ? "flex flex-1 items-start" : "flex items-start",
							isLast && horizontal && "flex-none",
							item.disabled && "cursor-default opacity-55",
						)}
					>
						{clickable ? (
							<button
								type="button"
								onClick={() => onChange?.(index)}
								className={cn(
									"flex min-w-0 items-start text-left",
									clickable && "cursor-pointer",
									labelPlacement === "vertical" &&
										horizontal &&
										"flex-col items-center",
								)}
							>
								{content}
							</button>
						) : (
							<div
								aria-disabled={item.disabled || undefined}
								className={cn(
									"flex min-w-0 cursor-default items-start",
									labelPlacement === "vertical" &&
										horizontal &&
										"flex-col items-center",
								)}
							>
								{content}
							</div>
						)}
						{!isLast ? (
							<span
								aria-hidden="true"
								data-slot="step-connector"
								className={cn(
									"overflow-hidden",
									horizontal
										? "mx-4 mt-4 h-px flex-1 bg-[var(--photon-site-border,currentColor)]"
										: "absolute left-4 top-10 h-[calc(100%+0.25rem)] w-px bg-[var(--photon-site-border,currentColor)]",
								)}
							>
								<span
									data-slot="step-connector-progress"
									className={cn(
										"block bg-[var(--photon-site-accent,#14b8a6)]",
										horizontal
											? "h-full origin-left"
											: "h-full w-full origin-top",
										animated && "transition-transform duration-300 ease-out",
										index < current
											? "scale-x-100 scale-y-100"
											: horizontal
												? "scale-x-0"
												: "scale-y-0",
									)}
								/>
							</span>
						) : null}
					</li>
				);
			})}
		</ol>
	);
}

type StepProps = StepItem;

function Step(_props: StepProps) {
	return null;
}

export {
	Step,
	type StepItem,
	type StepProps,
	type StepStatus,
	Steps,
	type StepsProps,
};
