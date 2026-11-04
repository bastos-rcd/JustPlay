import { buzzerStore } from '@/features/buzzer/buzzer.store'

export default function BuzzerDuel() {
	const { setWinner } = buzzerStore()

	return (
		<div className="grid flex-1 grid-cols-1 gap-4">
			{['RED', 'BLUE'].map((color, index) => (
				<div
					key={index}
					className={`border-border touch-none rounded-2xl border ${color === 'RED' ? 'bg-red' : 'bg-blue'} p-2`}
					onPointerDown={() => setWinner(color as 'RED' | 'BLUE')}
				></div>
			))}
		</div>
	)
}
