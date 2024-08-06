import { getProfile } from '@/api/get-profile'
import { signOut } from '@/api/sign-out'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

function getInitials(name: string): string {
	const initials = name
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase())
		.slice(0, 2)
		.join('')

	return initials
}

export function ProfileButton() {
	const navigate = useNavigate()

	const { data: user, isLoading: isLoadingProfile } = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
	})

	const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
		mutationFn: signOut,
		onSuccess: () => {
			navigate('/sign-in', { replace: true })
		},
	})

	return (
		<DropdownMenu>
			{isLoadingProfile ? (
				<>
					<Skeleton className="h-4 w-40" />
				</>
			) : (
				<>
					<DropdownMenuTrigger className="flex items-center gap-3 outline-none">
						<div className="flex flex-col items-end">
							<span className="text-sm font-medium">{user?.name}</span>
							<span className="text-xs text-muted-foreground">
								{user?.email}
							</span>
						</div>
						<Avatar className="size-10">
							{user?.role && <AvatarImage src={user.role} />}
							{user?.name && (
								<AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
							)}
						</Avatar>
						<ChevronDown className="size-4 text-muted-foreground" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link to="/profile" className="flex items-center">
									<User className="mr-2 h-4 w-4" />
									<span>Meus dados</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								asChild
								className="text-rose-500 dark:text-rose-400"
								disabled={isSigningOut}
							>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button className="w-full" onClick={() => signOutFn()}>
									<LogOut className="mr-2 size-4" />
									<span>Sair</span>
								</button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</>
			)}
		</DropdownMenu>
	)
}
