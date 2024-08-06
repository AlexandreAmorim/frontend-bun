import { api } from '@/lib/axios'

export interface RegisterUserBody {
	name: string
	gender?: string
	birthday?: string
	document?: string
	document_tertiary?: string
	document_secondary?: string
	document_secondary_data?: string
	document_secondary_org?: string
	document_secondary_uf?: string
	email: string
	ddd?: string
	phone: string
	zip?: string
}

export async function registerUser({
	name,
	gender,
	birthday,
	document,
	document_tertiary,
	document_secondary,
	document_secondary_data,
	document_secondary_org,
	document_secondary_uf,
	email,
	ddd,
	phone,
	zip,
}: RegisterUserBody) {
	await api.post('/users', {
		name,
		gender,
		birthday,
		document,
		document_tertiary,
		document_secondary,
		document_secondary_data,
		document_secondary_org,
		document_secondary_uf,
		email,
		ddd,
		phone,
		zip,
	})
}
