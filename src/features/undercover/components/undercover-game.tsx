import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { normalize, pickWinner } from '@/features/undercover/undercover.const'
import { undercoverStore } from '@/features/undercover/undercover.store'
import { ROLES, type Player } from '@/features/undercover/undercover.type'

export default function UndercoverGame() {
	const { stop, words, players, eliminate, winner, setWinner } =
		undercoverStore()

	const [voting, setVoting] = useState<boolean>(false)

	const handleVote = (player: Player) => {
		if (player.die) return
		if (!confirm(`Éliminer ${player.name} ?`)) return

		eliminate(player.id)
		setVoting(false)

		let message = `${player.name} était ${player.role}`

		if (player.role === ROLES.MISTER) {
			const guess = prompt(
				`${player.name} était Mister White !\n\nQuel est le mot des civils ?`,
			)

			if (guess && normalize(guess) === normalize(words?.civil ?? '')) {
				setWinner(ROLES.MISTER)
				return
			}

			message = 'Mauvaise réponse !'
		}

		const state = undercoverStore.getState()
		const result = pickWinner(state.players)

		alert(message)

		if (result) setWinner(result)
	}

	const handleClick = (player: Player) => {
		if (winner) return

		if (voting) {
			handleVote(player)
		} else {
			if (!confirm(`Es-tu bien ${player.name} ?`)) return

			alert(
				`${player.name}, ${player.role === ROLES.MISTER ? 'tu es Mister White' : player.role === ROLES.UNDERCOVER ? `ton mot est ${words.undercover}` : `ton mot est ${words.civil}`}`,
			)
		}
	}

	return (
		<>
			{winner && (
				<span className="text-center text-lg font-bold">
					Victoire : {winner}
				</span>
			)}

			{winner && (
				<>
					<p className="text-center text-sm">
						Civils : <b>{words?.civil}</b>
					</p>

					<p className="text-center text-sm">
						Undercover : <b>{words?.undercover}</b>
					</p>

					<Divider />
				</>
			)}

			<div className="no-scrollbar flex-1 overflow-y-auto">
				<div className="grid grid-cols-3 gap-4">
					{players.map((player) => (
						<div
							key={player.name}
							className={`flex h-20 flex-col items-center justify-center gap-1 rounded-2xl border ${player.die ? 'border-red bg-surface opacity-50' : 'border-border bg-white'} p-2 text-center`}
							onClick={() => handleClick(player)}
						>
							<span className="font-bold">{player.name}</span>

							{(player.die || winner) && (
								<span className="text-xs">{player.role}</span>
							)}
						</div>
					))}
				</div>
			</div>

			<Divider />

			{!winner && (
				<Button
					label={voting ? 'Annuler le vote' : 'Voter'}
					style="light"
					action={() => setVoting(!voting)}
				/>
			)}

			<Button
				label="Quitter"
				style="dark"
				action={() => {
					if (winner || confirm('Voulez-vous vraiment quitter ?')) stop()
				}}
			/>
		</>
	)
}
