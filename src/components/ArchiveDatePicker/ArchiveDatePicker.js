import { useState } from "react";
import DatePicker from "react-datepicker";
import { getArchiveNews } from "../../utils/apiMethods/newsApi";
import "./ArchiveDatePicker.scss";

function ArchiveDatePicker({
	setNewsArr,
	setFilteredNewsArr,
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
			setFilteredNewsArr([]);
			setErrorMsg("Start date must be before end date!");
			return;
		}
		setErrorMsg(null);
		const pastNews = await getArchiveNews(startDate, endDate);
		setNewsArr(pastNews);
		setFilteredNewsArr(pastNews);
		setIsArchiveNews(true);
	};

	return (
		<div>
			{isArchiveNews && (
				<div className="archive">
					<div className="archive__date-container">
						<div className="archive__date-wrapper">
							<span>From: </span>
							<DatePicker
								className="archive__date-picker"
								name="startDate"
								selected={startDate}
								onChange={(date) => setDatePickerObj({ ...datePickerObj, startDate: date })}
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
