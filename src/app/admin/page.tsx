"use client";

import { useState } from "react";

import AdminLayout, { type AdminTab } from "./_components/AdminLayout";
import BrandsEditor from "./_components/brands/BrandsEditor";
import ReviewsEditor from "./_components/reviews/ReviewsEditor";
import ServicesEditor from "./_components/services/ServicesEditor";

export default function AdminPage() {
	const [activeTab, setActiveTab] = useState<AdminTab>("services");

	return (
		<AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
			{activeTab === "services" && <ServicesEditor />}
			{activeTab === "reviews" && <ReviewsEditor />}
			{activeTab === "brands" && <BrandsEditor />}
		</AdminLayout>
	);
}
