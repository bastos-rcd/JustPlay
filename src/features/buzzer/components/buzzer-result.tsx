import { useNavigate } from 'react-router-dom'

import Button from '@/components/button'

import { buzzerStore } from '@/features/buzzer/buzzer.store'

export default function BuzzerResult() {
	const navigate = useNavigate()

	const { winner, setWinner } = buzzerStore()

	return (
		<div
			className={`border-border flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border ${winner === 'RED' ? 'bg-red' : 'bg-blue'}`}
		>
			<Button label="Rejouer" style="light" action={() => setWinner(null)} />
			<Button label="Quitter" style="dark" action={() => navigate('/')} />
		</div>
	)
}
