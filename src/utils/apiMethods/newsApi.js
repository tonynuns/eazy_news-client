import axios from "axios";

const getCurrentNews = async () => {
	const currentNewsUrl = "http://localhost:8080/news/current";
	try {
		const response = await axios.get(currentNewsUrl);
		response.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

const getArchiveNews = async (startDate, endDate) => {
	const archiveNewsUrl = "http://localhost:8080/news/archive";
	try {
		const response = await axios.get(archiveNewsUrl, {
			headers: {
				startDate: new Date(startDate).toISOString(),
				endDate: new Date(endDate).toISOString(),
			},
		});
		response.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

const getNewsDetail = async (newsId) => {
	const newsDetailUrl = `http://localhost:8080/news/${newsId}`;
	try {
		const response = await axios.get(newsDetailUrl);
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

const addViews = async (news) => {
	let { id: newsId, views } = news;
	const newsViewsUrl = `http://localhost:8080/news/${newsId}/views`;
	views++;
	try {
		const response = await axios.post(newsViewsUrl, {
			views,
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

const addLikes = async (news) => {
	let { id: newsId, likes } = news;
	const newsLikesUrl = `http://localhost:8080/news/${newsId}/likes`;
	likes++;
	try {
		const response = await axios.post(newsLikesUrl, {
			likes,
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export { getCurrentNews, getArchiveNews, getNewsDetail, addViews, addLikes };
