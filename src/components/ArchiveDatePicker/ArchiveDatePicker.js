import { useState } from "react";
import DatePicker from "react-datepicker";
import { getArchiveNews } from "../../utils/apiMethods/easyNewsApi";
import "./ArchiveDatePicker.scss";

function ArchiveDatePicker({
	setNewsArr,
	isArchiveNews,
	setIsArchiveNews,
	datePickerObj,
	setDatePickerObj,
}) {
	const { startDate, endDate, maxStartDate, maxEndDate } = datePickerObj;
	const [errorMsg, setErrorMsg] = useState(null);

	const handleClick = async () => {
		sessionStorage.removeItem("scrollPos");
		if (endDate <= startDate) {
			setNewsArr([]);
			setErrorMsg("Start date must be before end date!");
			return;
		}
		setErrorMsg(null);
		const pastNews = await getArchiveNews(startDate, endDate);
		setNewsArr(pastNews);
		setIsArchiveNews(true);
	};

	return (
		<div>
			{isArchiveNews && (
				<div className="archive">
					<p className="archive__title">Select Date Range</p>
					<div className="archive__date-container">
						<div className="archive__date-wrapper">
							<span>From: </span>
							<DatePicker
								className="archive__date-picker"
								name="startDate"
								selected={startDate}
								onChange={(date, name) => setDatePickerObj({ ...datePickerObj, startDate: date })}
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
								name="endDate"
								selected={endDate}
								onChange={(date) => setDatePickerObj({ ...datePickerObj, endDate: date })}
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
