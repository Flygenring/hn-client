const fetchTopStories = async (): Promise<ApiItemList> =>
	await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())

const fetchItem = async (itemId: number): Promise<ApiItem> =>
	await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
		.then(response => response.json())

export default class {
	static async getTopStories() {
		// Take only the specified number of stories
		const list = (await fetchTopStories()).slice(0, 20)

		// Inflate the list of IDs to hold the corresponding stories, and wait for all promises to
		let storyList = await Promise.all(list.map(async (itemId: number) => await this.getStory(itemId)))

		// Sort the list by score (subtracting 'a' from 'b' gives a descending sort)
		storyList = storyList.sort((a, b) => b.score - a.score)

		return storyList
	}

	static async getStory(storyId: number) {
		const item = await fetchItem(storyId)

		return {
			id: item.id,
			title: item.title,
			username: item.by,
			score: item.score,
			url: item.url
		}
	}
}
