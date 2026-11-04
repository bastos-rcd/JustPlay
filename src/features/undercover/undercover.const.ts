import { ROLES, type Role } from '@/features/undercover/undercover.type'

// TODO : add more words
const WORDS: [string, string][] = [
	['Pizza', 'Burger'],
	['Café', 'Thé'],
	['Croissant', 'Chocolatine'],
	['Fromage', 'Beurre'],
	['Pomme', 'Poire'],
]

export function shuffle<T>(array: T[]): T[] {
	const result = [...array]
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[result[i], result[j]] = [result[j], result[i]]
	}
	return result
}

export function pickWords(): { civil: string; undercover: string } {
	const [a, b] = WORDS[Math.floor(Math.random() * WORDS.length)]

	return Math.random() < 0.5
		? { civil: a, undercover: b }
		: { civil: b, undercover: a }
}

export function pickRoles(
	civils: number,
	undercovers: number,
	mister: number,
): Role[] {
	return shuffle([
		...Array.from({ length: civils }, () => ROLES.CIVIL),
		...Array.from({ length: undercovers }, () => ROLES.UNDERCOVER),
		...Array.from({ length: mister }, () => ROLES.MISTER),
	])
}
