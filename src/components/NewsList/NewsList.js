import { useEffect, useState } from "react";
import timeAgo from "../../utils/helperFunctions/timeAgo";
import "./NewsList.scss";

function NewsList({ newsArr }) {
	const [simpleNews, setSimpleNews] = useState([]);

	useEffect(() => {
		const newsSummaryArr = newsArr.map((news) => news.summary);
		const filteredArr = newsArr
			.filter((news, index) => newsSummaryArr.indexOf(news.summary) === index) // remove potential duplicate news articles
			.filter((news) => news.image_url !== null); // remove news articles without a news image
		setSimpleNews(filteredArr);
	}, [newsArr]);

	return (
		<main className="newslist">
			{simpleNews
				.filter((news, index) => index < 120)
				.map((news) => (
					<div key={news.id} className="newslist__container">
						<div className="newslist__img-wrapper">
							<img className="newslist__img" src={news.image_url} alt="News Photo" />
						</div>
						<div className="newslist__text-wrapper">
							<h2 className="newslist__title">{news.title}</h2>
							<p className="newslist__summary">{news.summary}</p>
							<div className="newslist__source-time-wrapper">
								<p className="newslist__source">{news.source}</p>
								<p className="newslist__time">{timeAgo(news.published_at)}</p>
							</div>
						</div>
					</div>
				))}
		</main>
	);
}

export default NewsList;
