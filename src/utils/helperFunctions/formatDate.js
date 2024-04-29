function formatDate(dateString) {
	const date = new Date(dateString);

	// Get month name
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const month = monthNames[date.getMonth()];

	// Get day
	const day = date.getDate();

	// Get year
	const year = date.getFullYear();

	// Get hours and minutes
	let hours = date.getHours();
	const minutes = date.getMinutes();

	// Convert hours to AM/PM format
	const amPm = hours >= 12 ? "pm" : "am";
	hours %= 12;
	hours = hours || 12; // Handle midnight (0 hours) as 12

	// Add leading zero to minutes if needed
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	// Construct the formatted date string
	const formattedDate = `${month} ${day}, ${year} at ${hours}:${formattedMinutes}${amPm}`;

	return formattedDate;
}

export default formatDate;
