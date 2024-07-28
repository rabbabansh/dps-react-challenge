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
	<div className="h-screen flex flex-col">
		<div className="max-w-4xl w-full mx-auto p-4 flex flex-col border rounded-lg bg-card text-card-foreground">
			{/* Search and filter controls skeleton */}
			<div className="grid grid-cols-3 gap-4 mb-4">
				<div className="space-y-2">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-10 w-full" />
				</div>
				<div className="space-y-2">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-10 w-full" />
				</div>
				<div className="flex items-center space-x-2">
					<Skeleton className="h-5 w-5" />
					<Skeleton className="h-5 w-48" />
				</div>
			</div>

			{/* User data table skeleton */}
			<div className="border rounded-lg flex-grow overflow-hidden flex flex-col">
				<div className="overflow-auto flex-grow">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="sticky top-0 bg-background">
									<Skeleton className="h-6 w-24" />
								</TableHead>
								<TableHead className="sticky top-0 bg-background">
									<Skeleton className="h-6 w-24" />
								</TableHead>
								<TableHead className="sticky top-0 bg-background">
									<Skeleton className="h-6 w-24" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{[...Array(10)].map((_, i) => (
								<TableRow key={i}>
									<TableCell>
										<Skeleton className="h-6 w-40" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-32" />
									</TableCell>
									<TableCell>
										<Skeleton className="h-6 w-32" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	</div>
);

export { SkeletonLoading }; // Export the component
