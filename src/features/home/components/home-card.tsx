import { useNavigate } from 'react-router-dom'

export default function HomeCard(props: { label: string; name: string }) {
	const navigate = useNavigate()

	return (
		<div
			className="border-border flex h-fit flex-col items-center justify-center gap-2 rounded-2xl border bg-white p-2"
			onClick={() => navigate(`/${props.name}`)}
		>
			<img className="rounded-t-xl" src={`/games/${props.name}.webp`} />

			<h1 className="text-center font-bold uppercase">{props.label}</h1>
		</div>
	)
}
