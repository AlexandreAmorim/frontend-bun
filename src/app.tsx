import './globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | hórus.web" />
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<Toaster richColors />
					<RouterProvider router={router} />
				</ThemeProvider>
			</QueryClientProvider>
		</HelmetProvider>
	)
}
