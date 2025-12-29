export default function ProductDetailsSkeleton() {
    return (
        <div className="min-h-screen bg-background pb-32 lg:pb-20">
            {/* Breadcrumb Skeleton */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="h-4 w-64 bg-muted rounded animate-pulse" />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Image Skeleton */}
                    <div className="lg:col-span-5">
                        <div className="bg-card rounded-2xl border border-border p-8 aspect-square animate-pulse">
                            <div className="w-full h-full bg-muted rounded" />
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Title & Meta */}
                        <div className="space-y-4 animate-pulse">
                            <div className="h-6 w-24 bg-muted rounded" />
                            <div className="h-8 w-full bg-muted rounded" />
                            <div className="h-8 w-3/4 bg-muted rounded" />
                            <div className="h-4 w-32 bg-muted rounded" />
                        </div>

                        {/* Price Box Skeleton */}
                        <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-4 animate-pulse">
                            <div className="h-10 w-48 bg-muted rounded" />
                            <div className="flex gap-3">
                                <div className="flex-1 h-12 bg-muted rounded" />
                                <div className="flex-1 h-12 bg-muted rounded" />
                            </div>
                        </div>

                        {/* Chart Skeleton */}
                        <div className="space-y-4 animate-pulse">
                            <div className="h-6 w-40 bg-muted rounded" />
                            <div className="h-64 bg-card border border-border rounded-xl" />
                        </div>

                        {/* Offers Skeleton */}
                        <div className="space-y-4">
                            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-64 bg-card border border-border rounded-xl animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
