// Structure of the address object
interface Address {
	city: string;
	street: string;
	zipcode: string;
}

// Structure of a user object
interface User {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	address: Address;
	isOldest?: boolean;
}

// Structure of the API response
interface ApiResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

export type { Address, User, ApiResponse };
