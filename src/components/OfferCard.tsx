import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Store, CheckCircle2 } from 'lucide-react';
import type { ScraperResult } from '@nerd-ofertas/types';
import { getStoreInfo } from '@/utils/StoreLogoMap';
import { cn } from '@/lib/utils';

interface OfferCardProps {
    offer: ScraperResult;
    isBestPrice?: boolean;
    rank?: number;
}

export default function OfferCard({ offer, isBestPrice = false, rank }: OfferCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price / 100);
    };

    // Calculate discount if old price exists
    const discount =
        offer.oldPrice && offer.oldPrice > offer.price
            ? Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)
            : 0;

    // Get store information from mapping
    const storeInfo = getStoreInfo(offer.seller?.name);

    // Calculate installment preview (mock - would come from offer data)
    const installments = 12;
    const installmentValue = offer.price / installments;

    return (
        <div
            className={cn(
                'group relative bg-card border rounded-xl p-4 transition-all duration-300',
                'hover:shadow-lg hover:border-primary/50 hover:-translate-y-0.5',
                isBestPrice
                    ? 'border-success/50 bg-success/5 ring-2 ring-success/20'
                    : 'border-border'
            )}
        >
            {/* Best Price Badge */}
            {isBestPrice && (
                <div className="absolute -top-2 -right-2 bg-success text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md flex items-center gap-1 z-10 animate-in zoom-in">
                    <CheckCircle2 className="w-3 h-3" />
                    MELHOR PREÇO
                </div>
            )}

            {/* Rank Badge (for non-best offers) */}
            {!isBestPrice && rank && rank <= 3 && (
                <div className="absolute -top-2 -left-2 bg-muted text-muted-foreground text-xs w-6 h-6 rounded-full font-bold shadow-sm flex items-center justify-center border border-border z-10">
                    #{rank}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Store Logo & Info */}
                <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                    {/* Logo Container */}
                    <div
                        className={cn(
                            'flex-shrink-0 w-16 h-16 bg-white rounded-lg border flex items-center justify-center p-2 relative',
                            'transition-transform duration-300 group-hover:scale-105',
                            isBestPrice ? 'border-success' : 'border-border'
                        )}
                        style={{ borderColor: isBestPrice ? undefined : storeInfo.color }}
                    >
                        {storeInfo.logo !== '/placeholder-store.svg' ? (
                            <img
                                src={storeInfo.logo}
                                alt={storeInfo.displayName}
                                className="max-h-full max-w-full object-contain"
                                loading="lazy"
                            />
                        ) : (
                            <Store className="text-muted-foreground w-8 h-8" />
                        )}
                    </div>

                    {/* Store Name & Product Title */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-sm text-foreground truncate">
                                {storeInfo.displayName}
                            </span>
                            {storeInfo.isOfficial && (
                                <Badge variant="secondary" className="text-[10px] px-1.5 h-4 shrink-0">
                                    Oficial
                                </Badge>
                            )}
                        </div>
                        <p
                            className="text-xs text-muted-foreground truncate"
                            title={offer.title}
                        >
                            {offer.title}
                        </p>
                    </div>
                </div>

                {/* Price Section */}
                <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
                    {/* Old Price */}
                    {offer.oldPrice && offer.oldPrice > offer.price && (
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground line-through">
                                {formatPrice(offer.oldPrice)}
                            </span>
                            {discount > 0 && (
                                <Badge
                                    variant="outline"
                                    className="text-[10px] h-4 px-1.5 text-destructive border-destructive/30 bg-destructive/10"
                                >
                                    -{discount}%
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Current Price */}
                    <div className="flex items-baseline gap-2">
                        <span
                            className={cn(
                                'font-bold text-2xl tracking-tight',
                                isBestPrice ? 'text-success' : 'text-foreground'
                            )}
                        >
                            {formatPrice(offer.price)}
                        </span>
                    </div>

                    {/* Payment Info */}
                    <p className="text-xs text-muted-foreground mt-1">
                        à vista no PIX ou{' '}
                        <span className="font-medium">
                            {installments}x de {formatPrice(installmentValue)}
                        </span>
                    </p>
                </div>

                {/* Action Button */}
                <div className="col-span-12 md:col-span-3 flex justify-end">
                    <Button
                        asChild
                        size="sm"
                        className={cn(
                            'w-full md:w-auto font-bold shadow-sm transition-all',
                            isBestPrice
                                ? 'bg-success hover:bg-success/90 text-white shadow-success/25'
                                : 'bg-primary hover:bg-primary/90 text-white'
                        )}
                    >
                        <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            Ver Oferta
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Additional Info (Cashback, Shipping, etc.) - Future expansion */}
            {offer.meta && (
                <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex flex-wrap gap-2 text-xs">
                        {/* Placeholder for additional benefits */}
                        <Badge variant="outline" className="text-[10px] h-5 px-2">
                            Frete grátis
                        </Badge>
                    </div>
                </div>
            )}
        </div>
    );
}
