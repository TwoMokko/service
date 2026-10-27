import { useState } from "react";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { FormData } from "@/src/shared/types/types";

export function useSubmit() {
	const { openModal, modalData } = useModal();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (formData: FormData, path: string = "/orders") => {
		setIsLoading(true);

		try {
			// Отправка данных на API
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CLIENT-DOMAIN": process.env.NEXT_PUBLIC_API_DOMEN ?? "",
				},
				body: JSON.stringify({
					...(formData as object),
				}),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Заявка отправлена:", result);
				openModal("success");
				return true;
			} else {
				throw new Error("Ошибка отправки");
			}
		} catch (error) {
			console.error("Ошибка:", error);
			openModal("error");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		handleSubmit,
		modalData,
	};
}
