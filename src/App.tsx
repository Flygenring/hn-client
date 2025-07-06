import {useEffect, useState} from 'react'

import Api from "./service/api.ts";

import './asset/App.css'

function App() {
	const [stories, setStories] = useState([]);

	useEffect(() => {
		const getTopStories = async () => {
			const storyList = await Api.getTopStories()

			// Commit the list to the state
			setStories(storyList)
		};

		getTopStories()
	}, []);

	return (
		<>
			<h1>Latest top stories from Hacker News</h1>
			<div className="card">
				{stories.join(", ")}
			</div>
		</>
	)
}

export default App
