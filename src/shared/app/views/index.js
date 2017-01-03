import html from 'choo/html'

const main = (state, prev, send) => {
	return html`
		<main class="app">
			<h1>Welcome to Firefox WebExtension</h1>
			<h2>Current time : ${state.time.toLocaleString()}</h2>
		</main>
	`
}

export default main