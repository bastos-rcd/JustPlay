import Button from '@/components/button'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'

import WerewolfNarration from '@/features/werewolf/components/werewolf-narration'
import WerewolfPlayers from '@/features/werewolf/components/werewolf-players'

export default function WerewolfEnd() {
	const { start, stop, players, lovers, winner } = werewolfStore()

	const couple = players
		.filter((p) => lovers.includes(p.id))
		.map((p) => p.name)
		.join(' & ')

	return (
		<>
			<WerewolfNarration
				title={`Victoire : ${winner}`}
				text={couple ? `Amoureux : ${couple}` : 'Rôles de la partie'}
			/>

			<WerewolfPlayers players={players} reveal />

			<Divider />

			<Button label="Rejouer" style="light" action={start} />
			<Button label="Quitter" style="dark" action={stop} />
		</>
	)
}
