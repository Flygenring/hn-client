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
			<div className="stories">
				<div className="card">
					<div className="meta">
						<div className="score">731</div>
						<div className="username">gasull</div>
					</div>
					<h2>Local-first software (2019)</h2>
					<div className="url">https://www.inkandswitch.com/essay/local-first/</div>
				</div>
				<div className="card">
					<div className="meta">
						<div className="score">478</div>
						<div className="username">cxr</div>
					</div>
					<h2>Hidden interface controls that affect usability</h2>
					<div className="url">https://interactions.acm.org/archive/view/july-august-2025/stop-hiding-my-controls-hidden-interface-controls-are-affecting-usability</div>
				</div>
				<div className="card">
					<div className="meta">
						<div className="score">228</div>
						<div className="username">agcat</div>
					</div>
					<h2>How to Network as an Introvert</h2>
					<div className="url">https://aginfer.bearblog.dev/how-to-network-as-an-introvert/</div>
				</div>
				<div className="card">
					<div className="meta">
						<div className="score">16</div>
						<div className="username">mattigames</div>
					</div>
					<h2>Ask HN: If AGI were invented tomorrow which countries would fare better?</h2>
					<div className="url"></div>
					<div className="text">I know it's unlikely to be available tomorrow or sometime soon but as an hypothetical question.<p>Also, which countries would fare worse? And why?</p></div>
				</div>
			</div>
		</>
	)
}

export default App
