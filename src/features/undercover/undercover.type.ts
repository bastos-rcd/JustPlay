export const ROLES = {
	CIVIL: 'Civil',
	UNDERCOVER: 'Undercover',
	MISTER: 'Mister White',
} as const
export type Role = (typeof ROLES)[keyof typeof ROLES]

export type Player = {
	id: string
	name: string
	role: Role
	die: boolean
}
