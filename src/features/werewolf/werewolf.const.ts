import { ROLES, type Role } from '@/features/werewolf/werewolf.type'

export function shuffle<T>(array: T[]): T[] {
	const result = [...array]
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[result[i], result[j]] = [result[j], result[i]]
	}
	return result
}

export function pickRoles(
	civils: number,
	werewolfs: number,
	witch: number,
	clairvoyant: number,
	cupid: number,
	thief: number,
	hunter: number,
): Role[] {
	return shuffle([
		...Array.from({ length: civils }, () => ROLES.CIVIL),
		...Array.from({ length: werewolfs }, () => ROLES.WEREWOLF),
		...Array.from({ length: witch }, () => ROLES.WITCH),
		...Array.from({ length: clairvoyant }, () => ROLES.CLAIRVOYANT),
		...Array.from({ length: cupid }, () => ROLES.CUPID),
		...Array.from({ length: thief }, () => ROLES.THIEF),
		...Array.from({ length: hunter }, () => ROLES.HUNTER),
	])
}
