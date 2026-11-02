import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '@/features/home/home'

import Buzzer from '@/features/buzzer/buzzer'

export default function App() {
	return (
		<Router>
			<main className="mx-auto flex h-dvh max-h-dvh w-full gap-4 self-center sm:w-1/2 lg:w-1/3 xl:w-1/4">
				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4">
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/buzzer" element={<Buzzer />} />
					</Routes>
				</div>
			</main>
		</Router>
	)
}
