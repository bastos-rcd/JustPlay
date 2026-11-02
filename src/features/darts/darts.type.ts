export type Player = {
	id: string
	name: string
}

export type Dart = {
	id: string
	label: string
	score: number
	player: Player
}
