"use client";

import gsap from "gsap";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

type CounterProps = Omit<React.ComponentProps<"div">, "onChange"> & {
	value?: number;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onValueChange?: (value: number) => void;
	onValueCommit?: (value: number) => void;
	decrementLabel?: string;
	incrementLabel?: string;
	valueLabel?: string;
	buttonClassName?: string;
	valueClassName?: string;
	inputClassName?: string;
};

const clampCounterValue = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const normalizeCounterValue = (value: unknown, fallback: number) => {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value;
	}

	if (typeof value === "string" && value.trim() !== "") {
		const parsed = Number(value);

		if (Number.isFinite(parsed)) {
			return parsed;
		}
	}

	return fallback;
};

const formatCounterValue = (value: number) => String(value);

const getCounterRollChars = (from: number, to: number) => {
	const fromValue = formatCounterValue(from);
	const toValue = formatCounterValue(to);
	const length = Math.max(fromValue.length, toValue.length);

	return {
		from: fromValue.padStart(length, " "),
		to: toValue.padStart(length, " "),
		value: to,
	};
};

const renderCounterChar = (char: string) => (char === " " ? "\u00a0" : char);

function Counter({
	value,
	defaultValue = 0,
	min = 0,
	max = Number.MAX_SAFE_INTEGER,
	step = 1,
	disabled = false,
	onValueChange,
	onValueCommit,
	decrementLabel = "Decrease",
	incrementLabel = "Increase",
	valueLabel = "Quantity",
	className,
	buttonClassName,
	valueClassName,
	inputClassName,
	...props
}: CounterProps) {
	const normalizedMin = Number.isFinite(min) ? min : 0;
	const normalizedMax = Number.isFinite(max)
		? Math.max(max, normalizedMin)
		: Number.MAX_SAFE_INTEGER;
	const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
	const isControlled = value !== undefined;
	const [uncontrolledValue, setUncontrolledValue] = React.useState(() =>
		clampCounterValue(
			normalizeCounterValue(defaultValue, normalizedMin),
			normalizedMin,
			normalizedMax,
		),
	);
	const currentValue = clampCounterValue(
		normalizeCounterValue(
			isControlled ? value : uncontrolledValue,
			normalizedMin,
		),
		normalizedMin,
		normalizedMax,
	);
	const [displayValue, setDisplayValue] = React.useState(currentValue);
	const [roll, setRoll] = React.useState<{
		direction: "down" | "up";
		from: string;
		to: string;
		value: number;
	} | null>(null);
	const previousValueRef = React.useRef(currentValue);
	const valueSlotRef = React.useRef<HTMLButtonElement | null>(null);
	const outgoingValueRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
	const incomingValueRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
	const rollTimelineRef = React.useRef<gsap.core.Timeline | null>(null);
	const [editing, setEditing] = React.useState(false);
	const [inputValue, setInputValue] = React.useState(String(currentValue));
	const inputRef = React.useRef<HTMLInputElement | null>(null);

	React.useEffect(() => {
		const previousValue = previousValueRef.current;

		if (previousValue !== currentValue) {
			const nextRoll = getCounterRollChars(previousValue, currentValue);

			setRoll({
				direction: currentValue > previousValue ? "up" : "down",
				...nextRoll,
			});
			previousValueRef.current = currentValue;
		}

		if (!editing) {
			setInputValue(String(currentValue));
		}
	}, [currentValue, editing]);

	React.useLayoutEffect(() => {
		if (!roll) {
			return;
		}

		let finishFrame: number | null = null;
		const finishRoll = () => {
			setDisplayValue(roll.value);
			setRoll(null);
		};
		const scheduleFinishRoll = () => {
			finishFrame = window.requestAnimationFrame(finishRoll);
		};
		const valueSlot = valueSlotRef.current;
		const changedIndexes = Array.from(roll.to, (_, index) => index).filter(
			(index) => roll.from[index] !== roll.to[index],
		);
		const outgoingValues = changedIndexes
			.map((index) => outgoingValueRefs.current[index])
			.filter((element): element is HTMLSpanElement => element !== null);
		const incomingValues = changedIndexes
			.map((index) => incomingValueRefs.current[index])
			.filter((element): element is HTMLSpanElement => element !== null);

		if (
			!valueSlot ||
			changedIndexes.length === 0 ||
			outgoingValues.length !== changedIndexes.length ||
			incomingValues.length !== changedIndexes.length
		) {
			scheduleFinishRoll();
			return () => {
				if (finishFrame !== null) {
					window.cancelAnimationFrame(finishFrame);
				}
			};
		}

		rollTimelineRef.current?.kill();

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			gsap.set([...outgoingValues, ...incomingValues], {
				clearProps: "opacity,transform,visibility",
			});
			scheduleFinishRoll();
			return () => {
				if (finishFrame !== null) {
					window.cancelAnimationFrame(finishFrame);
				}
			};
		}

		const distance = valueSlot.getBoundingClientRect().height || 32;
		const exitY = roll.direction === "up" ? -distance : distance;
		const enterY = roll.direction === "up" ? distance : -distance;

		gsap.set(outgoingValues, { autoAlpha: 1, y: 0 });
		gsap.set(incomingValues, { autoAlpha: 1, y: enterY });

		rollTimelineRef.current = gsap
			.timeline({
				defaults: {
					duration: 0.28,
					ease: "power3.out",
					overwrite: "auto",
				},
				onComplete: () => {
					gsap.set([...outgoingValues, ...incomingValues], {
						clearProps: "opacity,transform,visibility",
					});
					finishRoll();
					rollTimelineRef.current = null;
				},
			})
			.to(outgoingValues, { autoAlpha: 0, y: exitY }, 0)
			.to(incomingValues, { autoAlpha: 1, y: 0 }, 0);

		return () => {
			if (finishFrame !== null) {
				window.cancelAnimationFrame(finishFrame);
			}
			rollTimelineRef.current?.kill();
			rollTimelineRef.current = null;
		};
	}, [roll]);

	React.useEffect(
		() => () => {
			rollTimelineRef.current?.kill();
		},
		[],
	);

	React.useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [editing]);

	const setNextValue = React.useCallback(
		(nextValue: number, commit = true) => {
			const clampedValue = clampCounterValue(
				Math.round(nextValue),
				normalizedMin,
				normalizedMax,
			);

			if (!isControlled) {
				setUncontrolledValue(clampedValue);
			}

			onValueChange?.(clampedValue);

			if (commit) {
				onValueCommit?.(clampedValue);
			}
		},
		[isControlled, normalizedMax, normalizedMin, onValueChange, onValueCommit],
	);

	const commitInputValue = React.useCallback(() => {
		setEditing(false);
		setNextValue(normalizeCounterValue(inputValue, currentValue), true);
	}, [currentValue, inputValue, setNextValue]);

	const canDecrement = !disabled && currentValue > normalizedMin;
	const canIncrement = !disabled && currentValue < normalizedMax;
	const visibleValue = roll ? roll.to : formatCounterValue(displayValue);
	const visibleChars = Array.from(visibleValue);

	return (
		<div
			data-slot="counter"
			className={cn(
				"inline-flex h-11 items-center gap-3 rounded-full border border-current/10 bg-neutral-950 px-1.5 py-1 text-white shadow-sm",
				disabled && "cursor-not-allowed opacity-55",
				className,
			)}
			{...props}
		>
			<button
				type="button"
				aria-label={decrementLabel}
				disabled={!canDecrement}
				onClick={() => setNextValue(currentValue - normalizedStep)}
				className={cn(
					"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current transition duration-150 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:pointer-events-none disabled:opacity-35",
					buttonClassName,
				)}
			>
				<Minus aria-hidden="true" className="h-4 w-4" />
			</button>

			<div
				data-slot="counter-value-slot"
				className={cn(
					"relative flex h-8 min-w-[2ch] items-center justify-center overflow-hidden text-center text-sm font-medium tabular-nums",
					valueClassName,
				)}
			>
				{editing ? (
					<input
						ref={inputRef}
						aria-label={valueLabel}
						type="number"
						inputMode="numeric"
						min={normalizedMin}
						max={normalizedMax}
						step={normalizedStep}
						value={inputValue}
						disabled={disabled}
						onChange={(event) => setInputValue(event.currentTarget.value)}
						onBlur={commitInputValue}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								commitInputValue();
								return;
							}

							if (event.key === "Escape") {
								setInputValue(String(currentValue));
								setEditing(false);
							}
						}}
						className={cn(
							"h-full w-full appearance-none border-0 bg-transparent p-0 text-center text-sm font-medium tabular-nums text-current outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
							inputClassName,
						)}
					/>
				) : (
					<button
						ref={valueSlotRef}
						type="button"
						aria-label={valueLabel}
						disabled={disabled}
						onClick={() => setEditing(true)}
						className="relative h-full min-w-[2ch] overflow-hidden text-center outline-none transition focus-visible:ring-2 focus-visible:ring-white/45 disabled:pointer-events-none"
					>
						<span className="flex h-full items-center justify-center">
							{roll
								? Array.from(roll.to, (toChar, index) => {
										const fromChar = roll.from[index] ?? " ";
										const changed = fromChar !== toChar;

										return (
											<span
												key={`${index}-${roll.from}-${roll.to}`}
												className="relative inline-flex h-full w-[1ch] items-center justify-center overflow-hidden"
											>
												<span
													ref={(element) => {
														outgoingValueRefs.current[index] = element;
													}}
													aria-hidden={changed ? true : undefined}
													className={cn(
														"absolute inset-0 flex items-center justify-center",
														changed && "will-change-transform",
													)}
												>
													{renderCounterChar(fromChar)}
												</span>
												{changed ? (
													<span
														ref={(element) => {
															incomingValueRefs.current[index] = element;
														}}
														className="absolute inset-0 flex items-center justify-center will-change-transform"
													>
														{renderCounterChar(toChar)}
													</span>
												) : null}
											</span>
										);
									})
								: visibleChars.map((char, index) => (
										<span
											key={`${index}-${char}`}
											className="inline-flex h-full w-[1ch] items-center justify-center"
										>
											{renderCounterChar(char)}
										</span>
									))}
						</span>
					</button>
				)}
			</div>

			<button
				type="button"
				aria-label={incrementLabel}
				disabled={!canIncrement}
				onClick={() => setNextValue(currentValue + normalizedStep)}
				className={cn(
					"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current transition duration-150 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:pointer-events-none disabled:opacity-35",
					buttonClassName,
				)}
			>
				<Plus aria-hidden="true" className="h-4 w-4" />
			</button>
		</div>
	);
}

export { Counter, type CounterProps };
