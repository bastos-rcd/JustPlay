import { useState } from 'react'

import { NUMBERS } from '@/features/darts/darts.const'
import { dartsStore } from '@/features/darts/darts.store'
import type { Player } from '@/features/darts/darts.type'

export default function DartsTarget(props: { player: Player }) {
	const {
		stop,
		players,
		classment,
		addClassment,
		removeClassment,
		darts,
		addDart,
		removeDart,
	} = dartsStore()

	const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1)

	const handleClick = (value: number, multiplier: number) => {
		const totalScore = value * multiplier

		let label =
			multiplier === 2
				? `D${value}`
				: multiplier === 3
					? `T${value}`
					: `${totalScore}`

		const allPlayerDarts = darts.filter((d) => d.player.id === props.player.id)

		const currentTurnCount = allPlayerDarts.length % 3

		const previousTurnsDarts = allPlayerDarts.slice(
			0,
			allPlayerDarts.length - currentTurnCount,
		)

		const currentTurnDarts = allPlayerDarts.slice(
			allPlayerDarts.length - currentTurnCount,
		)

		const scoreAtStartOfTurn = previousTurnsDarts.reduce(
			(a, b) => a + b.score,
			0,
		)
		const scoreScoredThisTurn = currentTurnDarts.reduce(
			(a, b) => a + b.score,
			0,
		)

		if (301 - (scoreAtStartOfTurn + scoreScoredThisTurn + totalScore) < 0) {
			const dartsToAddCount = 3 - currentTurnCount
			const compensationScore = -scoreScoredThisTurn

			for (let i = 0; i < dartsToAddCount; i++) {
				addDart({
					id: crypto.randomUUID(),
					label: i === 0 ? 'OUT' : '0',
					score: i === 0 ? compensationScore : 0,
					player: props.player,
				})
			}

			return
		}

		if (301 - (scoreAtStartOfTurn + scoreScoredThisTurn + totalScore) === 0) {
			if (!classment.includes(props.player)) {
				addClassment(props.player)
			}

			addDart({
				id: crypto.randomUUID(),
				label,
				score: totalScore,
				player: props.player,
			})

			return
		}

		addDart({
			id: crypto.randomUUID(),
			label,
			score: totalScore,
			player: props.player,
		})
	}

	const handleCancel = () => {
		if (darts.length === 0) return

		const lastDart = darts[darts.length - 1]

		const playerDarts = darts.filter((d) => d.player.id === lastDart.player.id)
		const scoreBeforeCancel = playerDarts.reduce((acc, d) => acc + d.score, 0)

		if (scoreBeforeCancel === 301) {
			const playerInClassment = players.find((p) => p.id === lastDart.player.id)
			if (playerInClassment) removeClassment(playerInClassment.id)
		}

		removeDart(lastDart.id)
	}

	return (
		<div className="grid grid-cols-7 gap-1.5">
			{NUMBERS.map((num) => (
				<button
					key={num}
					className="bg-surface border-border aspect-square rounded-2xl border font-bold disabled:opacity-50"
					onClick={() => {
						handleClick(num, multiplier)
						setMultiplier(1)
					}}
					disabled={num * multiplier > 60}
				>
					{num}
				</button>
			))}

			<button
				className={`bg-blue border-border col-span-2 rounded-2xl border font-bold ${multiplier === 2 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 2 ? 1 : 2)}
			>
				DOUBLE
			</button>

			<button
				className={`bg-green border-border col-span-2 rounded-2xl border font-bold ${multiplier === 3 && 'opacity-50'}`}
				onClick={() => setMultiplier(multiplier === 3 ? 1 : 3)}
			>
				TRIPLE
			</button>

			<button
				className="border-border bg-purple aspect-square rounded-2xl border"
				onClick={() => {
					setMultiplier(1)
					handleCancel()
				}}
			>
				<i className="fa-solid fa-arrow-rotate-left"></i>
			</button>

			<button
				className="border-border bg-red aspect-square rounded-2xl border"
				onClick={() => {
					if (confirm('Voulez-vous vraiment arrêter la partie ?')) stop()
				}}
			>
				<i className="fa-regular fa-circle-xmark fa-lg"></i>
			</button>
		</div>
	)
}
