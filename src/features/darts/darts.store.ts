import { create } from 'zustand'

import type { Dart, Player } from '@/features/darts/darts.type'

interface State {
	status: boolean
	start: () => void
	stop: () => void

	players: Player[]
	addPlayer: (name: string) => void
	removePlayer: (id: string) => void

	darts: Dart[]
	addDart: (dart: Dart) => void
	removeDart: (id: string) => void

	classment: Player[]
	addClassment: (player: Player) => void
	removeClassment: (id: string) => void
}

export const dartsStore = create<State>((set) => ({
	status: true,
	start: () => set(() => ({ status: true })),
	stop: () =>
		set(() => ({ status: false, players: [], darts: [], classment: [] })),

	players: [
		{ id: '1', name: 'Bastos' },
		{ id: '2', name: 'Noa' },
	],
	addPlayer: (name: string) =>
		set((state) => ({
			players: [...state.players, { id: crypto.randomUUID(), name }],
		})),
	removePlayer: (id: string) =>
		set((state) => ({
			players: state.players.filter((p) => p.id !== id),
		})),

	darts: [],
	addDart: (dart: Dart) =>
		set((state) => ({
			darts: [...state.darts, dart],
		})),
	removeDart: (id: string) =>
		set((state) => ({
			darts: state.darts.filter((d) => d.id !== id),
		})),

	classment: [],
	addClassment: (player: Player) =>
		set((state) => ({
			classment: [...state.classment, player],
		})),
	removeClassment: (id: string) =>
		set((state) => ({
			classment: state.classment.filter((p) => p.id !== id),
		})),
}))
