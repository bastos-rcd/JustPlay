import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '@/features/home/home'

import Buzzer from '@/features/buzzer/buzzer'
import Darts from '@/features/darts/darts'
import Undercover from '@/features/undercover/undercover'

export default function App() {
	return (
		<Router>
			<main className="mx-auto flex h-dvh max-h-dvh w-full gap-4 self-center sm:w-1/2 lg:w-1/3 xl:w-1/4">
				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/buzzer" element={<Buzzer />} />
						<Route path="/darts" element={<Darts />} />
						<Route path="/undercover" element={<Undercover />} />
					</Routes>
				</div>
			</main>
		</Router>
	)
}
