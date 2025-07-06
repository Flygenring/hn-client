export default function StoryList(list) {
	return (
		<>
		{list.stories.map((story, index) => (
			<button onClick={() => list.expandStory(list.stories[index])} className="card" key={story.id}>
				<div className="meta">
					<div className="score">{story.score}</div>
					<div className="username">{story.author.username}</div>
				</div>
				<h2>{story.title}</h2>
				<div className="url">{story.url ? story.url : '—no URL included in this story—'}</div>
			</button>
		))}
		</>
	)
}
