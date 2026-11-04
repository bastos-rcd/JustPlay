import { create } from 'zustand'

import {
	applyDeaths,
	isStepActive,
	pickRoles,
	pickWinner,
	STEPS,
} from '@/features/werewolf/werewolf.const'
import {
	type Camp,
	type Cause,
	type Death,
	type Phase,
	type Player,
	type Role,
	type Step,
} from '@/features/werewolf/werewolf.type'

interface State {
	status: boolean
	start: () => void
	stop: () => void

	nbPlayers: {
		civils: number
		werewolfs: number
		witch: number
		clairvoyant: number
		cupid: number
		hunter: number
	}
	setNbPlayers: (
		civils: number,
		werewolfs: number,
		witch: number,
		clairvoyant: number,
		cupid: number,
		hunter: number,
	) => void

	roles: Role[]

	players: Player[]
	addPlayer: (name: string, role: Role) => void

	phase: Phase
	night: number
	step: Step
	nextStep: () => void

	lovers: string[]
	setLovers: (ids: string[]) => void

	victim: string | null
	setVictim: (id: string) => void

	potions: { life: boolean; death: boolean }
	poisoned: string | null
	brew: (save: boolean, poison: string | null) => void

	deaths: Death[]
	cause: Cause
	next: 'DAY' | 'NIGHT'
	hunter: boolean
	vote: (id: string) => void
	shoot: (id: string) => void
	proceed: () => void

	winner: Camp | null
}

type Game = Pick<
	State,
	| 'players'
	| 'phase'
	| 'night'
	| 'step'
	| 'lovers'
	| 'victim'
	| 'potions'
	| 'poisoned'
	| 'deaths'
	| 'cause'
	| 'next'
	| 'hunter'
	| 'winner'
>

const initialGame = (): Game => ({
	players: [],
	phase: 'NIGHT',
	night: 1,
	step: 'SLEEP',
	lovers: [],
	victim: null,
	potions: { life: true, death: true },
	poisoned: null,
	deaths: [],
	cause: 'NIGHT',
	next: 'DAY',
	hunter: false,
	winner: null,
})

export const werewolfStore = create<State>((set) => ({
	status: false,
	start: () =>
		set((state) => ({
			status: true,
			roles: pickRoles(
				state.nbPlayers.civils,
				state.nbPlayers.werewolfs,
				state.nbPlayers.witch,
				state.nbPlayers.clairvoyant,
				state.nbPlayers.cupid,
				state.nbPlayers.hunter,
			),
			...initialGame(),
		})),
	stop: () => set({ status: false, roles: [], ...initialGame() }),

	nbPlayers: {
		civils: 2,
		werewolfs: 1,
		witch: 1,
		clairvoyant: 0,
		cupid: 0,
		hunter: 0,
	},
	setNbPlayers: (civils, werewolfs, witch, clairvoyant, cupid, hunter) =>
		set({
			nbPlayers: {
				civils,
				werewolfs,
				witch,
				clairvoyant,
				cupid,
				hunter,
			},
		}),

	roles: [],
	...initialGame(),

	addPlayer: (name, role) =>
		set((state) => ({
			players: [
				...state.players,
				{ id: crypto.randomUUID(), name, role, die: false },
			],
		})),

	nextStep: () =>
		set((state) => {
			const following = STEPS.slice(STEPS.indexOf(state.step) + 1).find(
				(step) => isStepActive(step, state),
			)

			if (following) return { step: following }

			// Fin de la nuit : on applique la victime des loups et le poison
			const killed = [state.victim, state.poisoned].filter(
				(id): id is string => id !== null,
			)
			const { players, deaths, hunter } = applyDeaths(
				state.players,
				state.lovers,
				killed,
			)

			return {
				phase: 'REPORT',
				players,
				deaths,
				hunter,
				cause: 'NIGHT',
				next: 'DAY',
				victim: null,
				poisoned: null,
			}
		}),

	setLovers: (ids) => set({ lovers: ids }),

	setVictim: (id) => set({ victim: id }),

	brew: (save, poison) =>
		set((state) => ({
			victim: save ? null : state.victim,
			poisoned: poison,
			potions: {
				life: state.potions.life && !save,
				death: state.potions.death && !poison,
			},
		})),

	vote: (id) =>
		set((state) => {
			const { players, deaths, hunter } = applyDeaths(
				state.players,
				state.lovers,
				[id],
			)

			return {
				phase: 'REPORT',
				players,
				deaths,
				hunter,
				cause: 'VOTE',
				next: 'NIGHT',
			}
		}),

	shoot: (id) =>
		set((state) => {
			const { players, deaths } = applyDeaths(state.players, state.lovers, [id])

			return {
				phase: 'REPORT',
				players,
				deaths,
				hunter: false,
				cause: 'HUNTER',
			}
		}),

	proceed: () =>
		set((state) => {
			if (state.hunter) return { phase: 'HUNTER' }

			const winner = pickWinner(state.players, state.lovers)
			if (winner) return { phase: 'END', winner }

			if (state.next === 'DAY') return { phase: 'DAY' }

			return { phase: 'NIGHT', night: state.night + 1, step: 'SLEEP' }
		}),
}))
