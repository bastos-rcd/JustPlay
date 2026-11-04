import HomeCard from '@/features/home/components/home-card'
import { GAMES } from '@/features/home/home.const'

export default function Home() {
	return (
		<div className="no-scrollbar grid grid-cols-2 gap-4 overflow-y-auto">
			{GAMES.map((game, index) => (
				<HomeCard key={index} label={game.label} name={game.name} />
			))}
		</div>
	)
}
