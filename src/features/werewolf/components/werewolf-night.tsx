import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'
import { ROLES, type Player } from '@/features/werewolf/werewolf.type'

import WerewolfNarration from '@/features/werewolf/components/werewolf-narration'
import WerewolfPlayers from '@/features/werewolf/components/werewolf-players'

export default function WerewolfNight() {
	const {
		stop,
		night,
		step,
		nextStep,
		players,
		lovers,
		setLovers,
		victim,
		setVictim,
		potions,
		brew,
	} = werewolfStore()

	const [selected, setSelected] = useState<string[]>([])
	const [reveal, setReveal] = useState<boolean>(false)
	const [save, setSave] = useState<boolean>(false)

	const alive = players.filter((p) => !p.die)

	const toggle = (player: Player, max: number) =>
		setSelected((current) => {
			if (current.includes(player.id))
				return current.filter((id) => id !== player.id)
			if (max === 1) return [player.id]
			return current.length < max ? [...current, player.id] : current
		})

	if (step === 'SLEEP')
		return (
			<>
				<div className="flex flex-1 flex-col justify-center">
					<WerewolfNarration
						title={`Nuit ${night}`}
						text="Le village s'endort, tout le monde ferme les yeux."
					/>
				</div>

				<Divider />

				<Button label="La nuit commence" style="light" action={nextStep} />
				<Button
					label="Quitter"
					style="dark"
					action={() => {
						if (confirm('Voulez-vous vraiment quitter ?')) stop()
					}}
				/>
			</>
		)

	if (step === 'CUPID')
		return (
			<>
				<div className="flex min-h-0 flex-1 flex-col gap-4">
					<WerewolfNarration
						title="Cupidon, réveille-toi"
						text="Désigne les deux joueurs qui tomberont amoureux."
					/>

					<WerewolfPlayers
						players={players}
						selected={selected}
						select={(player) => toggle(player, 2)}
					/>
				</div>

				<Divider />

				<Button
					label="Unir"
					style="light"
					disabled={selected.length !== 2}
					action={() => {
						setLovers(selected)
						nextStep()
					}}
				/>
			</>
		)

	if (step === 'LOVERS') {
		const couple = players
			.filter((p) => lovers.includes(p.id))
			.map((p) => p.name)
			.join(' et ')

		return (
			<>
				<div className="flex flex-1 flex-col justify-center">
					<WerewolfNarration
						title="Amoureux, réveillez-vous"
						text={`Cupidon se rendort. Réveille ${couple} : ils se découvrent puis se rendorment.`}
					/>
				</div>

				<Divider />

				<Button
					label="Les amoureux se rendorment"
					style="light"
					action={nextStep}
				/>
			</>
		)
	}

	if (step === 'CLAIRVOYANT') {
		const target = players.find((p) => p.id === selected[0])

		return (
			<>
				<div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
					<WerewolfNarration
						title="Voyante, réveille-toi"
						text={
							reveal && target
								? `${target.name} est ${target.role}.`
								: 'Désigne le joueur dont tu veux connaître le rôle.'
						}
					/>

					{!reveal && (
						<WerewolfPlayers
							players={players}
							selected={selected}
							disabled={(p) => p.die || p.role === ROLES.CLAIRVOYANT}
							select={(player) => toggle(player, 1)}
						/>
					)}
				</div>

				<Divider />

				{!reveal ? (
					<Button
						label="Voir son rôle"
						style="light"
						disabled={selected.length === 0}
						action={() => setReveal(true)}
					/>
				) : (
					<Button label="Se rendormir" style="dark" action={nextStep} />
				)}
			</>
		)
	}

	if (step === 'WEREWOLF') {
		const pack = alive
			.filter((p) => p.role === ROLES.WEREWOLF)
			.map((p) => p.name)
			.join(', ')

		return (
			<>
				<div className="flex min-h-0 flex-1 flex-col gap-4">
					<WerewolfNarration
						title="Loups-Garous, réveillez-vous"
						text={`Meute : ${pack}. Choisissez votre victime.`}
					/>

					<WerewolfPlayers
						players={players}
						selected={selected}
						disabled={(p) => p.die || p.role === ROLES.WEREWOLF}
						select={(player) => toggle(player, 1)}
					/>
				</div>

				<Divider />

				<Button
					label="Dévorer"
					style="light"
					disabled={selected.length === 0}
					action={() => {
						setVictim(selected[0])
						nextStep()
					}}
				/>
			</>
		)
	}

	const target = players.find((p) => p.id === victim)

	return (
		<>
			<div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
				<WerewolfNarration
					title="Sorcière, réveille-toi"
					text={
						target
							? `Les loups ont attaqué ${target.name}.`
							: "Personne n'a été attaqué cette nuit."
					}
				/>

				{potions.life && target && (
					<Button
						label={
							save ? `${target.name} sera sauvé(e)` : `Sauver ${target.name}`
						}
						style={save ? 'dark' : 'default'}
						action={() => setSave(!save)}
					/>
				)}

				{potions.death && (
					<>
						<p className="text-center text-sm">
							Potion de mort : touche un joueur pour l'empoisonner.
						</p>

						<WerewolfPlayers
							players={players}
							selected={selected}
							disabled={(p) => p.die}
							select={(player) => toggle(player, 1)}
						/>
					</>
				)}

				{!potions.life && !potions.death && (
					<p className="text-center text-sm">Tu n'as plus de potion.</p>
				)}
			</div>

			<Divider />

			<Button
				label="Se rendormir"
				style="light"
				action={() => {
					brew(save, selected[0] ?? null)
					nextStep()
				}}
			/>
		</>
	)
}
