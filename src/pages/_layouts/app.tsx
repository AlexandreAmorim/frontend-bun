import { isAxiosError } from 'axios'
import { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function AppLayout() {
	const navigate = useNavigate()

	useLayoutEffect(() => {
		const interceptorId = api.interceptors.response.use(
			(response) => response,
			(error) => {
				if (isAxiosError(error)) {
					const status = error.response?.status
					const code = error.response?.data.code
					const message = error.response?.data.message

					if (message === 'Unauthorized.') {
						navigate('/sign-in', {
							replace: true,
						})
					}

					if (status === 401 && code === 'UNAUTHORIZED') {
						navigate('/sign-in', {
							replace: true,
						})
					}
				}

				return Promise.reject(error)
			},
		)

		// Clean up the side effect when the component unmounts
		return () => {
			api.interceptors.response.eject(interceptorId)
		}
	}, [navigate])

	return (
		<div className="space-y-4 py-4">
			<Header />
			<main className="mx-auto w-full max-w-[1200px] space-y-4">
				<Outlet />
			</main>
		</div>
	)
}
