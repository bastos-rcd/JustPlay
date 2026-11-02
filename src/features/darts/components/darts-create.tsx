import { useState } from 'react'

import Button from '@/components/button'

import { dartsStore } from '@/features/darts/darts.store'

export default function DartsCreate() {
	const { players, addPlayer } = dartsStore()

	const [name, setName] = useState<string>('')

	const handleSubmit = () => {
		if (name.trim().length === 0) {
			return
		}

		if (
			players.some(
				(player) => player.name.toLowerCase() === name.trim().toLowerCase(),
			)
		) {
			alert('Ce joueur existe déjà')
			return
		}

		addPlayer(name.trim())
		setName('')
	}

	return (
		<form
			className="flex flex-row gap-4"
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<input
				className="border-border w-full rounded-2xl border bg-white px-4 py-3 outline-none"
				type="text"
				placeholder="Nom du joueur"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<Button
				label="Ajouter"
				style="default"
				type="submit"
				disabled={name.trim().length === 0}
			/>
		</form>
	)
}
