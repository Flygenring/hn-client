import {useEffect, useState} from 'react'

import StoryList from "./component/StoryList.tsx";
import StoryDetails from "./component/StoryDetails.tsx";

import Api from "./service/api.ts";

import './asset/App.css'

function App() {
	const [stories, setStories] = useState([] as Story[]);
	const [story, expandStory] = useState({} as Story);

	useEffect(() => {
		// Get the story list and commit it to the state
		const getTopStories = async () => {
			setStories(await Api.getTopStories(20))
		};

		getTopStories()
	}, []);

	return (
		<>
			<h1>Latest top stories from Hacker News</h1>

			<div className="story-view">
				<div className="stories">
					{stories.length === 0 && <div className="loader">Loading stories...</div>}
					{stories.length > 0 && <StoryList stories={stories} expandStory={expandStory} />}
				</div>

				<div className="story-details">
					{!!story.id && <StoryDetails story={story}/>}
				</div>
			</div>
		</>
	)
}

export default App


/* Typings exclusively used in the main app */
type Story = {
	id: number
	title: string
	author: User
	score: number
	url: string
	text?: string
}

type User = {
	username: string
	karma: number
	created: string
}
