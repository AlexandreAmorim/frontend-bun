import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const userSchema = z.object({
	name: z.string({
		required_error: 'Nome é obrigatório',
	}),
	gender: z.string({
		required_error: 'Gênero é obrigatório',
	}),
	birthday: z.string({ required_error: 'Data Nascimento é obrigatório' }),
	document: z
		.string({
			required_error: 'Cpf obrigatório',
			invalid_type_error: 'somente números',
		})
		.length(14, 'Cpf obrigatório, somente números'),
	document_tertiary: z.string({
		required_error: 'PIS/PASEP/NIT é obrigatório',
	}),
	document_secondary: z.string({
		required_error: 'Nº da identidade é obrigatório',
	}),
	document_secondary_data: z.string({
		required_error: 'Data emissão é obrigatório',
	}),
	document_secondary_org: z.string({
		required_error: 'Órgão emissão  é obrigatório',
	}),
	document_secondary_uf: z.string({
		required_error: 'UF emissão é obrigatório',
	}),
	email: z
		.string({ required_error: 'Email é obrigatório' })
		.email({ message: 'Email inválido' }),
	ddd: z.string({ required_error: 'DDD é obrigatório' }),
	phone: z
		.string({ required_error: 'Telefone é obrigatório' })
		.min(13, 'Telefone inválido'),
	zip: z.string({ required_error: 'Cep é obrigatório' }),
})

export type UserSchema = z.infer<typeof userSchema>

export function Profile() {
	const navigate = useNavigate()

	const form = useForm<UserSchema>({
		resolver: zodResolver(userSchema),
		mode: 'onChange',
	})

	const { mutateAsync: registerUserFn } = useMutation({
		mutationFn: registerUser,
	})

	const onSubmit = async (payload: UserSchema) => {
		console.log(payload)
		try {
			await registerUserFn({
				name: payload.name,
				gender: payload.gender,
				birthday: payload.birthday,
				document: payload.document,
				document_tertiary: payload.document_tertiary,
				document_secondary: payload.document_secondary,
				document_secondary_data: payload.document_secondary_data,
				document_secondary_org: payload.document_secondary_org,
				document_secondary_uf: payload.document_secondary_uf,
				email: payload.email,
				ddd: payload.ddd,
				phone: payload.phone,
				zip: payload.zip,
			})

			toast.success('Cadastrado com sucesso!', {
				action: {
					label: 'Login',
					onClick: () => navigate(`/sign-in?email=${payload.email}`),
				},
			})
		} catch (error) {
			toast.error('Erro ao cadastrar.')
		}
	}

	return (
		<div className="flex flex-col">
			<Helmet title="Perfil" />
			<div className="py-4">
				<Breadcrumb className="hidden md:flex">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Perfil</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<main className="flex justify-center gap-4 overflow-auto p-4">
				<div className="flex lg:w-[800px]">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid w-full gap-6"
						>
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Dados Pessoais
								</legend>
								<div className="grid gap-3">
									<Label>Nome completo</Label>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														placeholder="Digite o nome completo"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-3">
										<Label htmlFor="model">Gênero</Label>
										<FormField
											control={form.control}
											name="gender"
											render={({ field }) => (
												<FormItem>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Selecione" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="Masculino">
																Masculino
															</SelectItem>
															<SelectItem value="Feminino">Feminino</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label>Data de Nascimento</Label>
										<FormField
											control={form.control}
											name="birthday"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input type="date" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</fieldset>
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Documentação
								</legend>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-3">
										<Label>CPF</Label>
										<FormField
											control={form.control}
											name="document"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="000.000.000-00" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label>PIS/PASEP/NIT</Label>
										<FormField
											control={form.control}
											name="document_tertiary"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="000.00000.00-0" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
								<div className="grid grid-cols-4 gap-4">
									<div className="grid gap-3">
										<Label>Nº da identidade *</Label>
										<FormField
											control={form.control}
											name="document_secondary"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="00000000" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label>Órgão emissão *</Label>
										<FormField
											control={form.control}
											name="document_secondary_org"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="IFP DETRAN etc" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label>UF emissão *</Label>
										<FormField
											control={form.control}
											name="document_secondary_uf"
											render={({ field }) => (
												<FormItem>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Selecione" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="Rj">RJ</SelectItem>
															<SelectItem value="Sp">SP</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label>Data emissão *</Label>
										<FormField
											control={form.control}
											name="document_secondary_data"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder="00/00/0000"
															type="date"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</fieldset>

							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Dados para contato
								</legend>
								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-3">
										<Label>Email</Label>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="Digite seu email" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="top-k">Redigite o e-mail *</Label>
										<Input
											id="top-k"
											type="text"
											placeholder="Redigite seu email"
										/>
									</div>
								</div>

								<fieldset className="grid gap-6 rounded-lg border p-4">
									<legend className="-ml-1 px-1 text-sm font-medium">
										Telefone *
									</legend>
									<div className="grid grid-cols-4 gap-4">
										<div className="grid gap-3">
											<Label>DDD</Label>
											<FormField
												control={form.control}
												name="ddd"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input placeholder="Ex: 21" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-3">
											<Label>Telefone</Label>
											<FormField
												control={form.control}
												name="phone"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input
																placeholder="Digite seu telefone"
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</fieldset>
								<fieldset className="grid gap-6 rounded-lg border p-4">
									<legend className="-ml-1 px-1 text-sm font-medium">
										Endereço
									</legend>
									<div className="grid grid-cols-1 gap-4">
										<div className="grid gap-3">
											<Label htmlFor="model">Logradouro *</Label>
											<Input
												id="top-k"
												type="text"
												placeholder="Digite seu logradouro"
											/>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="grid gap-3">
											<Label htmlFor="top-k">Número *</Label>
											<Input
												id="top-k"
												type="text"
												placeholder="Ex: 123 ou S/N caso não tenha"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="model">Complemento</Label>
											<Input
												id="top-k"
												type="text"
												placeholder="Ex: apto 456"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-k">Bairro *</Label>
											<Input
												id="top-k"
												type="text"
												placeholder="Digite seu bairro"
											/>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div className="grid gap-3">
											<Label htmlFor="top-k">Cidade *</Label>
											<Input
												id="top-k"
												type="text"
												placeholder="Digite sua cidade"
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="model">Estado *</Label>
											<Select defaultValue="system">
												<SelectTrigger>
													<SelectValue placeholder="Selecione" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="system">Rj</SelectItem>
													<SelectItem value="user">Sp</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label>CEP *</Label>
											<FormField
												control={form.control}
												name="zip"
												render={({ field }) => (
													<FormItem>
														<FormControl>
															<Input placeholder="Ex: 00000-000" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</fieldset>
							</fieldset>
							<div className="flex gap-4">
								<Checkbox id="terms" />
								<div className="flex flex-col gap-2">
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Em atendimento aos requisitos da Lei Nº 13.709/18 (Lei Geral
										de Proteção de Dados), estou ciente que os dados acima
										informados serão utilizados, única e exclusivamente, para a
										inscrição e o recrutamento conduzidos pela Secretaria de
										Governo do Estado do Rio de Janeiro – SEGOV, com a
										finalidade de atender ao(s) processo(s) de seleção para o
										qual(is) me candidato, autorizando a utilização dos mesmos.
									</label>
									<label
										htmlFor="terms"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Estou ciente de que para participar das seleções
										disponibilizadas no site, devo, primeiramente, me cadastrar
										no sistema e, depois, efetuar minha inscrição na seleção
										desejada. *
									</label>
								</div>
							</div>
							<div className="flex flex-row justify-end gap-4 py-4">
								<Button
									variant="outline"
									type="submit"
									disabled={form.formState.isSubmitting}
								>
									Salvar
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</main>
		</div>
	)
}
