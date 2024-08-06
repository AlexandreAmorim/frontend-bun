import { Slash } from 'lucide-react'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ProfileButton } from './profile-button'
import { ModeToggle } from './theme/mode-toggle'
import { Separator } from './ui/separator'

export function Header() {
	return (
		<div className="mx-auto flex max-w-[1200px] items-center justify-between">
			<div className="flex items-center gap-3">
				<img src={rocketseatIcon} className="size-6 dark:invert" alt="" />
				<Slash className="size-3 -rotate-[24deg] text-ring" />
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					hórus.web
				</h4>
			</div>

			<div className="flex items-center gap-4">
				<ModeToggle />
				<Separator orientation="vertical" className="h-5" />
				<ProfileButton />
			</div>
		</div>
	)
}
