import Button from '@/components/button'
import Divider from '@/components/divider'

import { werewolfStore } from '@/features/werewolf/werewolf.store'

import WerewolfNarration from '@/features/werewolf/components/werewolf-narration'

export default function WerewolfReport() {
	const { night, players, deaths, cause, proceed } = werewolfStore()

	const title =
		cause === 'NIGHT'
			? `Jour ${night}`
			: cause === 'VOTE'
				? 'Le village a voté'
				: 'Le Chasseur a tiré'

	const text =
		cause === 'NIGHT'
			? deaths.length === 0
				? "Le village se réveille : personne n'est mort cette nuit."
				: 'Le village se réveille et découvre…'
			: cause === 'VOTE'
				? 'Le village a éliminé…'
				: 'Le Chasseur emporte avec lui…'

	return (
		<>
			<div className="flex flex-1 flex-col items-center justify-center gap-4">
				<WerewolfNarration title={title} text={text} />

				{deaths.map((death) => {
					const player = players.find((p) => p.id === death.id)
					if (!player) return null

					return (
						<span
							key={death.id}
							className="border-border bg-surface rounded-2xl border px-3 py-1.5 text-center font-semibold"
						>
							{player.name} ({player.role})
							{death.grief && ' — mort(e) de chagrin'}
						</span>
					)
				})}
			</div>

			<Divider />

			<Button label="Continuer" style="light" action={proceed} />
		</>
	)
}
