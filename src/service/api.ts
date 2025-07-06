const fetchTopStories = async (): Promise<ApiItemList> =>
	await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())

const fetchItem = async (itemId: number): Promise<ApiItem> =>
	await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
		.then(response => response.json())

const fetchUser = async (username: string): Promise<ApiUser> =>
	await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`)
		.then(response => response.json())

export default class {
	static async getTopStories(count: number) {
		// Take only the specified number of stories
		const list = (await fetchTopStories()).slice(0, count)

		// Inflate the list of IDs to hold the corresponding stories, and wait for all promises to
		let storyList = await Promise.all(list.map(async (itemId: number) => await this.getStory(itemId)))

		// Sort the list by score (subtracting 'a' from 'b' gives a descending sort)
		storyList = storyList.sort((a, b) => b.score - a.score)

		return storyList
	}

	static async getStory(storyId: number) {
		const item = await fetchItem(storyId),
			user = await this.getUser(item.by)

		return {
			id: item.id,
			title: item.title,
			author: {
				username: user.id,
				karma: user.karma,
				// Formatting the user creation here seems good, as it's related to stories.
				// 	Multiplying by 1000 because JavaScript does timestamps in milliseconds
				created: new Date(user.created * 1000).toISOString()
					// Only take the date part
					.split("T")[0]
			},
			score: item.score,
			url: item.url,
			text: item.text
		}
	}

	static async getUser(username: string) {
		return await fetchUser(username)
	}
}


/* Typings exclusively used in the API service */
type ApiItemList = number[]

/* From https://github.com/HackerNews/API
	id			The item's unique id.
	deleted		true if the item is deleted.
	type		The type of item. One of "job", "story", "comment", "poll", or "pollopt".
	by			The username of the item's author.
	time		Creation date of the item, in Unix Time.
	text		The comment, story or poll text. HTML.
	dead		true if the item is dead.
	parent		The comment's parent: either another comment or the relevant story.
	poll		The pollopt's associated poll.
	kids		The ids of the item's comments, in ranked display order.
	url			The URL of the story.
	score		The story's score, or the votes for a pollopt.
	title		The title of the story, poll or job. HTML.
	parts		A list of related pollopts, in display order.
	descendants	In the case of stories or polls, the total comment count.
 */
type ApiItem = {
	id: number
	deleted?: boolean
	type: "job" | "story" | "comment" | "poll" | "pollopt"
	by: string
	time: number
	text: string
	dead?: boolean
	parent?: number
	poll?: number[]
	kids?: number[]
	url: string
	score: number
	title: string
	parts?: number[]
	descendants?: number | number[]
}

/* From https://github.com/HackerNews/API
	id			The user's unique username. Case-sensitive. Required.
	created		Creation date of the user, in Unix Time.
	karma		The user's karma.
	about		The user's optional self-description. HTML.
	submitted	List of the user's stories, polls and comments.
 */
type ApiUser = {
	id: string
	created: number
	karma: number
	about: string
	submitted: number[]
}
