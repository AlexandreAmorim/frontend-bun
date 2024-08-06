import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

const signInSchema = z.object({
	email: z.string().email(),
})

type SignInSchema = z.infer<typeof signInSchema>

export function SignIn() {
	const [searchParams] = useSearchParams()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInSchema>({
		defaultValues: {
			email: searchParams.get('email') ?? '',
		},
	})

	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	})

	async function handleAuthenticate(data: SignInSchema) {
		try {
			await authenticate({ email: data.email })
			toast.success('Enviamos um link de autenticação para seu e-mail.', {
				action: {
					label: 'Reenviar',
					onClick: () => {
						handleAuthenticate(data)
					},
				},
			})
		} catch (err) {
			toast.error('Credenciais inválidas')
		}
	}

	return (
		<>
			<Helmet title="Login" />
			<div className="p-8">
				<Button variant="ghost" asChild className="absolute right-8 top-8">
					<Link to="/sign-up">Novo usuário</Link>
				</Button>

				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">
							Acessar painel
						</h1>
						<p className="text-sm text-muted-foreground">
							Acessar o painel de atividades!
						</p>
					</div>

					<div className="grid gap-6">
						<form onSubmit={handleSubmit(handleAuthenticate)}>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<Label htmlFor="email">Seu e-mail</Label>
									<Input
										id="email"
										type="email"
										autoCapitalize="none"
										autoComplete="email"
										autoCorrect="off"
										{...register('email')}
									/>
								</div>

								<Button type="submit" disabled={isSubmitting}>
									Acessar painel
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
