import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'
import type { Player } from '@/features/werewolf/werewolf.type'

export default function WerewolfGame() {
	const { stop, players, eliminate, winner, setWinner } = werewolfStore()

	const [voting, setVoting] = useState<boolean>(false)

	const handleVote = (player: Player) => {
		if (player.die) return
		if (!confirm(`Éliminer ${player.name} ?`)) return

		eliminate(player.id)
		setVoting(false)

		alert(`${player.name} était ${player.role}`)
	}

	const handleClick = (player: Player) => {
		if (winner) return

		if (voting) {
			handleVote(player)
		} else {
			if (!confirm(`Es-tu bien ${player.name} ?`)) return

			alert(`${player.name}, tu es ${player.role}`)
		}
	}

	return (
		<>
			{winner && (
				<>
					<span className="text-center text-lg font-bold">
						Victoire : {winner}
					</span>

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
