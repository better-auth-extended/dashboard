const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const toSeconds = ({
	seconds = 0,
	minutes = 0,
	hours = 0,
	days = 0,
	weeks = 0,
}: Partial<
	Record<"seconds" | "minutes" | "hours" | "days" | "weeks", number>
>) => {
	weeks *= WEEK;
	days *= DAY;
	hours *= HOUR;
	minutes *= MINUTE;

	return weeks + days + hours + minutes + seconds;
};
