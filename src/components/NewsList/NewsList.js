import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsList.scss";

function NewsList({ newsArr }) {
	const [simpleNews, setSimpleNews] = useState([]);

	// save page scroll position in session storage before navigating to news details page
	const saveScrollPos = () => {
		const scrollPos = { x: window.scrollX, y: window.scrollY };
		sessionStorage.setItem("scrollPos", JSON.stringify(scrollPos));
	};
	// restore page scroll position on return to page
	const restoreScrollPos = () => {
		const scrollPos = JSON.parse(sessionStorage.getItem("scrollPos"));
		if (scrollPos) {
			window.scrollTo(scrollPos.x, scrollPos.y);
		}
	};

	useEffect(() => {
		const newsSummaryArr = newsArr.map((news) => news.summary);
		const filteredArr = newsArr
			.filter((news, index) => newsSummaryArr.indexOf(news.summary) === index) // removes potential duplicate news articles
			.filter((news) => news.image_url !== null); // removes news articles without an image
		setSimpleNews(filteredArr);
		restoreScrollPos();
	}, [newsArr]);

	return (
		<main className="newslist">
			{simpleNews
				.filter((news, index) => index < 150) // display the first 150 news articles
				.map((news) => (
					<Link to={`/${news.id}`} key={news.id} className="newslist__link" onClick={saveScrollPos}>
						<NewsCard
							imageUrl={news.image_url}
							title={news.title}
							summary={news.summary}
							source={news.source}
							publishedAt={news.published_at}
							views={news.views}
							likes={news.likes}
						/>
					</Link>
				))}
		</main>
	);
}

export default NewsList;
