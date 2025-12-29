import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewsSectionProps {
    productId: string;
    productTitle: string;
}

export default function ReviewsSection({ productId, productTitle }: ReviewsSectionProps) {
    // Mock data - replace with actual API call
    const averageRating = 4.5;
    const totalReviews = 127;
    const ratingDistribution = [
        { stars: 5, count: 78, percentage: 61 },
        { stars: 4, count: 32, percentage: 25 },
        { stars: 3, count: 12, percentage: 9 },
        { stars: 2, count: 3, percentage: 2 },
        { stars: 1, count: 2, percentage: 2 },
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="space-y-6">
            {/* Rating Overview */}
            <Card>
                <CardHeader>
                    <CardTitle>Avaliações de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Overall Rating */}
                        <div className="flex flex-col items-center text-center">
                            <div className="text-5xl font-bold text-foreground mb-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {renderStars(averageRating)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {totalReviews} avaliações
                            </p>
                        </div>

                        {/* Rating Distribution */}
                        <div className="space-y-2">
                            {ratingDistribution.map(({ stars, count, percentage }) => (
                                <div key={stars} className="flex items-center gap-3">
                                    <span className="text-sm w-12 text-muted-foreground">
                                        {stars} {stars === 1 ? 'estrela' : 'estrelas'}
                                    </span>
                                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-yellow-400 h-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm w-12 text-right text-muted-foreground">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA to Write Review */}
                    <div className="mt-6 pt-6 border-t border-border text-center">
                        <Button variant="outline" className="w-full md:w-auto">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Escrever Avaliação
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews List (Placeholder) */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold">Avaliações Recentes</h3>

                {/* Sample Review Card */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex">{renderStars(5)}</div>
                                    <span className="text-sm font-semibold">João Silva</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Verificado • Há 2 dias
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground mb-3">
                            Excelente produto! Chegou antes do prazo e muito bem embalado.
                            Recomendo!
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>12 úteis</span>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Placeholder for more reviews */}
                <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">
                        Sistema de avaliações em desenvolvimento. Em breve você poderá ler e escrever avaliações!
                    </p>
                </div>
            </div>
        </div>
    );
}
