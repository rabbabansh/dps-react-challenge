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
import { ArrowUpDown } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { SkeletonLoading } from './SkeletonLoading';
import { User, ApiResponse } from '@/types/index';

type SortColumn = 'name' | 'city' | 'birthday';
type SortDirection = 'asc' | 'desc';

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
	// State to control the highlighting of oldest users
	const [highlightOldest, setHighlightOldest] = useState<boolean>(false);
	// State to store the current sort column and direction
	const [sortColumn, setSortColumn] = useState<SortColumn>('name');
	const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

	// Debounced search term
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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

	// Memoized list of unique cities
	const uniqueCities = useMemo(() => {
		const citySet = new Set(users.map((user) => user.address.city));
		return Array.from(citySet).sort();
	}, [users]);

	// Memoized oldest users by city
	const oldestByCity = useMemo(() => {
		const oldest: { [city: string]: Date } = {};
		users.forEach((user) => {
			const birthDate = new Date(user.birthDate);
			const city = user.address.city;
			if (!oldest[city] || birthDate < oldest[city]) {
				oldest[city] = birthDate;
			}
		});
		return oldest;
	}, [users]);

	// Memoized filtered users based on debounced search term, selected city, and highlight oldest option
	const filteredUsers = useMemo(() => {
		const filtered = users.filter((user) => {
			const nameMatch = (user.firstName + ' ' + user.lastName)
				.toLowerCase()
				.includes(debouncedSearchTerm.toLowerCase());
			const cityMatch =
				selectedCity === 'all' || user.address.city === selectedCity;
			return nameMatch && cityMatch;
		});

		// Apply sorting feature
		filtered.sort((a, b) => {
			let compareA, compareB;
			switch (sortColumn) {
			case 'name':
				compareA = a.firstName + ' ' + a.lastName;
				compareB = b.firstName + ' ' + b.lastName;
				break;
			case 'city':
				compareA = a.address.city;
				compareB = b.address.city;
				break;
			case 'birthday':
				compareA = new Date(a.birthDate);
				compareB = new Date(b.birthDate);
				break;
			}

			if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
			if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		if (highlightOldest) {
			// Add isOldest property to each user based on pre-calculated oldest users
			return filtered.map((user) => ({
				...user,
				isOldest:
					new Date(user.birthDate).getTime() ===
					oldestByCity[user.address.city]?.getTime(),
			}));
		}

		return filtered;
	}, [
		users,
		debouncedSearchTerm,
		selectedCity,
		highlightOldest,
		oldestByCity,
		sortColumn,
		sortDirection,
	]);

	const handleSort = (column: SortColumn) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	if (loading) {
		return <SkeletonLoading />;
	}

	if (error) return <div>Error: {error}</div>;

	return (
		<div className="max-w-4xl w-full mx-auto p-4 flex flex-col border rounded-lg bg-card text-card-foreground">
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

				{/* Highlight oldest checkbox */}
				<div className="flex items-center space-x-2">
					<Checkbox
						id="highlight"
						checked={highlightOldest}
						onCheckedChange={(checked) =>
							setHighlightOldest(checked as boolean)
						}
					/>
					<Label
						htmlFor="highlight"
						className="text-sm font-medium leading-none"
					>
						Highlight oldest per city
					</Label>
				</div>
			</div>

			{/* User data table */}
			<div className="border rounded-lg flex-grow overflow-hidden flex flex-col">
				<div className="overflow-auto flex-grow">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead
									className="sticky top-0 bg-background cursor-pointer"
									onClick={() => handleSort('name')}
								>
									Name <ArrowUpDown className="inline ml-2" />
								</TableHead>
								<TableHead
									className="sticky top-0 bg-background cursor-pointer"
									onClick={() => handleSort('city')}
								>
									City <ArrowUpDown className="inline ml-2" />
								</TableHead>
								<TableHead
									className="sticky top-0 bg-background cursor-pointer"
									onClick={() => handleSort('birthday')}
								>
									Birthday{' '}
									<ArrowUpDown className="inline ml-2" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.map((user) => (
								<TableRow
									key={user.id}
									className={
										user.isOldest
											? 'bg-blue-100 dark:bg-blue-900'
											: ''
									}
								>
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
		</div>
	);
};

export default UserSearch;
