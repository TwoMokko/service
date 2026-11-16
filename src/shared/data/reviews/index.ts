import type { Review, ReviewsData } from "./types";
import rawData from "@/data/reviews.json";

const data = rawData as ReviewsData;

export const reviewsData: Review[] = data.reviews;

export function getAllReviews(): Review[] {
	return reviewsData;
}

export function getReviewsByType(type: Review["type"]): Review[] {
	return reviewsData.filter((review) => review.type === type);
}

export function getTextReviews(): Review[] {
	return getReviewsByType("text");
}

export function getReviewById(id: number): Review | null {
	return reviewsData.find((review) => review.id === id) ?? null;
}
