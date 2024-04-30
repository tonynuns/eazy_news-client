import { useState } from "react";
import DatePicker from "react-datepicker";
import { getArchiveNews } from "../../utils/apiMethods/easyNewsApi";
import "./ArchiveDatePicker.scss";

function ArchiveDatePicker({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
	archiveNews,
	setArchiveNews,
	setNewsArr,
	maxStartDate,
	maxEndDate,
}) {
	const [errorMsg, setErrorMsg] = useState(null);

	const handleClick = async () => {
		if (endDate <= startDate) {
			setNewsArr([]);
			setErrorMsg("Start date must be before end date!");
			return;
		}
		setErrorMsg(null);
		const pastNews = await getArchiveNews(startDate, endDate);
		setNewsArr(pastNews);
		setArchiveNews(true);
	};

	return (
		<div>
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
		</div>
	);
}

export default ArchiveDatePicker;
