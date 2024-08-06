import { createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/404'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Home } from './pages/app/home'
import { Profile } from './pages/app/profile'
import { SignIn } from './pages/auth/sign-in'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from './pages/error'
import { ErrorLink } from './pages/error-link'
import { SignUp } from './pages/sign-up'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				path: '/sign-in',
				element: <SignIn />,
			},
		],
	},

	{
		path: '/sign-up',
		element: <SignUp />,
	},
	{
		path: '/error-link',
		element: <ErrorLink />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
