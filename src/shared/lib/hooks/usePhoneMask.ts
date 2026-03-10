import { ChangeEvent, useCallback, useState } from "react";

export function usePhoneMask(initValue: string = "") {
	const [phoneValue, setPhoneValue] = useState<string>(initValue);

	const handlePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		const digits = input.replace(/\D/g, "");

		if (!digits) {
			setPhoneValue("");
			return;
		}

		let phoneDigits = digits;
		// Убираем код страны если он есть
		if (phoneDigits.startsWith("7") || phoneDigits.startsWith("8")) {
			phoneDigits = phoneDigits.substring(1);
		}

		// Ограничиваем длину
		phoneDigits = phoneDigits.substring(0, 10);

		// Форматируем аналогично маске +7 (~99) 999-99-99
		let formattedValue = "+7 ";

		if (phoneDigits.length > 0) {
			formattedValue += "(";

			// Первая цифра в скобках - должна быть 4 или 9
			const firstInBrackets = phoneDigits.substring(0, 1);
			if (firstInBrackets) {
				// Валидация: первая цифра в скобках должна быть 4 или 9
				formattedValue +=
					firstInBrackets === "4" || firstInBrackets === "9" ? firstInBrackets : "";
			}

			// Вторая и третья цифры в скобках
			if (phoneDigits.length >= 2) formattedValue += phoneDigits.substring(1, 3);
		}

		if (phoneDigits.length >= 4) formattedValue += ") " + phoneDigits.substring(3, 6);
		if (phoneDigits.length >= 7) formattedValue += "-" + phoneDigits.substring(6, 8);
		if (phoneDigits.length >= 9) formattedValue += "-" + phoneDigits.substring(8, 10);

		setPhoneValue(formattedValue);
	}, []);

	return {
		phoneValue,
		onPhoneChange: handlePhoneChange,
	};
}
