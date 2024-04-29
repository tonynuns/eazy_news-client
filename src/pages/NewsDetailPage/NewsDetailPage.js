import { useLocation, Link } from "react-router-dom";
import NewsDetail from "../../components/NewsDetail/NewsDetail";
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
		</main>
	);
}

export default NewsDetailPage;
