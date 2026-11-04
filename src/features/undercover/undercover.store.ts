import { create } from 'zustand'

import { pickRoles, pickWords } from '@/features/undercover/undercover.const'
import type { Player, Role } from '@/features/undercover/undercover.type'

interface State {
	status: boolean
	start: () => void
	stop: () => void

	nbPlayers: { civils: number; undercovers: number; mister: number }
	setNbPlayers: (civils: number, undercovers: number, mister: number) => void

	words: { civil: string; undercover: string }
	roles: Role[]

	players: Player[]
	addPlayer: (name: string, role: Role) => void
	eliminate: (id: string) => void

	winner: Role | null
	setWinner: (role: Role | null) => void
}

export const undercoverStore = create<State>((set) => ({
	status: false,
	start: () =>
		set((state) => ({
			status: true,
			words: pickWords(),
			roles: pickRoles(
				state.nbPlayers.civils,
				state.nbPlayers.undercovers,
				state.nbPlayers.mister,
			),
			players: [],
			winner: null,
		})),
	stop: () =>
		set({
			status: false,
			roles: [],
			players: [],
			winner: null,
		}),

	nbPlayers: { civils: 3, undercovers: 1, mister: 0 },
	setNbPlayers: (civils, undercovers, mister) =>
		set({ nbPlayers: { civils, undercovers, mister } }),

	words: { civil: 'CIVIL', undercover: 'UNDERCOVER' },
	roles: [],

	players: [],
	addPlayer: (name, role) =>
		set((state) => {
			const players = [
				...state.players,
				{
					id: crypto.randomUUID(),
					name,
					role,
					die: false,
				},
			]

			return {
				players,
			}
		}),
	eliminate: (id) =>
		set((state) => {
			const players = state.players.map((player) =>
				player.id === id ? { ...player, die: true } : player,
			)

			return { players }
		}),

	winner: null,
	setWinner: (winner) => set({ winner }),
}))
