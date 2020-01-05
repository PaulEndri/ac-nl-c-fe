export const formatNumber = (formattingNumber: number) => {
	if (formattingNumber < 12) {
		return `${formattingNumber} AM`;
	} else if (formattingNumber === 24) {
		return `12 AM`;
	} else {
		return `${formattingNumber - 12} PM`;
	}
};
