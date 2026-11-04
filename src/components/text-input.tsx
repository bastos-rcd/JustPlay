export default function TextInput(props: {
	label?: string
	value: string
	change: (value: string) => void
}) {
	return (
		<input
			className="border-border w-full rounded-2xl border bg-white px-4 py-3 outline-none"
			type="text"
			placeholder={props.label}
			value={props.value}
			onChange={(e) => props.change(e.target.value)}
		/>
	)
}
