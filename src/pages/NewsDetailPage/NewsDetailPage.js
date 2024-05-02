import { useLocation, Link } from "react-router-dom";
import NewsDetail from "../../components/NewsDetail/NewsDetail";
import Comments from "../../components/Comments/Comments";
import "./NewsDetailPage.scss";

function NewsDetailPage({ user }) {
	const location = useLocation();
	const { news } = location.state;

	return (
		<main className="newsdetailpage">
			<Link className="newsdetailpage__link" to={-1}>
				<p>Go Back</p>
			</Link>
			<NewsDetail news={news} />
			<Comments user={user} newsId={news.id} />
		</main>
	);
}

export default NewsDetailPage;
