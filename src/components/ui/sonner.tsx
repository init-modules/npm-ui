"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="dark"
			position="top-right"
			closeButton
			richColors
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast border border-white/10 bg-slate-950/94 text-white shadow-[0_22px_60px_rgba(2,8,23,0.42)] backdrop-blur-xl",
					title: "text-sm font-semibold text-white",
					description: "text-sm text-white/62",
					actionButton:
						"group-[.toast]:bg-cyan-300 group-[.toast]:text-slate-950",
					cancelButton:
						"group-[.toast]:border group-[.toast]:border-white/10 group-[.toast]:bg-white/[0.04] group-[.toast]:text-white/70",
					closeButton:
						"group-[.toast]:border-white/10 group-[.toast]:bg-white/[0.04] group-[.toast]:text-white/72",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
