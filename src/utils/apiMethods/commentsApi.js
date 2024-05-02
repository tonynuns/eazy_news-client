import axios from "axios";

const getComments = async (newsId) => {
	const newsCommentsUrl = `http://localhost:8080/comments`;
	try {
		const response = await axios.get(newsCommentsUrl, {
			headers: { id: newsId },
		});
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

const deleteComment = async (commentId) => {
	const deleteCommentUrl = `http://localhost:8080/comments/${commentId}`;
	try {
		const response = await axios.delete(deleteCommentUrl);
		return response.data;
	} catch (error) {
		console.log(error.response.data.message);
	}
};

export { getComments, addNewComment, deleteComment };
