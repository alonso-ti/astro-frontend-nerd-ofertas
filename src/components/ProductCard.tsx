import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { ScraperResult } from "@nerd-ofertas/types";
import { ExternalLink, Bell } from "lucide-react";

interface ProductCardProps {
    product: ScraperResult;
}

export default function ProductCard({ product }: ProductCardProps) {
    const formatPrice = (price?: number) => {
        if (price === undefined) return "R$ --";
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price / 100);
    };

    // Calculate discount if old price exists
    const discount =
        product.oldPrice && product.price < product.oldPrice
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : 0;

    const internalId = (product as any).id || (product.meta as any)?.id;
    const detailsLink = internalId ? `/product/${internalId}` : product.url;

    return (
        <Card className="flex flex-col h-full bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group/card overflow-hidden rounded-xl">
            {/* Image Section */}
            <a href={detailsLink} className="relative aspect-square p-6 bg-white flex items-center justify-center overflow-hidden">
                {discount > 0 && (
                    <Badge className="absolute top-3 left-3 z-10 bg-destructive text-white font-bold animate-in zoom-in">
                        -{discount}%
                    </Badge>
                )}

                {/* Floating Effect on Hover */}
                <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.title}
                    className="object-contain max-h-full max-w-full transition-transform duration-500 group-hover/card:scale-110 drop-shadow-sm"
                    loading="lazy"
                />
            </a>

            {/* Content Section */}
            <CardHeader className="p-4 pb-0 space-y-2">
                <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {product.seller?.name || "Oferta"}
                    </span>
                    {product.availability ? (
                        <span className="flex h-2 w-2 rounded-full bg-green-500 ring-2 ring-green-500/20" title="Disponível" />
                    ) : (
                        <span className="flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-red-500/20" title="Esgotado" />
                    )}
                </div>

                <a href={detailsLink} className="block group-hover/card:text-primary transition-colors">
                    <h3 className="text-sm font-medium leading-tight line-clamp-2 min-h-[2.5rem] text-foreground" title={product.title}>
                        {product.title}
                    </h3>
                </a>
            </CardHeader>

            <CardContent className="p-4 pt-2 flex-grow flex flex-col justify-end">
                <div className="space-y-0.5">
                    {product.oldPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.oldPrice)}
                        </p>
                    )}
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-success tracking-tight">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase font-medium">
                        à vista no PIX
                    </p>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 gap-2">
                <Button variant="outline" size="icon" className="shrink-0 text-muted-foreground hover:text-primary hover:border-primary transition-colors" title="Criar Alerta">
                    <Bell className="w-4 h-4" />
                </Button>

                <a href={product.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full font-bold bg-primary hover:bg-blue-700 text-white shadow-sm transition-all" size="sm">
                        Ir à Loja <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
}
