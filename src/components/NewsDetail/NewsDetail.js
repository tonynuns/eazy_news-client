import formatDate from "../../utils/helperFunctions/formatDate";
import viewsIcon from "../../assets/images/icons/views.svg";
import likesIcon from "../../assets/images/icons/likes.svg";
import { Link } from "react-router-dom";
import "./NewsDetail.scss";

function NewsDetail({ news }) {
	return (
		<div className="newsdetail">
			<div className="newsdetail__img-title-wrapper">
				<div className="newsdetail__img-wrapper">
					<img className="newsdetail__img" src={news.image_url} />
				</div>
				<h2 className="newsdetail__title">{news.title}</h2>
			</div>
			<div className="newsdetail__content-container">
				<div className="newsdetail__source-author-published-wrapper">
					<p className="newsdetail__source">
						<span className="newsdetail__bold">Source:</span> {news.source}
					</p>
					<p className="newsdetail__author">
						<span className="newsdetail__bold">Author:</span>{" "}
						{news.author === null || news.author.startsWith("https") ? "Unknown" : news.author}
					</p>
					<p className="newsdetail__published">
						<span className="newsdetail__bold">Published:</span> {formatDate(news.published_at)}
					</p>
				</div>
				<p className="newsdetail__summary">{news.summary}</p>
				<p className="newsdetail__content">
					{news.content}
					<Link to={news.news_url} target="_blank">
						<p>Read Full Article</p>
					</Link>
				</p>

				<div className="newsdetail__views-likes-wrapper">
					<div className="newsdetail__icon-wrapper newsdetail__icon-wrapper--views">
						<img
							className="newsdetail__icon newsdetail__icon--views"
							src={viewsIcon}
							alt="Views Icon"
						/>
						<span>{news.views}</span>
					</div>
					<div className="newsdetail__icon-wrapper newsdetail__icon-wrapper--likes">
						<img
							className="newsdetail__icon newsdetail__icon--likes"
							src={likesIcon}
							alt="Likes Icon"
						/>
						<span>{news.likes}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewsDetail;
