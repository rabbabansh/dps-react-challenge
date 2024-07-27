import React, { useState, useEffect, useMemo } from 'react';
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
	// State to store the selected city
	const [selectedCity, setSelectedCity] = useState<string>('all');
	// State to store the search term
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		// Function to fetch users from the API
		const fetchUsers = async () => {
			try {
				console.log('Fetching users...');
				const response = await fetch('https://dummyjson.com/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const data: ApiResponse = await response.json();
				console.log('Fetched users:', data.users);
				setUsers(data.users);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching users:', err);
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

	// Memoized list of unique cities
	const uniqueCities = useMemo(() => {
		console.log('Calculating unique cities...');
		const citySet = new Set(users.map((user) => user.address.city));
		return Array.from(citySet).sort();
	}, [users]);

	// Memoized filtered users based on search term and selected city
	const filteredUsers = useMemo(() => {
		console.log('Filtering users...');
		return users.filter((user) => {
			const nameMatch = (user.firstName + ' ' + user.lastName)
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const cityMatch =
				selectedCity === 'all' || user.address.city === selectedCity;
			return nameMatch && cityMatch;
		});
	}, [users, searchTerm, selectedCity]);

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
					<Input
						id="name"
						placeholder="Search by name"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				{/* City filter dropdown */}
				<div className="space-y-2">
					<Label htmlFor="city">City</Label>
					<Select
						value={selectedCity}
						onValueChange={setSelectedCity}
					>
						<SelectTrigger id="city" aria-label="City">
							<SelectValue placeholder="Select city" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Cities</SelectItem>
							{uniqueCities.map((city) => (
								<SelectItem key={city} value={city}>
									{city}
								</SelectItem>
							))}
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
						{filteredUsers.map((user) => (
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
