"use client";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
// @ts-ignore
import type { OptionsType } from "@fancyapps/ui/types/Fancybox/options";

import React, { useEffect } from "react";

interface FancyboxProviderProps {
	children: React.ReactNode;
}

const options: Partial<OptionsType> = {
	// Настройки Fancybox
	Thumbs: {
		type: "modern",
	},
	Toolbar: {
		display: {
			left: ["infobar"],
			middle: [],
			right: ["close"],
		},
	},
	Images: {
		zoom: true,
	},
	// hideScrollbar: false,
	// autoFocus: false,
};

export function FancyboxProvider({ children }: FancyboxProviderProps) {
	useEffect(() => {
		NativeFancybox.bind("[data-fancybox]", options);

		return () => {
			NativeFancybox.destroy();
		};
	}, []);

	return <>{children}</>;
}
