import moment from 'moment-timezone';

const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm';

export const getClientTimezone = () =>
	Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getFormattedDate = (utcDate: string) =>
	moment.utc(utcDate).tz(getClientTimezone()).format(DATE_TIME_FORMAT);

export const getTimeAgo = (utcDate: string) => {
	const date = getFormattedDate(utcDate)
	return moment(date, DATE_TIME_FORMAT).fromNow();
};
