"use client";

import React, { createContext, useContext, useState } from "react";

import { ModalData, ReelsData, SubmitModel } from "@/src/shared/types/types";
import {
	CreditModal,
	ErrorModal,
	OrderModal,
	ReelsModal,
	SuccessModal,
	TradeModal,
} from "@/src/widgets/modals";

export type ModalType = "order" | "credit" | "trade" | "success" | "error" | "video";

interface ModalProps {
	order: SubmitModel;
	credit: SubmitModel;
	trade: SubmitModel;
	success: SubmitModel;
	error: SubmitModel;
	video: ReelsData;
}

interface ModalContextType {
	openModal: <T extends ModalType>(type: T, data?: ModalProps[T]) => void;
	closeModal: () => void;
	currentModal: ModalType | null;
	modalData: ModalData;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [currentModal, setCurrentModal] = useState<ModalType | null>(null);
	const [modalData, setModalData] = useState<ModalData>(null);

	const openModal = <T extends ModalType>(type: T, data?: ModalProps[T]) => {
		document.body.classList.add("modal-open");
		setCurrentModal(type);
		setModalData(data || null);
	};

	const closeModal = () => {
		document.body.classList.remove("modal-open");
		setCurrentModal(null);
		setModalData(null);
	};

	return (
		<ModalContext.Provider value={{ openModal, closeModal, currentModal, modalData }}>
			{children}

			{currentModal === "order" && <OrderModal />}
			{currentModal === "credit" && <CreditModal />}
			{currentModal === "trade" && <TradeModal />}
			{currentModal === "success" && <SuccessModal />}
			{currentModal === "error" && <ErrorModal />}
			{currentModal === "video" && <ReelsModal />}
		</ModalContext.Provider>
	);
}

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within ModalProvider");
	}
	return context;
};
