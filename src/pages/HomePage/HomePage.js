import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentNews, getArchiveNews } from "../../utils/apiMethods/easyNewsApi";
import ArchiveDatePicker from "../../components/ArchiveDatePicker/ArchiveDatePicker";
import NewsList from "../../components/NewsList/NewsList";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.scss";

function HomePage() {
	const currentDate = new Date().setHours(0, 0, 0, 0);
	const twoDaysMlSec = 48 * 60 * 60 * 1000;
	const threeDaysMlSec = 72 * 60 * 60 * 1000;
	const maxEndDate = new Date(currentDate).getTime() - twoDaysMlSec;
	const maxStartDate = new Date(currentDate).getTime() - threeDaysMlSec;

	const [newsArr, setNewsArr] = useState([]);
	const [startDate, setStartDate] = useState(maxStartDate);
	const [endDate, setEndDate] = useState(maxEndDate);
	const [archiveNews, setArchiveNews] = useState(false);

	const location = useLocation();
	const pathName = location.pathname;

	useEffect(() => {
		const getData = async () => {
			if (pathName !== "/archive") {
				// current news has a date range of current date until 2 days ago
				const currentNews = await getCurrentNews();
				setNewsArr(currentNews);
				setArchiveNews(false);
			} else {
				// archive news has date range before 2 days ago and beyond
				const archiveNews = await getArchiveNews(startDate, endDate);
				setNewsArr(archiveNews);
				setArchiveNews(true);
			}
		};
		getData();
	}, [pathName]);

	return (
		<>
			<ArchiveDatePicker
				startDate={startDate}
				endDate={endDate}
				archiveNews={archiveNews}
				maxStartDate={maxStartDate}
				maxEndDate={maxEndDate}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				setArchiveNews={setArchiveNews}
				setNewsArr={setNewsArr}
			/>
			<NewsList newsArr={newsArr} />
		</>
	);
}

export default HomePage;
