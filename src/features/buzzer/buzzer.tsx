import { useEffect } from 'react'

import { buzzerStore } from '@/features/buzzer/buzzer.store'

import BuzzerDuel from '@/features/buzzer/components/buzzer-duel'
import BuzzerResult from '@/features/buzzer/components/buzzer-result'

export default function Buzzer() {
	const { winner, setWinner } = buzzerStore()

	useEffect(() => {
		setWinner(null)
	}, [])

	if (!winner) return <BuzzerDuel />

	return <BuzzerResult />
}
