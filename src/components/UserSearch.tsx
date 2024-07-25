import React from 'react';
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

const UserSearch: React.FC = () => {
	return (
		<div className="max-w-4xl mx-auto p-4 border rounded-lg">
			<div className="grid grid-cols-3 gap-4 mb-4">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" placeholder="As you type search" />
				</div>
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
		</div>
	);
};

export default UserSearch;
