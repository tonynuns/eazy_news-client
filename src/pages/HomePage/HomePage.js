import { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "../../components/NewsList/NewsList";

function HomePage() {
	const [newsArr, setNewsArr] = useState([]);

	useEffect(() => {
		const currentNewsUrl = "http://localhost:8080/news/current";
		const getCurrentNews = async () => {
			try {
				const response = await axios.get(currentNewsUrl);
				response.data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
				setNewsArr(response.data);
			} catch (error) {
				console.log(
					`Failed to get current news list from back-end API with error message: ${error}`
				);
			}
		};
		getCurrentNews();
	}, []);

	return (
		<>
			<NewsList newsArr={newsArr} />
		</>
	);
}

export default HomePage;
