const fetchTopStories = async () =>
	await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
		.then(response => response.json())

export default class {
	static async getTopStories() {
		const list = await fetchTopStories()

		return list.slice(0, 20)
	}
}
