import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ScraperResult } from "@nerd-ofertas/types";
import { ExternalLink } from "lucide-react";

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
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group/card">
            <a href={detailsLink} className="block relative aspect-square p-4 bg-white dark:bg-gray-100 rounded-t-xl overflow-hidden flex items-center justify-center cursor-pointer">
                {discount > 0 && (
                    <Badge variant="destructive" className="absolute top-2 right-2 z-10">
                        -{discount}%
                    </Badge>
                )}

                <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.title}
                    className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </a>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-[10px] uppercase">
                        {product.seller?.name || "Oferta"}
                    </Badge>
                    {product.availability ? (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Disponível
                        </span>
                    ) : (
                        <span className="text-xs text-red-500 font-medium">Esgotado</span>
                    )}
                </div>
                <a href={detailsLink} className="hover:underline decoration-primary">
                    <CardTitle className="text-sm font-medium line-clamp-2 min-h-[2.5rem]" title={product.title}>
                        {product.title}
                    </CardTitle>
                </a>
            </CardHeader>

            <CardContent className="p-4 pt-1 flex-grow">
                <div className="space-y-1">
                    {product.oldPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.oldPrice)}
                        </p>
                    )}
                    <p className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        à vista no PIX
                    </p>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full gap-2 font-bold group">
                        Ver na Loja
                        <ExternalLink className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>
            </CardFooter>
        </Card>
    );
}
