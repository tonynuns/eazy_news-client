import formatDate from "../../utils/helperFunctions/formatDate";
import viewsIcon from "../../assets/images/icons/views.svg";
import likesIcon from "../../assets/images/icons/likes.svg";
import { Link } from "react-router-dom";
import { addViews, addLikes } from "../../utils/apiMethods/newsApi";
import "./NewsDetail.scss";

function NewsDetail({ user, news, setNews }) {
	const handleLikesClick = async () => {
		const newLikesCount = await addLikes(news);
		setNews((previousNews) => ({ ...previousNews, likes: newLikesCount }));
	};

	const handleViewsClick = async () => {
		const newViewsCount = await addViews(news);
		setNews((previousNews) => ({ ...previousNews, views: newViewsCount }));
	};

	return (
		<div className="newsdetail">
			<div className="newsdetail__img-title-wrapper">
				<div className="newsdetail__img-wrapper">
					<img className="newsdetail__img" src={news?.image_url} />
				</div>
				<h2 className="newsdetail__title">{news?.title}</h2>
			</div>
			<div className="newsdetail__content-container">
				<div className="newsdetail__source-author-published-wrapper">
					<p className="newsdetail__source">
						<span className="newsdetail__bold">Source:</span> {news?.source}
					</p>
					<p className="newsdetail__author">
						<span className="newsdetail__bold">Author:</span>{" "}
						{news?.author === null || news?.author?.startsWith("https") ? "Unknown" : news?.author}
					</p>
					<p className="newsdetail__published">
						<span className="newsdetail__bold">Published:</span> {formatDate(news?.published_at)}
					</p>
				</div>
				<p className="newsdetail__summary">{news?.summary}</p>
				<div className="newsdetail__content">
					{news?.content}
					<br />
					<Link
						className="newsdetail__link"
						to={news?.news_url}
						target="_blank"
						rel="noopener noreferrer">
						<p className="newsdetail__link-text" onClick={handleViewsClick}>
							Read Full Article
						</p>
					</Link>
				</div>

				<div className="newsdetail__views-likes-wrapper">
					<div className="newsdetail__icon-wrapper newsdetail__icon-wrapper--likes">
						{user && (
							<img
								className="newsdetail__icon newsdetail__icon--likes newsdetail__icon--user-view"
								src={likesIcon}
								alt="Likes Icon"
								onClick={handleLikesClick}
							/>
						)}
						{!user && (
							<img
								className="newsdetail__icon newsdetail__icon--likes"
								src={likesIcon}
								alt="Likes Icon"
							/>
						)}
						<span>{news?.likes}</span>
					</div>
					<div className="newsdetail__icon-wrapper newsdetail__icon-wrapper--views">
						<img
							className="newsdetail__icon newsdetail__icon--views"
							src={viewsIcon}
							alt="Views Icon"
						/>
						<span>{news?.views}</span>
					</div>
				</div>
				{!user && <p className="newsdetail__warning">Login required to like or add a comment</p>}
			</div>
		</div>
	);
}

export default NewsDetail;
