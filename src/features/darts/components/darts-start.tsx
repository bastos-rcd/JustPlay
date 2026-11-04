import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { dartsStore } from '@/features/darts/darts.store'

import DartsCreate from '@/features/darts/components/darts-create'
import DartsList from '@/features/darts/components/darts-list'

export default function DartsStart() {
	const navigate = useNavigate()

	const { start, players } = dartsStore()

	return (
		<>
			<DartsCreate />

			<DartsList />

			<Divider />

			<Button
				label="Jouer"
				style="light"
				action={start}
				disabled={players.length < 2}
			/>

			<Button label="Quitter" style="dark" action={() => navigate('/')} />
		</>
	)
}
