"use client";

import React from "react";

import { FancyboxProvider } from "@/src/app/_providers/FancyboxProvider";
import { ModalProvider } from "@/src/app/_providers/ModalProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ModalProvider>
			<FancyboxProvider>{children}</FancyboxProvider>
		</ModalProvider>
	);
}
