import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentNews, getArchiveNews } from "../../utils/apiMethods/easyNewsApi";
import NewsList from "../../components/NewsList/NewsList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.scss";

function HomePage() {
	const currentDate = new Date().setHours(0, 0, 0, 0);
	const twoDaysMlSec = 24 * 60 * 60 * 1000;
	const threeDaysMlSec = 72 * 60 * 60 * 1000;
	const maxEndDate = new Date(currentDate).getTime() - twoDaysMlSec;
	const maxStartDate = new Date(currentDate).getTime() - threeDaysMlSec;

	const [newsArr, setNewsArr] = useState([]);
	const [startDate, setStartDate] = useState(maxStartDate);
	const [endDate, setEndDate] = useState(maxEndDate);
	const [archiveNews, setArchiveNews] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);

	const location = useLocation();
	const pathName = location.pathname;

	const handleClick = async () => {
		if (endDate <= startDate) {
			setNewsArr([]);
			setErrorMsg("Start date must be before end date!");
			return;
		}
		setErrorMsg(null);
		const archiveNews = await getArchiveNews(startDate, endDate);
		setNewsArr(archiveNews);
		setArchiveNews(true);
	};

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
			{archiveNews && (
				<div className="archive">
					<p className="archive__title">Select Date Range</p>
					<div className="archive__date-container">
						<div className="archive__date-wrapper">
							<span>From: </span>
							<DatePicker
								className="archive__date-picker"
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								dateFormat={"dd-MMM-yyyy"}
								maxDate={maxStartDate}
								showYearDropdown
								scrollableMonthYearDropdown
							/>
						</div>
						<div className="archive__date-wrapper">
							<span>To: </span>
							<DatePicker
								className="archive__date-picker"
								selected={endDate}
								onChange={(date) => setEndDate(date)}
								dateFormat={"dd-MMM-yyyy"}
								maxDate={maxEndDate}
								showYearDropdown
								scrollableMonthYearDropdown
							/>
						</div>
					</div>
					<button className="archive__btn btn" onClick={handleClick}>
						Search
					</button>
					<p className="archive__error-msg">{errorMsg}</p>
				</div>
			)}
			<NewsList newsArr={newsArr} />
		</>
	);
}

export default HomePage;
