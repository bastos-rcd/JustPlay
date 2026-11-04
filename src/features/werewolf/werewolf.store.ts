import { create } from 'zustand'

import { pickRoles } from '@/features/werewolf/werewolf.const'
import type { Player, Role } from '@/features/werewolf/werewolf.type'

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
	eliminate: (id: string) => void

	winner: Role | null
	setWinner: (role: Role | null) => void
}

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
