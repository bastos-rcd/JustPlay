import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { describe } from '@/features/werewolf/werewolf.const'
import { werewolfStore } from '@/features/werewolf/werewolf.store'
import type { Player } from '@/features/werewolf/werewolf.type'

import WerewolfNarration from '@/features/werewolf/components/werewolf-narration'
import WerewolfPlayers from '@/features/werewolf/components/werewolf-players'

export default function WerewolfDay() {
	const { stop, night, players, lovers, vote } = werewolfStore()

	const [voting, setVoting] = useState<boolean>(false)

	const handleClick = (player: Player) => {
		if (player.die) return

		if (voting) {
			if (!confirm(`Éliminer ${player.name} ?`)) return
			setVoting(false)
			vote(player.id)
			return
		}

		alert(describe(player, players, lovers))
	}

	return (
		<>
			<WerewolfNarration
				title={`Jour ${night}`}
				text={
					voting
						? 'Touche le joueur désigné par le village.'
						: 'Débattez puis votez. Touche un joueur pour consulter son rôle.'
				}
			/>

			<WerewolfPlayers players={players} select={handleClick} />

			<Divider />

			<Button
				label={voting ? 'Annuler le vote' : 'Voter'}
				style="light"
				action={() => setVoting(!voting)}
			/>

			<Button
				label="Quitter"
				style="dark"
				action={() => {
					if (confirm('Voulez-vous vraiment quitter ?')) stop()
				}}
			/>
		</>
	)
}
