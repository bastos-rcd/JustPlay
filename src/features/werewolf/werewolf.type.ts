export const ROLES = {
	CIVIL: 'Villageois',
	WEREWOLF: 'Loup-Garou',
	WITCH: 'Sorcière',
	CLAIRVOYANT: 'Voyante',
	CUPID: 'Cupidon',
	HUNTER: 'Chasseur',
} as const
export type Role = (typeof ROLES)[keyof typeof ROLES]

export const CAMPS = {
	VILLAGE: 'Villageois',
	WEREWOLF: 'Loups-Garous',
	LOVERS: 'Amoureux',
	NONE: 'Personne',
} as const
export type Camp = (typeof CAMPS)[keyof typeof CAMPS]

export type Phase = 'NIGHT' | 'REPORT' | 'HUNTER' | 'DAY' | 'END'

export type Step =
	'SLEEP' | 'CUPID' | 'LOVERS' | 'CLAIRVOYANT' | 'WEREWOLF' | 'WITCH'

export type Cause = 'NIGHT' | 'VOTE' | 'HUNTER'

export type Death = {
	id: string
	grief: boolean
}

export type Player = {
	id: string
	name: string
	role: Role
	die: boolean
}
