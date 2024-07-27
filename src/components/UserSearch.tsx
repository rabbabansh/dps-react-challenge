import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';

// Define the structure of the address object
interface Address {
	city: string;
	street: string;
	zipcode: string;
}

// Define the structure of a user object
interface User {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	address: Address;
}

// Define the structure of the API response
interface ApiResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

const UserSearch: React.FC = () => {
	// State to store the list of users
	const [users, setUsers] = useState<User[]>([]);
	// State to track if data is being loaded
	const [loading, setLoading] = useState<boolean>(true);
	// State to store any error messages
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Function to fetch users from the API
		const fetchUsers = async () => {
			try {
				const response = await fetch('https://dummyjson.com/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const data: ApiResponse = await response.json();
				setUsers(data.users);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'An unknown error occurred'
				);
				setLoading(false);
			}
		};

		// Call the fetchUsers function when the component mounts
		fetchUsers();
	}, []); // Empty dependency array ensures this effect runs only once

	// Show loading state while fetching data
	if (loading) return <div>Loading...</div>;
	// Show error message if fetch failed
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="max-w-4xl mx-auto p-4 border rounded-lg">
			{/* Search and filter controls */}
			<div className="grid grid-cols-3 gap-4 mb-4">
				{/* Name search input */}
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" placeholder="As you type search" />
				</div>
				{/* City filter dropdown */}
				<div className="space-y-2">
					<Label htmlFor="city">City</Label>
					<Select>
						<SelectTrigger id="city" aria-label="City">
							<SelectValue placeholder="Select city" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="new-york">New York</SelectItem>
							<SelectItem value="jacksonville">
								Jacksonville
							</SelectItem>
							<SelectItem value="washington">
								Washington
							</SelectItem>
							<SelectItem value="dallas">Dallas</SelectItem>
							<SelectItem value="columbus">Columbus</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{/* Highlight checkbox */}
				<div className="flex items-center space-x-2">
					<Label
						htmlFor="highlight"
						className="text-sm font-medium leading-none"
					>
						Highlight oldest per city
					</Label>
					<Checkbox id="highlight" />
				</div>
			</div>
			{/* User data table */}
			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>City</TableHead>
							<TableHead>Birthday</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{/* Map through users and create a table row for each */}
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
								<TableCell>{user.address.city}</TableCell>
								<TableCell>
									{new Date(
										user.birthDate
									).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default UserSearch;
