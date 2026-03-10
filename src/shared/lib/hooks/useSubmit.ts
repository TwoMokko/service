import { useState } from "react";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { FormData, SubmitModel } from "@/src/shared/types/types";

export function useSubmit() {
	const { openModal, modalData } = useModal();
	const modalFormData = modalData as SubmitModel;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (formData: FormData) => {
		if (!formData.name || !formData.phone) {
			console.log("Пожалуйста, заполните все поля");
			return false;
		}

		setIsLoading(true);

		try {
			// Отправка данных на API
			const response = await fetch("/api/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					slug: modalFormData?.slug,
					brand: modalFormData?.brand,
					model: modalFormData?.model,
					equipment: modalFormData?.equipment,
					price: modalFormData?.price,
					reprice: modalFormData?.reprice,
					color: modalFormData?.color,
				}),
			});

			if (response.ok) {
				const result = await response.json();
				console.log("Заявка отправлена:", result);
				openModal("success");
			} else {
				throw new Error("Ошибка отправки");
			}
		} catch (error) {
			console.error("Ошибка:", error);
			openModal("error");
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
