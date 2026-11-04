import { werewolfStore } from '@/features/werewolf/werewolf.store'

import WerewolfGame from '@/features/werewolf/components/werewolf-game'
import WerewolfSelect from '@/features/werewolf/components/werewolf-select'
import WerewolfStart from '@/features/werewolf/components/werewolf-start'

export default function Werewolf() {
	const { status, nbPlayers, players } = werewolfStore()

	if (!status) return <WerewolfStart />

	if (
		players.length <
		nbPlayers.civils +
			nbPlayers.werewolfs +
			nbPlayers.witch +
			nbPlayers.clairvoyant +
			nbPlayers.cupid +
			nbPlayers.hunter
	)
		return <WerewolfSelect />

	return <WerewolfGame />
}
