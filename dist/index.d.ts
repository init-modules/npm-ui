import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { ToasterProps } from 'sonner';
import { ClassValue } from 'clsx';

type BreadcrumbProps = React.ComponentProps<"nav"> & {
    separator?: React.ReactNode;
};
declare function Breadcrumb({ children, className, separator, ...props }: BreadcrumbProps): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
type BreadcrumbEntry = {
    label: React.ReactNode;
    href?: string;
    current?: boolean;
};
type BreadcrumbsProps = Omit<BreadcrumbProps, "children"> & {
    items: BreadcrumbEntry[];
    linkComponent?: React.ComponentType<React.ComponentProps<"a"> & {
        href: string;
    }>;
};
declare function Breadcrumbs({ items, linkComponent: LinkComponent, ...props }: BreadcrumbsProps): react_jsx_runtime.JSX.Element;

declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function Card({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardAction({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

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
declare function Counter({ value, defaultValue, min, max, step, disabled, onValueChange, onValueCommit, decrementLabel, incrementLabel, valueLabel, className, buttonClassName, valueClassName, inputClassName, ...props }: CounterProps): react_jsx_runtime.JSX.Element;

declare function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): react_jsx_runtime.JSX.Element;
declare function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): react_jsx_runtime.JSX.Element;
declare function DialogContent({ className, children, showCloseButton, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): react_jsx_runtime.JSX.Element;

declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): react_jsx_runtime.JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare function Separator({ className, orientation, decorative, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>): react_jsx_runtime.JSX.Element;

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
declare function Steps({ items, current, status, direction, labelPlacement, animated, onChange, children, className, ...props }: StepsProps): react_jsx_runtime.JSX.Element;
type StepProps = StepItem;
declare function Step(_props: StepProps): null;

type TabsContextType<T extends string = string> = {
    activeValue: T | undefined;
    baseId: string;
    handleValueChange: (value: T) => void;
    registerTrigger: (value: T, node: HTMLButtonElement | null) => void;
    getTriggerNode: (value: T) => HTMLButtonElement | null;
    getTriggerValues: () => T[];
};
declare function useTabs<T extends string = string>(): TabsContextType<T>;
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
type TabsProps<T extends string = string> = UncontrolledTabsProps<T> | ControlledTabsProps<T>;
declare function Tabs<T extends string = string>({ defaultValue, value, onValueChange, children, className, ...props }: TabsProps<T>): react_jsx_runtime.JSX.Element;
type TabsListProps = React.ComponentProps<"div"> & {
    children: React.ReactNode;
    activeClassName?: string;
    indicatorClassName?: string;
    orientation?: "horizontal" | "vertical";
};
declare function TabsList({ children, className, activeClassName, indicatorClassName, orientation, ...props }: TabsListProps): react_jsx_runtime.JSX.Element;
type TabsTriggerProps = React.ComponentProps<"button"> & {
    value: string;
};
declare function TabsTrigger({ value, children, className, disabled, onClick, onKeyDown, onPointerCancel, onPointerDown, onPointerLeave, onPointerUp, ...props }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
type TabsContentsProps = React.ComponentProps<"div"> & {
    children: React.ReactNode;
};
declare function TabsContents({ children, className, ...props }: TabsContentsProps): react_jsx_runtime.JSX.Element;
type TabsContentProps = React.ComponentProps<"div"> & {
    value: string;
};
declare function TabsContent({ children, value, className, ...props }: TabsContentProps): react_jsx_runtime.JSX.Element;

declare const Toaster: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Breadcrumb, BreadcrumbEllipsis, type BreadcrumbEntry, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, type BreadcrumbProps, BreadcrumbSeparator, Breadcrumbs, type BreadcrumbsProps, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Counter, type CounterProps, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Separator, Step, type StepItem, type StepProps, type StepStatus, Steps, type StepsProps, Tabs, TabsContent, type TabsContentProps, TabsContents, type TabsContentsProps, type TabsContextType, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps, Toaster, badgeVariants, buttonVariants, cn, useTabs };
