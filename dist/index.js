"use client";

// src/components/ui/breadcrumb.tsx
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/breadcrumb.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Breadcrumb({
  children,
  className,
  separator,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "breadcrumb",
      "data-slot": "breadcrumb",
      className: cn("text-sm", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        BreadcrumbSeparatorContext.Provider,
        {
          value: separator ?? /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }),
          children
        }
      )
    }
  );
}
var BreadcrumbSeparatorContext = React.createContext(null);
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "flex flex-wrap items-center gap-1.5 break-words text-[var(--photon-site-muted-text,currentColor)] sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      "data-slot": "breadcrumb-link",
      className: cn(
        "transition hover:text-[var(--photon-site-text,currentColor)]",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      "data-slot": "breadcrumb-page",
      className: cn(
        "font-medium text-[var(--photon-site-text,currentColor)]",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  const separator = React.useContext(BreadcrumbSeparatorContext);
  return /* @__PURE__ */ jsx(
    "li",
    {
      role: "presentation",
      "aria-hidden": "true",
      "data-slot": "breadcrumb-separator",
      className: cn("inline-flex items-center opacity-60", className),
      ...props,
      children: children ?? separator
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "span",
    {
      role: "presentation",
      "aria-hidden": "true",
      "data-slot": "breadcrumb-ellipsis",
      className: cn(
        "inline-flex h-5 w-5 items-center justify-center",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function Breadcrumbs({
  items,
  linkComponent: LinkComponent,
  ...props
}) {
  return /* @__PURE__ */ jsx(Breadcrumb, { ...props, children: /* @__PURE__ */ jsx(BreadcrumbList, { children: items.map((item, index) => {
    const current = item.current ?? index === items.length - 1;
    const key = typeof item.label === "string" ? item.label : `${index}:${item.href}`;
    const content = !current && item.href ? LinkComponent ? /* @__PURE__ */ jsx(LinkComponent, { href: item.href, children: item.label }) : /* @__PURE__ */ jsx(BreadcrumbLink, { href: item.href, children: item.label }) : /* @__PURE__ */ jsx(BreadcrumbPage, { children: item.label });
    return /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: content }),
      index < items.length - 1 ? /* @__PURE__ */ jsx(BreadcrumbSeparator, {}) : null
    ] }, key);
  }) }) });
}

// src/components/ui/accordion.tsx
import { ChevronDownIcon } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx2(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx2(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs2(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx2(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx2("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}

// src/components/ui/badge.tsx
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { jsx as jsx3 } from "react/jsx-runtime";
var badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx3(
    Comp,
    {
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}

// src/components/ui/button.tsx
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot2 : "button";
  return /* @__PURE__ */ jsx4(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/ui/card.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}

// src/components/ui/counter.tsx
import gsap from "gsap";
import { Minus, Plus } from "lucide-react";
import * as React2 from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var clampCounterValue = (value, min, max) => Math.min(Math.max(value, min), max);
var normalizeCounterValue = (value, fallback) => {
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
var formatCounterValue = (value) => String(value);
var getCounterRollChars = (from, to) => {
  const fromValue = formatCounterValue(from);
  const toValue = formatCounterValue(to);
  const length = Math.max(fromValue.length, toValue.length);
  return {
    from: fromValue.padStart(length, " "),
    to: toValue.padStart(length, " "),
    value: to
  };
};
var renderCounterChar = (char) => char === " " ? "\xA0" : char;
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
}) {
  const normalizedMin = Number.isFinite(min) ? min : 0;
  const normalizedMax = Number.isFinite(max) ? Math.max(max, normalizedMin) : Number.MAX_SAFE_INTEGER;
  const normalizedStep = Number.isFinite(step) && step > 0 ? step : 1;
  const isControlled = value !== void 0;
  const [uncontrolledValue, setUncontrolledValue] = React2.useState(
    () => clampCounterValue(
      normalizeCounterValue(defaultValue, normalizedMin),
      normalizedMin,
      normalizedMax
    )
  );
  const currentValue = clampCounterValue(
    normalizeCounterValue(
      isControlled ? value : uncontrolledValue,
      normalizedMin
    ),
    normalizedMin,
    normalizedMax
  );
  const [displayValue, setDisplayValue] = React2.useState(currentValue);
  const [roll, setRoll] = React2.useState(null);
  const previousValueRef = React2.useRef(currentValue);
  const valueSlotRef = React2.useRef(null);
  const outgoingValueRefs = React2.useRef([]);
  const incomingValueRefs = React2.useRef([]);
  const rollTimelineRef = React2.useRef(null);
  const [editing, setEditing] = React2.useState(false);
  const [inputValue, setInputValue] = React2.useState(String(currentValue));
  const inputRef = React2.useRef(null);
  React2.useEffect(() => {
    const previousValue = previousValueRef.current;
    if (previousValue !== currentValue) {
      const nextRoll = getCounterRollChars(previousValue, currentValue);
      setRoll({
        direction: currentValue > previousValue ? "up" : "down",
        ...nextRoll
      });
      previousValueRef.current = currentValue;
    }
    if (!editing) {
      setInputValue(String(currentValue));
    }
  }, [currentValue, editing]);
  React2.useLayoutEffect(() => {
    if (!roll) {
      return;
    }
    let finishFrame = null;
    const finishRoll = () => {
      setDisplayValue(roll.value);
      setRoll(null);
    };
    const scheduleFinishRoll = () => {
      finishFrame = window.requestAnimationFrame(finishRoll);
    };
    const valueSlot = valueSlotRef.current;
    const changedIndexes = Array.from(roll.to, (_, index) => index).filter(
      (index) => roll.from[index] !== roll.to[index]
    );
    const outgoingValues = changedIndexes.map((index) => outgoingValueRefs.current[index]).filter((element) => element !== null);
    const incomingValues = changedIndexes.map((index) => incomingValueRefs.current[index]).filter((element) => element !== null);
    if (!valueSlot || changedIndexes.length === 0 || outgoingValues.length !== changedIndexes.length || incomingValues.length !== changedIndexes.length) {
      scheduleFinishRoll();
      return () => {
        if (finishFrame !== null) {
          window.cancelAnimationFrame(finishFrame);
        }
      };
    }
    rollTimelineRef.current?.kill();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      gsap.set([...outgoingValues, ...incomingValues], {
        clearProps: "opacity,transform,visibility"
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
    rollTimelineRef.current = gsap.timeline({
      defaults: {
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto"
      },
      onComplete: () => {
        gsap.set([...outgoingValues, ...incomingValues], {
          clearProps: "opacity,transform,visibility"
        });
        finishRoll();
        rollTimelineRef.current = null;
      }
    }).to(outgoingValues, { autoAlpha: 0, y: exitY }, 0).to(incomingValues, { autoAlpha: 1, y: 0 }, 0);
    return () => {
      if (finishFrame !== null) {
        window.cancelAnimationFrame(finishFrame);
      }
      rollTimelineRef.current?.kill();
      rollTimelineRef.current = null;
    };
  }, [roll]);
  React2.useEffect(
    () => () => {
      rollTimelineRef.current?.kill();
    },
    []
  );
  React2.useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);
  const setNextValue = React2.useCallback(
    (nextValue, commit = true) => {
      const clampedValue = clampCounterValue(
        Math.round(nextValue),
        normalizedMin,
        normalizedMax
      );
      if (!isControlled) {
        setUncontrolledValue(clampedValue);
      }
      onValueChange?.(clampedValue);
      if (commit) {
        onValueCommit?.(clampedValue);
      }
    },
    [isControlled, normalizedMax, normalizedMin, onValueChange, onValueCommit]
  );
  const commitInputValue = React2.useCallback(() => {
    setEditing(false);
    setNextValue(normalizeCounterValue(inputValue, currentValue), true);
  }, [currentValue, inputValue, setNextValue]);
  const canDecrement = !disabled && currentValue > normalizedMin;
  const canIncrement = !disabled && currentValue < normalizedMax;
  const visibleValue = roll ? roll.to : formatCounterValue(displayValue);
  const visibleChars = Array.from(visibleValue);
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      "data-slot": "counter",
      className: cn(
        "inline-flex h-11 items-center gap-3 rounded-full border border-current/10 bg-neutral-950 px-1.5 py-1 text-white shadow-sm",
        disabled && "cursor-not-allowed opacity-55",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx6(
          "button",
          {
            type: "button",
            "aria-label": decrementLabel,
            disabled: !canDecrement,
            onClick: () => setNextValue(currentValue - normalizedStep),
            className: cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current transition duration-150 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:pointer-events-none disabled:opacity-35",
              buttonClassName
            ),
            children: /* @__PURE__ */ jsx6(Minus, { "aria-hidden": "true", className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx6(
          "div",
          {
            "data-slot": "counter-value-slot",
            className: cn(
              "relative flex h-8 min-w-[2ch] items-center justify-center overflow-hidden text-center text-sm font-medium tabular-nums",
              valueClassName
            ),
            children: editing ? /* @__PURE__ */ jsx6(
              "input",
              {
                ref: inputRef,
                "aria-label": valueLabel,
                type: "number",
                inputMode: "numeric",
                min: normalizedMin,
                max: normalizedMax,
                step: normalizedStep,
                value: inputValue,
                disabled,
                onChange: (event) => setInputValue(event.currentTarget.value),
                onBlur: commitInputValue,
                onKeyDown: (event) => {
                  if (event.key === "Enter") {
                    commitInputValue();
                    return;
                  }
                  if (event.key === "Escape") {
                    setInputValue(String(currentValue));
                    setEditing(false);
                  }
                },
                className: cn(
                  "h-full w-full appearance-none border-0 bg-transparent p-0 text-center text-sm font-medium tabular-nums text-current outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                  inputClassName
                )
              }
            ) : /* @__PURE__ */ jsx6(
              "button",
              {
                ref: valueSlotRef,
                type: "button",
                "aria-label": valueLabel,
                disabled,
                onClick: () => setEditing(true),
                className: "relative h-full min-w-[2ch] overflow-hidden text-center outline-none transition focus-visible:ring-2 focus-visible:ring-white/45 disabled:pointer-events-none",
                children: /* @__PURE__ */ jsx6("span", { className: "flex h-full items-center justify-center", children: roll ? Array.from(roll.to, (toChar, index) => {
                  const fromChar = roll.from[index] ?? " ";
                  const changed = fromChar !== toChar;
                  return /* @__PURE__ */ jsxs3(
                    "span",
                    {
                      className: "relative inline-flex h-full w-[1ch] items-center justify-center overflow-hidden",
                      children: [
                        /* @__PURE__ */ jsx6(
                          "span",
                          {
                            ref: (element) => {
                              outgoingValueRefs.current[index] = element;
                            },
                            "aria-hidden": changed ? true : void 0,
                            className: cn(
                              "absolute inset-0 flex items-center justify-center",
                              changed && "will-change-transform"
                            ),
                            children: renderCounterChar(fromChar)
                          }
                        ),
                        changed ? /* @__PURE__ */ jsx6(
                          "span",
                          {
                            ref: (element) => {
                              incomingValueRefs.current[index] = element;
                            },
                            className: "absolute inset-0 flex items-center justify-center will-change-transform",
                            children: renderCounterChar(toChar)
                          }
                        ) : null
                      ]
                    },
                    `${index}-${roll.from}-${roll.to}`
                  );
                }) : visibleChars.map((char, index) => /* @__PURE__ */ jsx6(
                  "span",
                  {
                    className: "inline-flex h-full w-[1ch] items-center justify-center",
                    children: renderCounterChar(char)
                  },
                  `${index}-${char}`
                )) })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx6(
          "button",
          {
            type: "button",
            "aria-label": incrementLabel,
            disabled: !canIncrement,
            onClick: () => setNextValue(currentValue + normalizedStep),
            className: cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-current transition duration-150 hover:scale-105 hover:bg-white/10 active:scale-95 disabled:pointer-events-none disabled:opacity-35",
              buttonClassName
            ),
            children: /* @__PURE__ */ jsx6(Plus, { "aria-hidden": "true", className: "h-4 w-4" })
          }
        )
      ]
    }
  );
}

// src/components/ui/dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx7(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs4(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx7(DialogOverlay, {}),
    /* @__PURE__ */ jsxs4(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxs4(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx7(XIcon, {}),
                /* @__PURE__ */ jsx7("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx7(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}

// src/components/ui/popover.tsx
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx8 } from "react/jsx-runtime";
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx8(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx8(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverAnchor({
  ...props
}) {
  return /* @__PURE__ */ jsx8(PopoverPrimitive.Anchor, { "data-slot": "popover-anchor", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx8(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx8(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}

// src/components/ui/separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx as jsx9 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

// src/components/ui/steps.tsx
import { Check } from "lucide-react";
import * as React3 from "react";
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var getStepStatus = (index, current, overrideStatus, itemStatus) => {
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
var statusClasses = {
  finish: "border-[var(--photon-site-accent,#14b8a6)] bg-[var(--photon-site-accent,#14b8a6)] text-white",
  process: "border-[var(--photon-site-accent,#14b8a6)] bg-[var(--photon-site-background,transparent)] text-[var(--photon-site-accent,#14b8a6)]",
  error: "border-red-500 bg-red-500 text-white",
  wait: "border-[var(--photon-site-border,currentColor)] bg-[color-mix(in_oklab,var(--photon-site-surface,currentColor)_70%,transparent)] text-[var(--photon-site-muted-text,currentColor)]"
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
}) {
  const renderedItems = items ?? React3.Children.toArray(children).filter(React3.isValidElement).map((child) => child.props);
  const horizontal = direction === "horizontal";
  return /* @__PURE__ */ jsx10(
    "ol",
    {
      "data-slot": "steps",
      "data-direction": direction,
      className: cn(
        horizontal ? "flex w-full items-start" : "grid gap-5",
        className
      ),
      ...props,
      children: renderedItems.map((item, index) => {
        const stepStatus = getStepStatus(index, current, status, item.status);
        const clickable = Boolean(onChange) && !item.disabled;
        const isLast = index === renderedItems.length - 1;
        const content = /* @__PURE__ */ jsxs5(Fragment2, { children: [
          /* @__PURE__ */ jsx10(
            "span",
            {
              "data-slot": "step-icon",
              className: cn(
                "relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                animated && "transition-all duration-300 ease-out",
                statusClasses[stepStatus]
              ),
              children: item.icon ?? (stepStatus === "finish" ? /* @__PURE__ */ jsx10(Check, { className: "h-4 w-4" }) : index + 1)
            }
          ),
          /* @__PURE__ */ jsxs5(
            "span",
            {
              "data-slot": "step-content",
              className: cn(
                "min-w-0",
                labelPlacement === "vertical" && horizontal ? "mt-2 text-center" : "ml-3"
              ),
              children: [
                /* @__PURE__ */ jsx10(
                  "span",
                  {
                    "data-slot": "step-title",
                    className: cn(
                      "block text-sm font-semibold",
                      animated && "transition-colors duration-300",
                      stepStatus === "wait" ? "text-[var(--photon-site-muted-text,currentColor)]" : "text-[var(--photon-site-text,currentColor)]",
                      stepStatus === "error" && "text-red-500"
                    ),
                    children: item.title
                  }
                ),
                item.description ? /* @__PURE__ */ jsx10(
                  "span",
                  {
                    "data-slot": "step-description",
                    className: "mt-1 block text-xs leading-5 text-[var(--photon-site-muted-text,currentColor)]",
                    children: item.description
                  }
                ) : null
              ]
            }
          )
        ] });
        return /* @__PURE__ */ jsxs5(
          "li",
          {
            "data-slot": "step",
            "data-status": stepStatus,
            "data-disabled": item.disabled ? "true" : void 0,
            className: cn(
              "relative min-w-0",
              horizontal ? "flex flex-1 items-start" : "flex items-start",
              isLast && horizontal && "flex-none",
              item.disabled && "cursor-default opacity-55"
            ),
            children: [
              clickable ? /* @__PURE__ */ jsx10(
                "button",
                {
                  type: "button",
                  onClick: () => onChange?.(index),
                  className: cn(
                    "flex min-w-0 items-start text-left",
                    clickable && "cursor-pointer",
                    labelPlacement === "vertical" && horizontal && "flex-col items-center"
                  ),
                  children: content
                }
              ) : /* @__PURE__ */ jsx10(
                "div",
                {
                  "aria-disabled": item.disabled || void 0,
                  className: cn(
                    "flex min-w-0 cursor-default items-start",
                    labelPlacement === "vertical" && horizontal && "flex-col items-center"
                  ),
                  children: content
                }
              ),
              !isLast ? /* @__PURE__ */ jsx10(
                "span",
                {
                  "aria-hidden": "true",
                  "data-slot": "step-connector",
                  className: cn(
                    "overflow-hidden",
                    horizontal ? "mx-4 mt-4 h-px flex-1 bg-[var(--photon-site-border,currentColor)]" : "absolute left-4 top-10 h-[calc(100%+0.25rem)] w-px bg-[var(--photon-site-border,currentColor)]"
                  ),
                  children: /* @__PURE__ */ jsx10(
                    "span",
                    {
                      "data-slot": "step-connector-progress",
                      className: cn(
                        "block bg-[var(--photon-site-accent,#14b8a6)]",
                        horizontal ? "h-full origin-left" : "h-full w-full origin-top",
                        animated && "transition-transform duration-300 ease-out",
                        index < current ? "scale-x-100 scale-y-100" : horizontal ? "scale-x-0" : "scale-y-0"
                      )
                    }
                  )
                }
              ) : null
            ]
          },
          item.key ?? index
        );
      })
    }
  );
}
function Step(_props) {
  return null;
}

// src/components/ui/tabs.tsx
import * as React4 from "react";
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
var TabsContext = React4.createContext(void 0);
function useTabs() {
  const context = React4.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a Tabs provider");
  }
  return context;
}
function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}) {
  const [uncontrolledValue, setUncontrolledValue] = React4.useState(defaultValue);
  const triggersRef = React4.useRef(/* @__PURE__ */ new Map());
  const baseId = React4.useId();
  const isControlled = value !== void 0;
  const activeValue = isControlled ? value : uncontrolledValue;
  const handleValueChange = React4.useCallback(
    (nextValue) => {
      if (isControlled) {
        onValueChange?.(nextValue);
        return;
      }
      setUncontrolledValue(nextValue);
    },
    [isControlled, onValueChange]
  );
  const registerTrigger = React4.useCallback(
    (triggerValue, node) => {
      if (node) {
        triggersRef.current.set(triggerValue, node);
        setUncontrolledValue(
          (currentValue) => isControlled || currentValue !== void 0 ? currentValue : triggerValue
        );
        return;
      }
      triggersRef.current.delete(triggerValue);
    },
    [isControlled]
  );
  const getTriggerNode = React4.useCallback(
    (triggerValue) => triggersRef.current.get(triggerValue) ?? null,
    []
  );
  const getTriggerValues = React4.useCallback(
    () => Array.from(triggersRef.current.keys()),
    []
  );
  const contextValue = React4.useMemo(
    () => ({
      activeValue,
      baseId,
      handleValueChange,
      registerTrigger,
      getTriggerNode,
      getTriggerValues
    }),
    [
      activeValue,
      baseId,
      handleValueChange,
      registerTrigger,
      getTriggerNode,
      getTriggerValues
    ]
  );
  return /* @__PURE__ */ jsx11(TabsContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx11(
    "div",
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props,
      children
    }
  ) });
}
function TabsList({
  children,
  className,
  activeClassName,
  indicatorClassName,
  orientation = "horizontal",
  ...props
}) {
  const { activeValue, getTriggerNode } = useTabs();
  const listRef = React4.useRef(null);
  const [indicatorStyle, setIndicatorStyle] = React4.useState(null);
  const updateIndicator = React4.useCallback(() => {
    const list = listRef.current;
    if (!list || activeValue === void 0) {
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
      transform: `translate3d(${triggerRect.left - listRect.left}px, ${triggerRect.top - listRect.top}px, 0)`,
      width: triggerRect.width
    });
  }, [activeValue, getTriggerNode]);
  React4.useLayoutEffect(() => {
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
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      ref: listRef,
      "data-orientation": orientation,
      "data-slot": "tabs-list",
      role: "tablist",
      "aria-orientation": orientation,
      className: cn(
        "bg-muted text-muted-foreground relative inline-flex h-10 w-fit items-center justify-center rounded-lg p-1",
        orientation === "vertical" && "h-fit flex-col",
        className
      ),
      ...props,
      children: [
        indicatorStyle ? /* @__PURE__ */ jsx11(
          "div",
          {
            "data-slot": "tabs-indicator",
            className: cn(
              "bg-background pointer-events-none absolute top-0 left-0 z-0 rounded-sm shadow-sm transition-[transform,width,height] duration-300 ease-in-out",
              activeClassName,
              indicatorClassName
            ),
            style: indicatorStyle
          }
        ) : null,
        children
      ]
    }
  );
}
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
}) {
  const {
    activeValue,
    baseId,
    handleValueChange,
    registerTrigger,
    getTriggerValues,
    getTriggerNode
  } = useTabs();
  const triggerRef = React4.useRef(null);
  const isActive = activeValue === value;
  React4.useEffect(() => {
    registerTrigger(value, triggerRef.current);
    return () => registerTrigger(value, null);
  }, [value, registerTrigger]);
  const selectTriggerAt = React4.useCallback(
    (index) => {
      const values = getTriggerValues();
      if (values.length === 0) {
        return;
      }
      for (let offset = 0; offset < values.length; offset += 1) {
        const normalizedIndex = (index + offset + values.length) % values.length;
        const nextValue = values[normalizedIndex];
        const nextNode = getTriggerNode(nextValue);
        if (!nextNode?.disabled) {
          nextNode?.focus();
          handleValueChange(nextValue);
          return;
        }
      }
    },
    [getTriggerValues, getTriggerNode, handleValueChange]
  );
  const handleKeyDown = (event) => {
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
  return /* @__PURE__ */ jsx11(
    "button",
    {
      ref: triggerRef,
      type: "button",
      id: `${baseId}-trigger-${value}`,
      "data-slot": "tabs-trigger",
      "data-state": isActive ? "active" : "inactive",
      "aria-controls": `${baseId}-content-${value}`,
      "aria-selected": isActive,
      disabled,
      role: "tab",
      tabIndex: isActive ? 0 : -1,
      className: cn(
        "ring-offset-background focus-visible:ring-ring relative z-[1] inline-flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium transition-[color,transform] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
        className
      ),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleValueChange(value);
        }
      },
      onKeyDown: handleKeyDown,
      onPointerDown: (event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) {
          return;
        }
        if (disabled) {
          return;
        }
        event.currentTarget.style.transform = "scale(0.96)";
      },
      onPointerUp: (event) => {
        onPointerUp?.(event);
        event.currentTarget.style.transform = "";
      },
      onPointerCancel: (event) => {
        onPointerCancel?.(event);
        event.currentTarget.style.transform = "";
      },
      onPointerLeave: (event) => {
        onPointerLeave?.(event);
        event.currentTarget.style.transform = "";
      },
      ...props,
      children
    }
  );
}
function TabsContents({ children, className, ...props }) {
  const { activeValue } = useTabs();
  const childrenArray = React4.Children.toArray(children);
  const activeIndex = Math.max(
    childrenArray.findIndex(
      (child) => React4.isValidElement(child) && typeof child.props === "object" && child.props !== null && "value" in child.props && child.props.value === activeValue
    ),
    0
  );
  return /* @__PURE__ */ jsx11(
    "div",
    {
      "data-slot": "tabs-contents",
      className: cn("overflow-hidden", className),
      ...props,
      children: /* @__PURE__ */ jsx11(
        "div",
        {
          "data-slot": "tabs-contents-track",
          className: "-mx-2 flex transition-transform duration-300 ease-in-out",
          style: { transform: `translate3d(${activeIndex * -100}%, 0, 0)` },
          children: childrenArray.map((child, index) => /* @__PURE__ */ jsx11("div", { className: "w-full shrink-0 px-2", children: child }, index))
        }
      )
    }
  );
}
function TabsContent({
  children,
  value,
  className,
  ...props
}) {
  const { activeValue, baseId } = useTabs();
  const isActive = activeValue === value;
  return /* @__PURE__ */ jsx11(
    "div",
    {
      id: `${baseId}-content-${value}`,
      "data-slot": "tabs-content",
      "data-state": isActive ? "active" : "inactive",
      "aria-hidden": !isActive,
      "aria-labelledby": `${baseId}-trigger-${value}`,
      role: "tabpanel",
      tabIndex: isActive ? 0 : -1,
      className: cn(
        "overflow-hidden transition-[filter,opacity] duration-300 ease-in-out data-[state=inactive]:pointer-events-none data-[state=inactive]:blur-[4px] data-[state=inactive]:opacity-70",
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/ui/sonner.tsx
import { Toaster as Sonner } from "sonner";
import { jsx as jsx12 } from "react/jsx-runtime";
var Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx12(
    Sonner,
    {
      theme: "dark",
      position: "top-right",
      closeButton: true,
      richColors: true,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast border border-white/10 bg-slate-950/94 text-white shadow-[0_22px_60px_rgba(2,8,23,0.42)] backdrop-blur-xl",
          title: "text-sm font-semibold text-white",
          description: "text-sm text-white/62",
          actionButton: "group-[.toast]:bg-cyan-300 group-[.toast]:text-slate-950",
          cancelButton: "group-[.toast]:border group-[.toast]:border-white/10 group-[.toast]:bg-white/[0.04] group-[.toast]:text-white/70",
          closeButton: "group-[.toast]:border-white/10 group-[.toast]:bg-white/[0.04] group-[.toast]:text-white/72"
        }
      },
      ...props
    }
  );
};
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Counter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Step,
  Steps,
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
  Toaster,
  badgeVariants,
  buttonVariants,
  cn,
  useTabs
};
