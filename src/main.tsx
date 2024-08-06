import React from 'react'
import reactDom from 'react-dom/client'
import { App } from './app.tsx'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
reactDom.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
