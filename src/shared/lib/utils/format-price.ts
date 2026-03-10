export function formatPrice(price: number | string): string {
	const numPrice = typeof price === "string" ? parseInt(price) : price;
	return new Intl.NumberFormat("ru-RU").format(numPrice);
}
