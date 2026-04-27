import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Counter,
	Steps,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "./index";

const themes = [
	{
		id: "light-editor",
		label: "Light Editor",
		style: {
			"--photon-site-background": "#f8fafc",
			"--photon-site-surface": "#ffffff",
			"--photon-site-text": "#172033",
			"--photon-site-muted-text": "#5b6575",
			"--photon-site-accent": "#2563eb",
			"--photon-site-border": "#d7deea",
		},
	},
	{
		id: "dark-runtime",
		label: "Dark Runtime",
		style: {
			"--photon-site-background": "#0f172a",
			"--photon-site-surface": "#18233a",
			"--photon-site-text": "#f8fafc",
			"--photon-site-muted-text": "#9fb0c8",
			"--photon-site-accent": "#22c55e",
			"--photon-site-border": "#334155",
		},
	},
] as const;

export const UiPrimitiveMatrix = () => (
	<div className="grid gap-5 bg-neutral-100 p-6">
		{themes.map((theme) => (
			<section
				key={theme.id}
				className="grid gap-4 rounded-lg border p-5"
				data-testid={`ui-package-theme-${theme.id}`}
				style={{
					...theme.style,
					background: "var(--photon-site-background)",
					color: "var(--photon-site-text)",
				}}
			>
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-lg font-semibold">{theme.label}</h2>
					<Counter
						defaultValue={2}
						min={0}
						max={8}
						decrementLabel="Decrease profiles"
						incrementLabel="Increase profiles"
						valueLabel="Profiles"
					/>
				</div>

				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/en">Site</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/en/photon-admin">Workspace</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{theme.label}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<Tabs defaultValue="builder">
					<TabsList>
						<TabsTrigger value="builder">Builder</TabsTrigger>
						<TabsTrigger value="preview">Preview</TabsTrigger>
					</TabsList>
					<TabsContent value="builder">
						Builder controls are visible.
					</TabsContent>
					<TabsContent value="preview">
						Preview controls are visible.
					</TabsContent>
				</Tabs>

				<Steps
					current={1}
					items={[
						{ title: "Draft", description: "Profile exists" },
						{ title: "Review", description: "Theme is checked" },
						{ title: "Publish", description: "Runtime is ready" },
					]}
				/>
			</section>
		))}
	</div>
);

export default {
	title: "Packages/UI/Visual Matrix",
	component: UiPrimitiveMatrix,
	parameters: {
		layout: "fullscreen",
	},
};

export const Themes = {};
