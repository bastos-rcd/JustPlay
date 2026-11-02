const styles = {
	default: {
		color: 'var(--color-text)',
		backgroundColor: 'var(--color-surface)',
		borderColor: 'var(--color-border)',
	},
	light: {
		color: 'var(--color-text)',
		backgroundColor: 'white',
		borderColor: 'var(--color-border)',
	},
	dark: {
		color: 'white',
		backgroundColor: 'var(--color-text)',
		borderColor: 'var(--color-text)',
	},
}

export default function Button(props: {
	label: string
	style: 'default' | 'light' | 'dark'
	action?: () => void
	type?: 'button' | 'submit'
	disabled?: boolean
}) {
	return (
		<button
			className="rounded-2xl border p-3 font-bold uppercase disabled:opacity-50"
			type={props.type}
			style={styles[props.style]}
			disabled={props.disabled}
			onClick={props.action}
		>
			{props.label}
		</button>
	)
}
