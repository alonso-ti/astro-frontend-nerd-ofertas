import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface OfferCardSkeletonProps {
    className?: string;
}

export default function OfferCardSkeleton({ className }: OfferCardSkeletonProps) {
    return (
        <Card className={cn('p-4 border border-border rounded-xl', className)}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-pulse">
                {/* Store Logo & Info Skeleton */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                    {/* Logo Container Skeleton */}
                    <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-lg" />

                    {/* Store Name & Product Title Skeleton */}
                    <div className="min-w-0 flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-24" />
                        <div className="h-3 bg-muted/70 rounded w-full max-w-[200px]" />
                    </div>
                </div>

                {/* Price Section Skeleton */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-center gap-2">
                    <div className="h-3 bg-muted/70 rounded w-16" />
                    <div className="h-8 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted/70 rounded w-40" />
                </div>

                {/* Action Button Skeleton */}
                <div className="col-span-12 md:col-span-3 flex justify-end">
                    <div className="h-9 bg-muted rounded w-full md:w-28" />
                </div>
            </div>
        </Card>
    );
}
