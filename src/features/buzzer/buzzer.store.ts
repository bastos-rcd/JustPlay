import { create } from 'zustand'

interface State {
	winner: 'RED' | 'BLUE' | null
	setWinner: (winner: 'RED' | 'BLUE' | null) => void
}

export const buzzerStore = create<State>((set) => ({
	winner: null,
	setWinner: (winner) =>
		set((state) => (winner && state.winner ? state : { winner })),
}))
