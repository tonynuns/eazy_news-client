import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
	return (
		<div className="not-found-page">
			<h1 className="not-found-page__header">404 😉 Page Not Found</h1>
			<p className="not-found-page__message">
				Sorry, the page you are looking for could not be found.
			</p>
			<p className="not-found-page__message">
				Go to <Link to="/">Home Page</Link>.
			</p>
		</div>
	);
}

export default NotFoundPage;
