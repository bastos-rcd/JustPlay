import {
	CAMPS,
	ROLES,
	type Camp,
	type Death,
	type Player,
	type Role,
	type Step,
} from '@/features/werewolf/werewolf.type'

import { shuffle } from '@/utils/shuffle'

export const STEPS: Step[] = [
	'SLEEP',
	'CUPID',
	'LOVERS',
	'CLAIRVOYANT',
	'WEREWOLF',
	'WITCH',
]

function hasAlive(players: Player[], role: Role): boolean {
	return players.some((player) => !player.die && player.role === role)
}

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

export function isStepActive(
	step: Step,
	context: { night: number; players: Player[]; lovers: string[] },
): boolean {
	const first = context.night === 1

	switch (step) {
		case 'SLEEP':
			return true
		case 'CUPID':
			return first && hasAlive(context.players, ROLES.CUPID)
		case 'LOVERS':
			return first && context.lovers.length === 2
		case 'CLAIRVOYANT':
			return hasAlive(context.players, ROLES.CLAIRVOYANT)
		case 'WEREWOLF':
			return hasAlive(context.players, ROLES.WEREWOLF)
		case 'WITCH':
			return hasAlive(context.players, ROLES.WITCH)
	}
}

export function applyDeaths(
	players: Player[],
	lovers: string[],
	ids: string[],
): { players: Player[]; deaths: Death[]; hunter: boolean } {
	const dead = new Set(players.filter((p) => p.die).map((p) => p.id))
	const queue: Death[] = ids.map((id) => ({ id, grief: false }))
	const deaths: Death[] = []

	while (queue.length > 0) {
		const death = queue.shift()!
		if (dead.has(death.id)) continue

		dead.add(death.id)
		deaths.push(death)

		if (lovers.includes(death.id)) {
			const other = lovers.find((id) => id !== death.id)
			if (other) queue.push({ id: other, grief: true })
		}
	}

	return {
		players: players.map((p) => (dead.has(p.id) ? { ...p, die: true } : p)),
		deaths,
		hunter: deaths.some(
			(d) => players.find((p) => p.id === d.id)?.role === ROLES.HUNTER,
		),
	}
}

export function pickWinner(players: Player[], lovers: string[]): Camp | null {
	const alive = players.filter((p) => !p.die)

	if (alive.length === 0) return CAMPS.NONE

	const wolves = alive.filter((p) => p.role === ROLES.WEREWOLF).length
	const others = alive.length - wolves

	const couple = players.filter((p) => lovers.includes(p.id))
	const mixed =
		couple.length === 2 &&
		couple.filter((p) => p.role === ROLES.WEREWOLF).length === 1
	if (mixed && alive.length === 2 && alive.every((p) => lovers.includes(p.id)))
		return CAMPS.LOVERS

	if (wolves === 0) return CAMPS.VILLAGE
	if (wolves >= others) return CAMPS.WEREWOLF

	return null
}

export function describe(
	player: Player,
	players: Player[],
	lovers: string[],
): string {
	const partner = lovers.includes(player.id)
		? players.find((p) => p.id !== player.id && lovers.includes(p.id))
		: undefined

	const text = `${player.name} est ${player.role}.`

	return partner ? `${text} Amoureux de ${partner.name}.` : text
}
