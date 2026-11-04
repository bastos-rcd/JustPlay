import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import Counter from '@/components/counter'
import Divider from '@/components/divider'

import { undercoverStore } from '@/features/undercover/undercover.store'

export default function UndercoverStart() {
	const navigate = useNavigate()

	const {
		start,
		nbCivil,
		setNbCivil,
		nbUndercover,
		setNbUndercover,
		nbMister,
		setNbMister,
	} = undercoverStore()

	return (
		<>
			<div className="no-scrollbar flex flex-1 flex-col justify-center gap-4 overflow-y-auto">
				<span className="self-left font-bold underline">
					{nbCivil + nbUndercover + nbMister} joueur(s)
				</span>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Civil</span>

					<Counter
						value={nbCivil}
						change={(value) => setNbCivil(value)}
						min={3}
						max={14}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Undercover</span>

					<Counter
						value={nbUndercover}
						change={(value) => setNbUndercover(value)}
						min={1}
						max={5}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Mister White</span>

					<Counter
						value={nbMister}
						change={(value) => setNbMister(value)}
						min={0}
						max={1}
					/>
				</div>
			</div>

			<Divider />

			<Button
				label="Jouer"
				style="light"
				action={start}
				disabled={nbCivil + nbUndercover + nbMister < 4}
			/>

			<Button label="Quitter" style="dark" action={() => navigate('/')} />
		</>
	)
}
