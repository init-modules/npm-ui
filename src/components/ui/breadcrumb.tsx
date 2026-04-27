"use client";

import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

type BreadcrumbProps = React.ComponentProps<"nav"> & {
	separator?: React.ReactNode;
};

function Breadcrumb({
	children,
	className,
	separator,
	...props
}: BreadcrumbProps) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={cn("text-sm", className)}
			{...props}
		>
			<BreadcrumbSeparatorContext.Provider
				value={separator ?? <ChevronRight className="h-4 w-4" />}
			>
				{children}
			</BreadcrumbSeparatorContext.Provider>
		</nav>
	);
}

const BreadcrumbSeparatorContext = React.createContext<React.ReactNode>(null);

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				"flex flex-wrap items-center gap-1.5 break-words text-[var(--photon-site-muted-text,currentColor)] sm:gap-2.5",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn("inline-flex items-center gap-1.5", className)}
			{...props}
		/>
	);
}

function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
	return (
		<a
			data-slot="breadcrumb-link"
			className={cn(
				"transition hover:text-[var(--photon-site-text,currentColor)]",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			role="link"
			aria-disabled="true"
			aria-current="page"
			data-slot="breadcrumb-page"
			className={cn(
				"font-medium text-[var(--photon-site-text,currentColor)]",
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<"li">) {
	const separator = React.useContext(BreadcrumbSeparatorContext);

	return (
		<li
			role="presentation"
			aria-hidden="true"
			data-slot="breadcrumb-separator"
			className={cn("inline-flex items-center opacity-60", className)}
			{...props}
		>
			{children ?? separator}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			role="presentation"
			aria-hidden="true"
			data-slot="breadcrumb-ellipsis"
			className={cn(
				"inline-flex h-5 w-5 items-center justify-center",
				className,
			)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More</span>
		</span>
	);
}

type BreadcrumbEntry = {
	label: React.ReactNode;
	href?: string;
	current?: boolean;
};

type BreadcrumbsProps = Omit<BreadcrumbProps, "children"> & {
	items: BreadcrumbEntry[];
	linkComponent?: React.ComponentType<
		React.ComponentProps<"a"> & { href: string }
	>;
};

function Breadcrumbs({
	items,
	linkComponent: LinkComponent,
	...props
}: BreadcrumbsProps) {
	return (
		<Breadcrumb {...props}>
			<BreadcrumbList>
				{items.map((item, index) => {
					const current = item.current ?? index === items.length - 1;
					const key =
						typeof item.label === "string"
							? item.label
							: `${index}:${item.href}`;
					const content =
						!current && item.href ? (
							LinkComponent ? (
								<LinkComponent href={item.href}>{item.label}</LinkComponent>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)
						) : (
							<BreadcrumbPage>{item.label}</BreadcrumbPage>
						);

					return (
						<React.Fragment key={key}>
							<BreadcrumbItem>{content}</BreadcrumbItem>
							{index < items.length - 1 ? <BreadcrumbSeparator /> : null}
						</React.Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export {
	Breadcrumb,
	BreadcrumbEllipsis,
	type BreadcrumbEntry,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	type BreadcrumbProps,
	BreadcrumbSeparator,
	Breadcrumbs,
	type BreadcrumbsProps,
};
