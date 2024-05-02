import axios from "axios";

const signUpUser = async (formObj) => {
	const signUpUrl = "http://localhost:8080/users/signup";
	const { first_name, last_name, email, password } = formObj;
	try {
		const response = await axios.post(signUpUrl, {
			first_name,
			last_name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

const loginUser = async (formObj) => {
	const loginUrl = "http://localhost:8080/users/login";
	const { email, password } = formObj;
	try {
		const response = await axios.post(loginUrl, {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

const getUserProfile = async (token) => {
	const profileUrl = "http://localhost:8080/users/profile";
	try {
		const response = await axios.get(profileUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		return "error";
	}
};

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

const getNewsComments = async (newsId) => {
	const newsCommentsUrl = `http://localhost:8080/news/${newsId}/comments`;
	try {
		const response = await axios.get(newsCommentsUrl);
		response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

const addNewComment = async (commentObj) => {
	const addCommentUrl = "http://localhost:8080/comments";
	const { comment, user_id, news_id } = commentObj;
	try {
		const response = await axios.post(addCommentUrl, {
			comment,
			user_id,
			news_id,
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export {
	signUpUser,
	loginUser,
	getUserProfile,
	getCurrentNews,
	getArchiveNews,
	getNewsComments,
	addNewComment,
};
