import {useEffect, useState} from 'react'

import Api from "./service/api.ts";

import './asset/App.css'

function App() {
	const [stories, setStories] = useState([] as Story[]);

	useEffect(() => {
		const getTopStories = async () => {
			const storyList = await Api.getTopStories(20)

			// Commit the list to the state
			setStories(storyList)
		};

		getTopStories()
	}, []);

	return (
		<>
			<h1>Latest top stories from Hacker News</h1>
			{!stories.length && <div className="loader">Loading stories...</div>}
			<div className="stories">
			{stories.map(story => (
				<div className="card" key={story.id}>
					<div className="content">
						<div className="meta">
							<div className="score">{story.score}</div>
							<div className="author">
								<div className="username">{story.author.username}</div>
								<div className="karma">{story.author.karma}</div>
								<div className="created">{story.author.created}</div>
							</div>
						</div>
						<h2>{story.title}</h2>
						<div className="url">{story.url}</div>
						<div className="link">
							Read more at: <a href={story.url}>{story.url}</a>
						</div>
						{story.text && <div className="text" dangerouslySetInnerHTML={{__html: story.text}} />}
					</div>
				</div>
			))}
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
