import axios from "axios";

const getCurrentNews = async () => {
	const currentNewsUrl = "http://localhost:8080/news/current";
	try {
		const response = await axios.get(currentNewsUrl);
		response.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
		return response.data;
	} catch (error) {
		console.log(`Failed to get current news list from back-end API with error message: ${error}`);
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
		console.log(`Failed to get archive news list from back-end API with error message: ${error}`);
	}
};

export { getCurrentNews, getArchiveNews };
