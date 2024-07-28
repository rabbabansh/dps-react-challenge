import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoading = () => (
	<div className="max-w-4xl mx-auto p-4 border rounded-lg bg-card text-card-foreground">
		<div className="grid grid-cols-3 gap-4 mb-4">
			<div className="space-y-2">
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-12 w-full" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-8 w-full" />
				<Skeleton className="h-12 w-full" />
			</div>
			<div className="flex items-center space-x-2 justify-end">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-8 w-32" />
			</div>
		</div>
		<div className="border rounded-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<Skeleton className="h-8 w-32" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-8 w-32" />
						</TableHead>
						<TableHead>
							<Skeleton className="h-8 w-32" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{[...Array(5)].map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								<Skeleton className="h-8 w-48" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-8 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-8 w-32" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	</div>
);

export { SkeletonLoading }; // Export the component
