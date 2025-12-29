export default function OfferCardSkeleton() {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden p-5 animate-pulse">
            {/* Store Header Skeleton */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-muted rounded-lg" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                </div>
                <div className="h-6 w-12 bg-muted rounded-full" />
            </div>

            {/* Price Skeleton */}
            <div className="mb-4 space-y-2">
                <div className="h-3 w-20 bg-muted rounded" />
                <div className="h-8 w-32 bg-muted rounded" />
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-3 w-36 bg-muted rounded" />
            </div>

            {/* Button Skeleton */}
            <div className="h-10 bg-muted rounded" />

            {/* Footer Skeleton */}
            <div className="mt-3 pt-3 border-t border-border space-y-1">
                <div className="h-3 w-28 bg-muted rounded" />
                <div className="h-3 w-32 bg-muted rounded" />
            </div>
        </div>
    );
}
