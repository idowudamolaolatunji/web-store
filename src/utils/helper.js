
// CURRENCY CONVERTER / HELPER FORMATTER
export function currencyConverter(amount) {
	return Number(amount)
		.toFixed(2)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberConverter(amount) {
	return Number(amount)
		.toFixed(0)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function truncateString(input, num=25) {
    if (input?.length > num) {
        return input.substring(0, num) + "...";
    } else {
        return input;
    }
}