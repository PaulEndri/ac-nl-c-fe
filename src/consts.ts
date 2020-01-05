import { formatNumber } from './utils/formatNumber';
import { TRACKED_FILTER_VALUES } from './utils/misc';

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'October',
	'September',
	'November',
	'December'
];

export const FISH_LOCATIONS = [ 'Island', 'Large Pond', 'Ocean', 'River', 'Pond' ];

export const MONTH_OPTIONS = MONTHS.map((m, i) => ({ value: i + 1, label: m }));
export const TIME_OPTIONS = new Array(24).fill(1).map((_, i) => ({
	value: i + 1,
	label: formatNumber(i + 1)
}));
export const TRACKED_OPTIONS = [
	{ label: '', value: TRACKED_FILTER_VALUES.EMPTY },
	{ label: 'Recorded', value: TRACKED_FILTER_VALUES.PRESENT },
	{ label: 'Missing', value: TRACKED_FILTER_VALUES.MISSING }
];
