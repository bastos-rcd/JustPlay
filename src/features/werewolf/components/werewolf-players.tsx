import type { Player } from '@/features/werewolf/werewolf.type'

export default function WerewolfPlayers(props: {
	players: Player[]
	selected?: string[]
	disabled?: (player: Player) => boolean
	select?: (player: Player) => void
	reveal?: boolean
}) {
	return (
		<div className="no-scrollbar flex-1 overflow-y-auto">
			<div className="grid grid-cols-3 gap-4">
				{props.players.map((player) => {
					const disabled = props.disabled?.(player) ?? false
					const selected = props.selected?.includes(player.id) ?? false

					return (
						<div
							key={player.id}
							className={`flex h-20 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center ${player.die ? 'border-red bg-surface opacity-50' : selected ? 'border-border bg-pink' : 'border-border bg-white'} ${disabled && !player.die ? 'opacity-50' : ''}`}
							onClick={() => !disabled && props.select?.(player)}
						>
							<span className="font-bold">{player.name}</span>

							{(player.die || props.reveal) && (
								<span className="text-xs">{player.role}</span>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
