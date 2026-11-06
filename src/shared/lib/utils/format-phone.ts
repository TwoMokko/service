export function formatPhoneToLink(phone: string | null | undefined) {
	if (!phone) return "";

	let digits = phone.replace(/\D/g, "");

	if (digits.startsWith("7")) {
		digits = "8" + digits.slice(1);
	}

	return digits;
}
