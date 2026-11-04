import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'
import { ROLES } from '@/features/werewolf/werewolf.type'

import WerewolfNarration from '@/features/werewolf/components/werewolf-narration'
import WerewolfPlayers from '@/features/werewolf/components/werewolf-players'

export default function WerewolfHunter() {
	const { players, shoot } = werewolfStore()

	const [selected, setSelected] = useState<string | null>(null)

	const hunter = players.find((p) => p.role === ROLES.HUNTER)

	return (
		<>
			<div className="flex min-h-0 flex-1 flex-col gap-4">
				<WerewolfNarration
					title="Le Chasseur est mort"
					text={`${hunter?.name}, désigne le joueur que tu emportes avec toi.`}
				/>

				<WerewolfPlayers
					players={players}
					selected={selected ? [selected] : []}
					disabled={(p) => p.die}
					select={(player) =>
						setSelected(selected === player.id ? null : player.id)
					}
				/>
			</div>

			<Divider />

			<Button
				label="Tirer"
				style="light"
				disabled={!selected}
				action={() => selected && shoot(selected)}
			/>
		</>
	)
}
