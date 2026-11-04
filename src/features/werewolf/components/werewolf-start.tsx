import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'
import Counter from '@/components/counter'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'

export default function WerewolfStart() {
	const navigate = useNavigate()

	const { start, nbPlayers, setNbPlayers } = werewolfStore()

	return (
		<>
			<div className="no-scrollbar flex flex-1 flex-col justify-center gap-4 overflow-y-auto">
				<span className="self-left font-bold underline">
					{nbPlayers.civils +
						nbPlayers.werewolfs +
						nbPlayers.witch +
						nbPlayers.clairvoyant +
						nbPlayers.cupid +
						nbPlayers.hunter}{' '}
					joueur(s)
				</span>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Villageois</span>

					<Counter
						value={nbPlayers.civils}
						change={(value) =>
							setNbPlayers(
								value,
								nbPlayers.werewolfs,
								nbPlayers.witch,
								nbPlayers.clairvoyant,
								nbPlayers.cupid,
								nbPlayers.hunter,
							)
						}
						min={2}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Loup-Garou</span>

					<Counter
						value={nbPlayers.werewolfs}
						change={(value) =>
							setNbPlayers(
								nbPlayers.civils,
								value,
								nbPlayers.witch,
								nbPlayers.clairvoyant,
								nbPlayers.cupid,
								nbPlayers.hunter,
							)
						}
						min={1}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Sorcière</span>

					<Counter
						value={nbPlayers.witch}
						change={(value) =>
							setNbPlayers(
								nbPlayers.civils,
								nbPlayers.werewolfs,
								value,
								nbPlayers.clairvoyant,
								nbPlayers.cupid,
								nbPlayers.hunter,
							)
						}
						min={0}
						max={1}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Voyante</span>

					<Counter
						value={nbPlayers.clairvoyant}
						change={(value) =>
							setNbPlayers(
								nbPlayers.civils,
								nbPlayers.werewolfs,
								nbPlayers.witch,
								value,
								nbPlayers.cupid,
								nbPlayers.hunter,
							)
						}
						min={0}
						max={1}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Cupidon</span>

					<Counter
						value={nbPlayers.cupid}
						change={(value) =>
							setNbPlayers(
								nbPlayers.civils,
								nbPlayers.werewolfs,
								nbPlayers.witch,
								nbPlayers.clairvoyant,
								value,
								nbPlayers.hunter,
							)
						}
						min={0}
						max={1}
					/>
				</div>

				<div className="flex flex-row items-center justify-between gap-4">
					<span className="font-semibold">Chasseur</span>

					<Counter
						value={nbPlayers.hunter}
						change={(value) =>
							setNbPlayers(
								nbPlayers.civils,
								nbPlayers.werewolfs,
								nbPlayers.witch,
								nbPlayers.clairvoyant,
								nbPlayers.cupid,
								value,
							)
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
					nbPlayers.civils +
						nbPlayers.werewolfs +
						nbPlayers.witch +
						nbPlayers.clairvoyant +
						nbPlayers.cupid +
						nbPlayers.hunter <
					4
				}
			/>

			<Button label="Quitter" style="dark" action={() => navigate('/')} />
		</>
	)
}
