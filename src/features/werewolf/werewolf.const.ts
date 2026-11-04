import { ROLES, type Role } from '@/features/werewolf/werewolf.type'

import { shuffle } from '@/utils/shuffle'

export function pickRoles(
	civils: number,
	werewolfs: number,
	witch: number,
	clairvoyant: number,
	cupid: number,
	hunter: number,
): Role[] {
	return shuffle([
		...Array.from({ length: civils }, () => ROLES.CIVIL),
		...Array.from({ length: werewolfs }, () => ROLES.WEREWOLF),
		...Array.from({ length: witch }, () => ROLES.WITCH),
		...Array.from({ length: clairvoyant }, () => ROLES.CLAIRVOYANT),
		...Array.from({ length: cupid }, () => ROLES.CUPID),
		...Array.from({ length: hunter }, () => ROLES.HUNTER),
	])
}
