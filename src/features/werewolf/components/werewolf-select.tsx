import { useState } from 'react'

import Button from '@/components/button'
import Divider from '@/components/divider'
import TextInput from '@/components/text-input'

import { werewolfStore } from '@/features/werewolf/werewolf.store'

export default function WerewolfSelect() {
	const { roles, players, addPlayer } = werewolfStore()

	const [name, setName] = useState<string>('')
	const [reveal, setReveal] = useState<boolean>(false)

	const role = roles[players.length]
	const trimmed = name.trim()
	const taken = players.some(
		(player) => player.name.toLowerCase() === trimmed.toLowerCase(),
	)
	const validate = trimmed.length > 0 && !taken

	const next = () => {
		addPlayer(trimmed, role)
		setName('')
		setReveal(false)
	}

	return (
		<>
			<div className="flex flex-1 flex-col items-center justify-center gap-4">
				{!reveal ? (
					<>
						<TextInput
							label="Nom du joueur"
							value={name}
							change={(value) => setName(value)}
						/>

						{taken && (
							<span className="text-red font-bold">Prénom déjà pris</span>
						)}
					</>
				) : (
					<>
						<span className="border-border rounded-2xl border bg-white px-3 py-1.5 font-semibold">
							{trimmed}, tu es {role}
						</span>
					</>
				)}
			</div>

			<Divider />

			{!reveal ? (
				<Button
					label="Voir mon rôle"
					style="light"
					disabled={!validate}
					action={() => setReveal(true)}
				/>
			) : (
				<Button label="Terminé, je passe" style="dark" action={next} />
			)}
		</>
	)
}
