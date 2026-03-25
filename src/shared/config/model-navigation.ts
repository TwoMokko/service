import { NavigationLink, SectionId } from "@/src/shared/types/types";

import { sectionTitles } from "./model-sections";

export const navigationLinks: NavigationLink[] = [
	{ title: sectionTitles[SectionId.SERVICES], href: `/${SectionId.SERVICES}` },
	{ title: sectionTitles[SectionId.BRANDS], href: `/${SectionId.BRANDS}` },
	{ title: sectionTitles[SectionId.PRICE], href: `/${SectionId.PRICE}` },
	{ title: sectionTitles[SectionId.ACTIONS], href: `/${SectionId.ACTIONS}` },
	{ title: sectionTitles[SectionId.ABOUT], href: `/${SectionId.ABOUT}` },
	{ title: sectionTitles[SectionId.REVIEWS], href: `/${SectionId.REVIEWS}` },
	{ title: sectionTitles[SectionId.ARTICLE], href: `/${SectionId.ARTICLE}` },
	{ title: sectionTitles[SectionId.CONTACTS], href: `/${SectionId.CONTACTS}` },
];
