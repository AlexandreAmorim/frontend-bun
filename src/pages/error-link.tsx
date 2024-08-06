import { Link } from 'react-router-dom'

export function ErrorLink() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Whoops, o link expirou...</h1>
			<p className="text-accent-foreground">Você precisa logar novamente:</p>
			<p className="text-accent-foreground">
				Ir para o{' '}
				<Link to="/" className="text-sky-600 dark:text-sky-400">
					Login
				</Link>
			</p>
		</div>
	)
}
