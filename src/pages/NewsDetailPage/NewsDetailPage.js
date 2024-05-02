import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNewsDetail } from "../../utils/apiMethods/newsApi";
import NewsDetail from "../../components/NewsDetail/NewsDetail";
import Comments from "../../components/Comments/Comments";
import "./NewsDetailPage.scss";

function NewsDetailPage({ user }) {
	const { id } = useParams();
	const [news, setNews] = useState({});

	useEffect(() => {
		const getNews = async () => {
			const currentNews = await getNewsDetail(id);
			setNews(currentNews);
		};
		getNews();
	}, [id]);

	return (
		<main className="newsdetailpage">
			<Link className="newsdetailpage__link" to={-1}>
				<p>Go Back</p>
			</Link>
			<NewsDetail user={user} news={news} setNews={setNews} />
			<Comments user={user} newsId={id} />
		</main>
	);
}

export default NewsDetailPage;
