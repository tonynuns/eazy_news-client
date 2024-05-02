import { useState, useEffect } from "react";
import { getNewsComments, addNewComment } from "../../utils/apiMethods/easyNewsApi";
import deleteIcon from "../../assets/images/icons/delete_outline-24px.svg";
import timeAgo from "../../utils/helperFunctions/timeAgo";
import "./Comments.scss";

function Comments({ user, newsId }) {
	const [commentsArr, setCommentsArr] = useState([]);
	const [comment, setComment] = useState("");
	const [newCommentObj, setNewCommentObj] = useState({});

	useEffect(() => {
		const fetchComments = async () => {
			const newsCommentsArr = await getNewsComments(newsId);
			setCommentsArr(newsCommentsArr);
		};
		fetchComments();
	}, [newsId, newCommentObj]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const commentObj = {
			comment: comment,
			user_id: user.id,
			news_id: newsId,
		};
		const newCommentObj = await addNewComment(commentObj);
		setNewCommentObj(newCommentObj);
		e.target.reset();
	};

	return (
		<main className="comment">
			{user && (
				<form className="comment__addcomment" onSubmit={handleSubmit}>
					<textarea
						className="comment__input"
						type="text"
						name="comment"
						placeholder="Add a new comment"
						required
						onChange={(e) => setComment(e.target.value)}
					/>
					<button className="comment__btn btn">Submit</button>
				</form>
			)}
			{commentsArr?.length > 0 && (
				<div className="comment__comment-container">
					<h3 className="comment__count">
						Comments: <span className="comment__count-num">{commentsArr?.length}</span>
					</h3>
					{commentsArr?.map((comment) => (
						<div key={comment.id} className="comment__comment-wrapper">
							<div className="comment__name-time-wrapper">
								<p className="comment__name">
									{comment.first_name} {comment.last_name[0]}.
								</p>
								<p className="comment__time">{timeAgo(comment.updated_at)}</p>
							</div>
							<p className="comment__comment">{comment.comment}</p>
							{user?.id === comment.user_id && (
								<div className="comment__delete-wrapper">
									<img className="comment__delete" src={deleteIcon} alt="Delete Icon" />
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</main>
	);
}

export default Comments;
