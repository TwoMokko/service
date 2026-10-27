"use client";

import React, { ReactNode, useCallback, useMemo, useState } from "react";

import { usePhoneMask } from "@/src/shared/lib/hooks/usePhoneMask";
import { useSubmit } from "@/src/shared/lib/hooks/useSubmit";
import { FormData, SubmitData } from "@/src/shared/types/types";

interface UseFormLogicProps {
	showNameField?: boolean;
	showSurnameField?: boolean;
	showTextField?: boolean;
	showStarsField?: boolean;
	initialStars?: number;
	errorText?: ReactNode | string;
	submitPath?: string;
}

interface FormDataWithReview extends SubmitData {
	surname?: string;
	text?: string;
	stars?: number;
}

export function useFormLogic({
	showNameField = false,
	showSurnameField = false,
	showTextField = false,
	showStarsField = false,
	initialStars = 5,
	errorText = "Пожалуйста, заполните обязательные поля отмеченные *",
	submitPath = "/orders",
}: UseFormLogicProps = {}) {
	const { handleSubmit, isLoading } = useSubmit();
	const { phoneValue, onPhoneChange, resetPhone } = usePhoneMask();
	const [submitError, setSubmitError] = useState<ReactNode | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [formData, setFormData] = useState<FormDataWithReview>({
		name: "",
		surname: "",
		stars: initialStars,
		phone: "",
		text: "",
		url: "",
		agreementPersonalData: true,
		agreementMarketing: true,
	});

	const resetError = () => {
		setSubmitError(null);
		setIsSubmitted(false);
	};

	const getValidationErrors = useCallback(() => {
		const errors: {
			name?: boolean;
			surname?: boolean;
			phone?: boolean;
			text?: boolean;
			agreementPersonalData?: boolean;
		} = {};

		if (showNameField && !formData.name?.trim()) {
			errors.name = true;
		}

		if (!formData.phone?.trim()) {
			errors.phone = true;
		}

		if (showTextField && !formData.text?.trim()) {
			errors.text = true;
		}

		if (!formData.agreementPersonalData) {
			errors.agreementPersonalData = true;
		}

		return errors;
	}, [
		showNameField,
		showTextField,
		formData.name,
		formData.phone,
		formData.text,
		formData.agreementPersonalData,
	]);

	const allErrors = useMemo(() => getValidationErrors(), [getValidationErrors]);

	const errors = useMemo(() => (isSubmitted ? allErrors : {}), [isSubmitted, allErrors]);

	const hasErrors = useCallback(() => {
		return Object.keys(allErrors).length > 0;
	}, [allErrors]);

	const validateForm = useCallback(() => {
		if (hasErrors()) {
			setSubmitError(errorText);
			return false;
		}
		return true;
	}, [hasErrors, errorText]);

	const resetForm = useCallback(() => {
		setFormData((prev) => ({
			...prev,
			name: "",
			surname: "",
			stars: initialStars,
			phone: "",
			text: "",
			agreementPersonalData: true,
			agreementMarketing: true,
		}));
		resetPhone();
		resetError();
	}, [initialStars, resetPhone]); // initialStars может меняться

	const submit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setIsSubmitted(true);

			if (validateForm()) {
				const submitData: Partial<FormDataWithReview> = {
					phone: formData.phone,
					agreementPersonalData: formData.agreementPersonalData,
					// Адрес страницы берём в момент отправки: в состоянии он не нужен
					url: typeof window !== "undefined" ? window.location.href : "",
				};

				if (showNameField) submitData.name = formData.name;
				if (showSurnameField) submitData.surname = formData.surname;
				if (showTextField) submitData.text = formData.text;
				if (showStarsField) submitData.stars = formData.stars;
				submitData.agreementMarketing = formData.agreementMarketing;

				console.log("Отправка:", submitData);
				const isSuccess = await handleSubmit(submitData as FormData, submitPath);
				if (isSuccess) {
					resetForm();
				}
			}
		},
		[
			validateForm,
			formData,
			showNameField,
			showSurnameField,
			showTextField,
			showStarsField,
			submitPath,
			handleSubmit,
			resetForm,
		],
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value, type } = e.target;
			const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

			setFormData((prev) => ({ ...prev, [name]: newValue }));
			resetError();
		},
		[],
	); // Нет зависимостей, так как setFormData стабилен

	// Для полей вне DOM-событий (чекбоксы соглашений, рейтинг и т.п.)
	const setFieldValue = useCallback((name: string, value: string | number | boolean) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		resetError();
	}, []);

	const handlePhoneChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onPhoneChange(e);
			setFormData((prev) => ({
				...prev,
				phone: e.target.value,
			}));
			resetError();
		},
		[onPhoneChange],
	);

	const handleStarClick = useCallback((star: number) => {
		setFormData((prev) => ({ ...prev, stars: star }));
	}, []);

	return {
		formData,
		phoneValue,
		isLoading,
		submitError,
		errors,
		isSubmitted,
		hasErrors,
		submit,
		handleChange,
		setFieldValue,
		handlePhoneChange,
		handleStarClick,
		resetError,
		resetForm,
		setIsSubmitted,
	};
}
