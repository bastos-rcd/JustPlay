import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import Counter from '@/components/counter'
import Divider from '@/components/divider'

import { undercoverStore } from '@/features/undercover/undercover.store'

export default function UndercoverStart() {
	const navigate = useNavigate()

	const { start, nbPlayers, setNbPlayers } = undercoverStore()

	return (
		<>
			<div className="no-scrollbar flex flex-1 flex-col justify-center gap-4 overflow-y-auto">
				<span className="self-left font-bold underline">
					{nbPlayers.civils + nbPlayers.undercovers + nbPlayers.mister}{' '}
					joueur(s)
				</span>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Civil</span>

					<Counter
						value={nbPlayers.civils}
						change={(value) =>
							setNbPlayers(value, nbPlayers.undercovers, nbPlayers.mister)
						}
						min={3}
						max={14}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Undercover</span>

					<Counter
						value={nbPlayers.undercovers}
						change={(value) =>
							setNbPlayers(nbPlayers.civils, value, nbPlayers.mister)
						}
						min={1}
						max={5}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Mister White</span>

					<Counter
						value={nbPlayers.mister}
						change={(value) =>
							setNbPlayers(nbPlayers.civils, nbPlayers.undercovers, value)
						}
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
				disabled={
					nbPlayers.civils + nbPlayers.undercovers + nbPlayers.mister < 4
				}
			/>

			<Button label="Quitter" style="dark" action={() => navigate('/')} />
		</>
	)
}
