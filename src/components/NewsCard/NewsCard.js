import timeAgo from "../../utils/helperFunctions/timeAgo";
import viewsIcon from "../../assets/images/icons/views.svg";
import likesIcon from "../../assets/images/icons/likes.svg";
import "./NewsCard.scss";

function NewsCard({ imageUrl, title, summary, source, publishedAt, views, likes }) {
	return (
		<div className="newscard">
			<div className="newscard__img-wrapper">
				<img className="newscard__img" src={imageUrl} alt="News Photo" />
			</div>
			<div className="newscard__text-wrapper">
				<h2 className="newscard__title">{title}</h2>
				<p className="newscard__summary">{summary}</p>
				<div className="newscard__source-time-wrapper">
					<p className="newscard__source">{source}</p>
					<p className="newscard__time">{timeAgo(publishedAt)}</p>
				</div>
				<div className="newscard__views-likes-wrapper">
					<div className="newscard__icon-wrapper newscard__icon-wrapper--likes">
						<img
							className="newscard__icon newscard__icon--likes"
							src={likesIcon}
							alt="Likes Icon"
						/>
						<span>{likes}</span>
					</div>
					<div className="newscard__icon-wrapper newscard__icon-wrapper--views">
						<img
							className="newscard__icon newscard__icon--views"
							src={viewsIcon}
							alt="Views Icon"
						/>
						<span>{views}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewsCard;
