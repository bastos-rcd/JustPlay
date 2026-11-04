import { undercoverStore } from '@/features/undercover/undercover.store'

import UndercoverGame from '@/features/undercover/components/undercover-game'
import UndercoverSelect from '@/features/undercover/components/undercover-select'
import UndercoverStart from '@/features/undercover/components/undercover-start'

export default function Undercover() {
	const { status, nbCivil, nbUndercover, nbMister, players } = undercoverStore()

	if (!status) return <UndercoverStart />

	if (players.length < nbCivil + nbUndercover + nbMister)
		return <UndercoverSelect />

	return <UndercoverGame />
}
