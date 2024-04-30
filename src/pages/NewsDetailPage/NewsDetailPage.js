import { useLocation, Link } from "react-router-dom";
import NewsDetail from "../../components/NewsDetail/NewsDetail";
import Comments from "../../components/Comments/Comments";
import "./NewsDetailPage.scss";

function NewsDetailPage() {
	const location = useLocation();
	const { news } = location.state;

	return (
		<main className="newsdetailpage">
			<Link to={-1}>
				<p>Go Back</p>
			</Link>
			<NewsDetail news={news} />
			<Comments />
		</main>
	);
}

export default NewsDetailPage;
