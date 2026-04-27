"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

type TabsContextType<T extends string = string> = {
	activeValue: T | undefined;
	baseId: string;
	handleValueChange: (value: T) => void;
	registerTrigger: (value: T, node: HTMLButtonElement | null) => void;
	getTriggerNode: (value: T) => HTMLButtonElement | null;
	getTriggerValues: () => T[];
};

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

function useTabs<T extends string = string>(): TabsContextType<T> {
	const context = React.useContext(TabsContext);

	if (!context) {
		throw new Error("useTabs must be used within a Tabs provider");
	}

	return context as unknown as TabsContextType<T>;
}

type BaseTabsProps = React.ComponentProps<"div"> & {
	children: React.ReactNode;
};

type UncontrolledTabsProps<T extends string = string> = BaseTabsProps & {
	defaultValue?: T;
	value?: never;
	onValueChange?: never;
};

type ControlledTabsProps<T extends string = string> = BaseTabsProps & {
	value: T;
	onValueChange?: (value: T) => void;
	defaultValue?: never;
};

type TabsProps<T extends string = string> =
	| UncontrolledTabsProps<T>
	| ControlledTabsProps<T>;

function Tabs<T extends string = string>({
	defaultValue,
	value,
	onValueChange,
	children,
	className,
	...props
}: TabsProps<T>) {
	const [uncontrolledValue, setUncontrolledValue] = React.useState<
		T | undefined
	>(defaultValue);
	const triggersRef = React.useRef(new Map<T, HTMLButtonElement>());
	const baseId = React.useId();
	const isControlled = value !== undefined;
	const activeValue = isControlled ? value : uncontrolledValue;

	const handleValueChange = React.useCallback(
		(nextValue: T) => {
			if (isControlled) {
				onValueChange?.(nextValue);
				return;
			}

			setUncontrolledValue(nextValue);
		},
		[isControlled, onValueChange],
	);

	const registerTrigger = React.useCallback(
		(triggerValue: T, node: HTMLButtonElement | null) => {
			if (node) {
				triggersRef.current.set(triggerValue, node);
				setUncontrolledValue((currentValue) =>
					isControlled || currentValue !== undefined
						? currentValue
						: triggerValue,
				);
				return;
			}

			triggersRef.current.delete(triggerValue);
		},
		[isControlled],
	);

	const getTriggerNode = React.useCallback(
		(triggerValue: T) => triggersRef.current.get(triggerValue) ?? null,
		[],
	);

	const getTriggerValues = React.useCallback(
		() => Array.from(triggersRef.current.keys()),
		[],
	);

	const contextValue = React.useMemo<TabsContextType<T>>(
		() => ({
			activeValue,
			baseId,
			handleValueChange,
			registerTrigger,
			getTriggerNode,
			getTriggerValues,
		}),
		[
			activeValue,
			baseId,
			handleValueChange,
			registerTrigger,
			getTriggerNode,
			getTriggerValues,
		],
	);

	return (
		<TabsContext.Provider value={contextValue as unknown as TabsContextType}>
			<div
				data-slot="tabs"
				className={cn("flex flex-col gap-2", className)}
				{...props}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

type TabsListProps = React.ComponentProps<"div"> & {
	children: React.ReactNode;
	activeClassName?: string;
	indicatorClassName?: string;
	orientation?: "horizontal" | "vertical";
};

function TabsList({
	children,
	className,
	activeClassName,
	indicatorClassName,
	orientation = "horizontal",
	...props
}: TabsListProps) {
	const { activeValue, getTriggerNode } = useTabs();
	const listRef = React.useRef<HTMLDivElement | null>(null);
	const [indicatorStyle, setIndicatorStyle] =
		React.useState<React.CSSProperties | null>(null);

	const updateIndicator = React.useCallback(() => {
		const list = listRef.current;

		if (!list || activeValue === undefined) {
			setIndicatorStyle(null);
			return;
		}

		const activeTrigger = getTriggerNode(activeValue);

		if (!activeTrigger) {
			setIndicatorStyle(null);
			return;
		}

		const listRect = list.getBoundingClientRect();
		const triggerRect = activeTrigger.getBoundingClientRect();

		setIndicatorStyle({
			height: triggerRect.height,
			transform: `translate3d(${triggerRect.left - listRect.left}px, ${
				triggerRect.top - listRect.top
			}px, 0)`,
			width: triggerRect.width,
		});
	}, [activeValue, getTriggerNode]);

	React.useLayoutEffect(() => {
		updateIndicator();

		const list = listRef.current;

		if (!list) {
			return;
		}

		const observer = new ResizeObserver(updateIndicator);
		observer.observe(list);

		for (const value of Array.from(list.querySelectorAll("[role='tab']"))) {
			observer.observe(value);
		}

		window.addEventListener("resize", updateIndicator);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateIndicator);
		};
	}, [updateIndicator, children]);

	return (
		<div
			ref={listRef}
			data-orientation={orientation}
			data-slot="tabs-list"
			role="tablist"
			aria-orientation={orientation}
			className={cn(
				"bg-muted text-muted-foreground relative inline-flex h-10 w-fit items-center justify-center rounded-lg p-1",
				orientation === "vertical" && "h-fit flex-col",
				className,
			)}
			{...props}
		>
			{indicatorStyle ? (
				<div
					data-slot="tabs-indicator"
					className={cn(
						"bg-background pointer-events-none absolute top-0 left-0 z-0 rounded-sm shadow-sm transition-[transform,width,height] duration-300 ease-in-out",
						activeClassName,
						indicatorClassName,
					)}
					style={indicatorStyle}
				/>
			) : null}
			{children}
		</div>
	);
}

type TabsTriggerProps = React.ComponentProps<"button"> & {
	value: string;
};

function TabsTrigger({
	value,
	children,
	className,
	disabled,
	onClick,
	onKeyDown,
	onPointerCancel,
	onPointerDown,
	onPointerLeave,
	onPointerUp,
	...props
}: TabsTriggerProps) {
	const {
		activeValue,
		baseId,
		handleValueChange,
		registerTrigger,
		getTriggerValues,
		getTriggerNode,
	} = useTabs();
	const triggerRef = React.useRef<HTMLButtonElement | null>(null);
	const isActive = activeValue === value;

	React.useEffect(() => {
		registerTrigger(value, triggerRef.current);
		return () => registerTrigger(value, null);
	}, [value, registerTrigger]);

	const selectTriggerAt = React.useCallback(
		(index: number) => {
			const values = getTriggerValues();

			if (values.length === 0) {
				return;
			}

			for (let offset = 0; offset < values.length; offset += 1) {
				const normalizedIndex =
					(index + offset + values.length) % values.length;
				const nextValue = values[normalizedIndex];
				const nextNode = getTriggerNode(nextValue);

				if (!nextNode?.disabled) {
					nextNode?.focus();
					handleValueChange(nextValue);
					return;
				}
			}
		},
		[getTriggerValues, getTriggerNode, handleValueChange],
	);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		onKeyDown?.(event);

		if (event.defaultPrevented) {
			return;
		}

		const values = getTriggerValues();
		const currentIndex = values.indexOf(value);

		if (currentIndex === -1) {
			return;
		}

		switch (event.key) {
			case "ArrowRight":
			case "ArrowDown":
				event.preventDefault();
				selectTriggerAt(currentIndex + 1);
				break;
			case "ArrowLeft":
			case "ArrowUp":
				event.preventDefault();
				selectTriggerAt(currentIndex - 1);
				break;
			case "Home":
				event.preventDefault();
				selectTriggerAt(0);
				break;
			case "End":
				event.preventDefault();
				selectTriggerAt(values.length - 1);
				break;
		}
	};

	return (
		<button
			ref={triggerRef}
			type="button"
			id={`${baseId}-trigger-${value}`}
			data-slot="tabs-trigger"
			data-state={isActive ? "active" : "inactive"}
			aria-controls={`${baseId}-content-${value}`}
			aria-selected={isActive}
			disabled={disabled}
			role="tab"
			tabIndex={isActive ? 0 : -1}
			className={cn(
				"ring-offset-background focus-visible:ring-ring relative z-[1] inline-flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium transition-[color,transform] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
				className,
			)}
			onClick={(event) => {
				onClick?.(event);

				if (!event.defaultPrevented) {
					handleValueChange(value);
				}
			}}
			onKeyDown={handleKeyDown}
			onPointerDown={(event) => {
				onPointerDown?.(event);

				if (event.defaultPrevented) {
					return;
				}

				if (disabled) {
					return;
				}

				event.currentTarget.style.transform = "scale(0.96)";
			}}
			onPointerUp={(event) => {
				onPointerUp?.(event);
				event.currentTarget.style.transform = "";
			}}
			onPointerCancel={(event) => {
				onPointerCancel?.(event);
				event.currentTarget.style.transform = "";
			}}
			onPointerLeave={(event) => {
				onPointerLeave?.(event);
				event.currentTarget.style.transform = "";
			}}
			{...props}
		>
			{children}
		</button>
	);
}

type TabsContentsProps = React.ComponentProps<"div"> & {
	children: React.ReactNode;
};

function TabsContents({ children, className, ...props }: TabsContentsProps) {
	const { activeValue } = useTabs();
	const childrenArray = React.Children.toArray(children);
	const activeIndex = Math.max(
		childrenArray.findIndex(
			(child): child is React.ReactElement<{ value: string }> =>
				React.isValidElement(child) &&
				typeof child.props === "object" &&
				child.props !== null &&
				"value" in child.props &&
				child.props.value === activeValue,
		),
		0,
	);

	return (
		<div
			data-slot="tabs-contents"
			className={cn("overflow-hidden", className)}
			{...props}
		>
			<div
				data-slot="tabs-contents-track"
				className="-mx-2 flex transition-transform duration-300 ease-in-out"
				style={{ transform: `translate3d(${activeIndex * -100}%, 0, 0)` }}
			>
				{childrenArray.map((child, index) => (
					<div className="w-full shrink-0 px-2" key={index}>
						{child}
					</div>
				))}
			</div>
		</div>
	);
}

type TabsContentProps = React.ComponentProps<"div"> & {
	value: string;
};

function TabsContent({
	children,
	value,
	className,
	...props
}: TabsContentProps) {
	const { activeValue, baseId } = useTabs();
	const isActive = activeValue === value;

	return (
		<div
			id={`${baseId}-content-${value}`}
			data-slot="tabs-content"
			data-state={isActive ? "active" : "inactive"}
			aria-hidden={!isActive}
			aria-labelledby={`${baseId}-trigger-${value}`}
			role="tabpanel"
			tabIndex={isActive ? 0 : -1}
			className={cn(
				"overflow-hidden transition-[filter,opacity] duration-300 ease-in-out data-[state=inactive]:pointer-events-none data-[state=inactive]:blur-[4px] data-[state=inactive]:opacity-70",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export {
	Tabs,
	TabsContent,
	type TabsContentProps,
	TabsContents,
	type TabsContentsProps,
	type TabsContextType,
	TabsList,
	type TabsListProps,
	type TabsProps,
	TabsTrigger,
	type TabsTriggerProps,
	useTabs,
};
