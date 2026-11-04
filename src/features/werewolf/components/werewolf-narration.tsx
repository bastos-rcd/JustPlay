export default function WerewolfNarration(props: {
	title: string
	text: string
}) {
	return (
		<div className="flex flex-col items-center gap-2 text-center">
			<span className="text-lg font-bold">{props.title}</span>
			<p className="text-sm">{props.text}</p>
		</div>
	)
}
