import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentNews, getArchiveNews } from "../../utils/apiMethods/newsApi";
import ArchiveDatePicker from "../../components/ArchiveDatePicker/ArchiveDatePicker";
import NewsList from "../../components/NewsList/NewsList";
import capitaliseFirstLetter from "../../utils/helperFunctions/capitaliseFirstLetter";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePage.scss";

function HomePage() {
	const currentDate = new Date().setHours(0, 0, 0, 0);
	const twoDaysMlSec = 48 * 60 * 60 * 1000;
	const threeDaysMlSec = 72 * 60 * 60 * 1000;
	const maxEndDate = new Date(currentDate).getTime() - twoDaysMlSec;
	const maxStartDate = new Date(currentDate).getTime() - threeDaysMlSec;

	const [newsArr, setNewsArr] = useState([]);
	const [filteredNewsArr, setFilteredNewsArr] = useState(newsArr);
	const [isArchiveNews, setIsArchiveNews] = useState(false);
	const [datePickerObj, setDatePickerObj] = useState({
		startDate: maxStartDate,
		endDate: maxEndDate,
		maxStartDate: maxStartDate,
		maxEndDate: maxEndDate,
	});
	const [categoryList, setCategoryList] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	const location = useLocation();
	const pathName = location.pathname;

	useEffect(() => {
		const getData = async () => {
			if (pathName !== "/archive") {
				// current news is tagged as news that has a date range of current date until 2 days ago
				const currentNews = await getCurrentNews();
				setNewsArr(currentNews);
				setFilteredNewsArr(currentNews);
				setIsArchiveNews(false);
				const categoryNames = [...new Set(currentNews.map((news) => news.category))];
				categoryNames.sort();
				setCategoryList(categoryNames);
			} else {
				// archive news is tagged as news that has date range before 2 days ago and beyond
				const archiveNews = await getArchiveNews(datePickerObj.startDate, datePickerObj.endDate);
				setNewsArr(archiveNews);
				setFilteredNewsArr(archiveNews);
				setIsArchiveNews(true);
				const categoryNames = [...new Set(archiveNews.map((news) => news.category))];
				categoryNames.sort();
				setCategoryList(categoryNames);
			}
		};
		getData();
	}, [pathName]);

	const handleSearch = (e) => {
		sessionStorage.removeItem("scrollPos");
		setSearchValue(e.target.value);
		const searchValue = e.target.value.toLowerCase();
		const searchResult = newsArr.filter(
			(news) =>
				news.source?.toLowerCase().includes(searchValue) ||
				news.author?.toLowerCase().includes(searchValue) ||
				news.summary?.toLowerCase().includes(searchValue) ||
				news.content?.toLowerCase().includes(searchValue)
		);
		setFilteredNewsArr(searchResult);
	};

	const handleSelect = (e) => {
		sessionStorage.removeItem("scrollPos");
		setSearchValue("");
		const { value } = e.target;
		if (categoryList.includes(value)) {
			const filteredResult = newsArr.filter((news) => news.category === value);
			setFilteredNewsArr(filteredResult);
		} else {
			setFilteredNewsArr(newsArr);
		}
	};

	return (
		<>
			<div className="home__input-wrapper">
				<select className="home__category input" name="category" onChange={handleSelect}>
					<option>Select a Category</option>
					{categoryList.map((category) => (
						<option key={category} value={category}>
							{capitaliseFirstLetter(category)}
						</option>
					))}
				</select>
				<input
					className="home__search input"
					placeholder="Search"
					value={searchValue}
					onChange={handleSearch}></input>
			</div>

			<ArchiveDatePicker
				setNewsArr={setNewsArr}
				setFilteredNewsArr={setFilteredNewsArr}
				isArchiveNews={isArchiveNews}
				setIsArchiveNews={setIsArchiveNews}
				datePickerObj={datePickerObj}
				setDatePickerObj={setDatePickerObj}
			/>
			<NewsList newsArr={filteredNewsArr} />
		</>
	);
}

export default HomePage;
