import { dartsStore } from '@/features/darts/darts.store'
import type { Player } from '@/features/darts/darts.type'

export default function DartsList() {
	const { players, removePlayer } = dartsStore()

	const handleDelete = (player: Player) => {
		if (confirm(`Voulez-vous vraiment retirer ${player.name} ?`)) {
			removePlayer(player.id)
		}
	}

	return (
		<>
			<span className="self-end font-bold">{players.length} joueur(s)</span>

			<div className="no-scrollbar flex-1 overflow-y-auto">
				<div className="grid w-full grid-cols-2 gap-4">
					{players.map((player) => (
						<div
							key={player.id}
							className="border-border bg-surface flex w-full items-center gap-2 rounded-2xl border p-2.5"
							onClick={() => handleDelete(player)}
						>
							<span className="w-full font-bold">{player.name}</span>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
