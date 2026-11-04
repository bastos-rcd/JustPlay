import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/main.css'

import App from '@/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
