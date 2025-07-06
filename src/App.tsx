import {useState} from 'react'

import './asset/App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<h1>Latest top stories from Hacker News</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</>
	)
}

export default App
