import { werewolfStore } from '@/features/werewolf/werewolf.store'

import WerewolfDay from '@/features/werewolf/components/werewolf-day'
import WerewolfEnd from '@/features/werewolf/components/werewolf-end'
import WerewolfHunter from '@/features/werewolf/components/werewolf-hunter'
import WerewolfNight from '@/features/werewolf/components/werewolf-night'
import WerewolfReport from '@/features/werewolf/components/werewolf-report'

export default function WerewolfGame() {
	const { phase, night, step } = werewolfStore()

	switch (phase) {
		case 'NIGHT':
			return <WerewolfNight key={`${night}-${step}`} />
		case 'REPORT':
			return <WerewolfReport />
		case 'HUNTER':
			return <WerewolfHunter />
		case 'DAY':
			return <WerewolfDay />
		case 'END':
			return <WerewolfEnd />
	}
}
