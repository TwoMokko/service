import { about } from "@/src/shared/config";
import { AddressId } from "@/src/shared/types/types";

export const getContactItem = (id: AddressId) => {
	const item = about.addresses.find((a) => a.id === id);
	if (!item) throw new Error(`Address "${id}" not found`);
	return {
		...item,
		email: item.email ?? about.email,
		time: item.time ?? about.time,
	};
};

export const primaryContact = {
	...about.addresses[0],
	email: about.addresses[0].email ?? about.email,
	time: about.addresses[0].time ?? about.time,
};
