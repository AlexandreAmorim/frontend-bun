import { Slash } from 'lucide-react'

import horusIcon from '@/assets/eye.svg'
import { ProfileButton } from './profile-button'
import { ModeToggle } from './theme/mode-toggle'
import { Separator } from './ui/separator'
import { Link } from 'react-router-dom'

export function Header() {
	return (
		<div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
			<Link to="/">
				<div className="flex items-center gap-2">
						<img src={horusIcon} className="size-8 dark:invert" alt="" />
						<Slash className="size-3 -rotate-[24deg] text-ring" />
						<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
							hórus.web
						</h4>	
				</div>
			</Link>

			<div className="flex gap-4">
				<Link to="/">
					<span className="text-xs font-medium text-muted-foreground">
						Operacional
					</span>
				</Link>
				<Link to="/control">
					<span className="text-xs font-medium text-muted-foreground">
						Controle
					</span>
				</Link>
				<Link to="/">
					<span className="text-xs font-medium text-muted-foreground">
						Suporte
					</span>
				</Link>
				<Link to="/">
					<span className="text-xs font-medium text-muted-foreground">
						Nuint
					</span>
				</Link>
			</div>

			<div className="flex items-center gap-4">
				<ModeToggle />
				<Separator orientation="vertical" className="h-5" />
				<ProfileButton />
			</div>
		</div>
	)
}
