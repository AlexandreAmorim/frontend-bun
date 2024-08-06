import { Outlet } from 'react-router-dom'

export function AuthLayout() {
	return (
		<div className="container relative min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
				<div className="flex items-center gap-3 text-lg font-medium text-foreground">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
						hórus.web
					</h4>
				</div>
				<div className="mt-auto">
					<footer className="text-sm">
						Secretaria de Governo &copy;hórus.web - {new Date().getFullYear()}
					</footer>
				</div>
			</div>

			<div className="flex min-h-screen flex-col items-center justify-center">
				<Outlet />
			</div>
		</div>
	)
}
