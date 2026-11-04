export default function Counter(props: {
	value: number
	change: (value: number) => void
	min?: number
	max?: number
}) {
	return (
		<div className="flex flex-row items-center justify-center gap-4">
			<button
				className="border-border flex h-8 w-8 items-center justify-center rounded-xl border bg-white p-3 disabled:opacity-50"
				disabled={props.value === props.min}
				onClick={() => props.change(props.value - 1)}
			>
				<i className="fa-solid fa-minus"></i>
			</button>

			<span className="w-8 text-center font-semibold">{props.value}</span>

			<button
				className="border-border flex h-8 w-8 items-center justify-center rounded-xl border bg-white p-3 disabled:opacity-50"
				disabled={props.value === props.max}
				onClick={() => props.change(props.value + 1)}
			>
				<i className="fa-solid fa-plus"></i>
			</button>
		</div>
	)
}
