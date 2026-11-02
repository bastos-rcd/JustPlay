import { useEffect, useState } from 'react'

import Divider from '@/components/divider'

import { dartsStore } from '@/features/darts/darts.store'
import type { Player } from '@/features/darts/darts.type'

import DartsScore from '@/features/darts/components/darts-score'
import DartsTarget from '@/features/darts/components/darts-target'

export default function DartsGame() {
	const { stop, players, classment, darts } = dartsStore()

	const [current, setCurrent] = useState<Player>()

	useEffect(() => {
		if (darts.length === 0) {
			setCurrent(players[0])
			return
		}

		const last = darts[darts.length - 1]
		const thrown = darts.filter((d) => d.player.id === last.player.id)

		let next: Player | undefined

		const lastPlayerHasFinished = classment.some((p) => p.id === last.player.id)

		if (thrown.length % 3 === 0 || lastPlayerHasFinished) {
			const lastIndex = players.findIndex((p) => p.id === last.player.id)

			let checkIndex = (lastIndex + 1) % players.length

			for (let count = 0; count < players.length; count++) {
				const playerToCheck = players[checkIndex]

				if (!classment.some((p) => p.id === playerToCheck.id)) {
					next = playerToCheck
					break
				}
				checkIndex = (checkIndex + 1) % players.length
			}
		} else {
			next = players.find((p) => p.id === last.player.id)
		}

		if (!next) {
			stop()
			return
		}

		setCurrent(next)
	}, [darts, classment])

	return (
		<>
			<DartsScore current={current ?? players[0]} />

			<Divider />

			<DartsTarget player={current ?? players[0]} />
		</>
	)
}
