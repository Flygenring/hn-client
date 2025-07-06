export default function StoryDetails(chosen) {
	return (
		<>
			<div className="content">
				<div className="meta">
					<div className="score">{chosen.story.score}</div>
					<div className="author">
						<div className="username">{chosen.story.author.username}</div>
						<div className="karma">{chosen.story.author.karma}</div>
						<div className="created">{chosen.story.author.created}</div>
					</div>
				</div>
				<h2>{chosen.story.title}</h2>
				<div className="url">{chosen.story.url ? chosen.story.url : '—no URL included in this story—'}</div>
				<div className="link">
					{chosen.story.url && <div>Read more at: <a href={chosen.story.url}>{chosen.story.url}</a></div>}
					{!chosen.story.url && <div>This story has no associated URL.</div>}
				</div>
				{chosen.story.text && <div className="text" dangerouslySetInnerHTML={{__html: chosen.story.text}} />}
			</div>
		</>
	)
}
