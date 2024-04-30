import "./Comments.scss";

function Comments() {
	return (
		<div className="addcomment">
			<textarea
				className="addcomment__input"
				type="text"
				name="comment"
				placeholder="Add a new comment"
			/>
			<button className="addcomment__btn btn">Submit</button>
		</div>
	);
}

export default Comments;
