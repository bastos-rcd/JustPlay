import { dartsStore } from '@/features/darts/darts.store'

import DartsGame from '@/features/darts/components/darts-game'
import DartsStart from '@/features/darts/components/darts-start'

export default function Darts() {
	const { status } = dartsStore()

	if (!status) return <DartsStart />

	return <DartsGame />
}
