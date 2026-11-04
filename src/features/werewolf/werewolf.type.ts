export const ROLES = {
	CIVIL: 'Villageois',
	WEREWOLF: 'Loup-Garou',
	WITCH: 'Sorcière',
	CLAIRVOYANT: 'Voyante',
	CUPID: 'Cupidon',
	THIEF: 'Voleur',
	HUNTER: 'Chasseur',
} as const
export type Role = (typeof ROLES)[keyof typeof ROLES]

export type Player = {
	id: string
	name: string
	role: Role
	die: boolean
}
