import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

interface PriceHistoryChartProps {
    data: { price: number; date: string }[];
}

export default function PriceHistoryChart({ data }: PriceHistoryChartProps) {
    if (!data || data.length === 0) {
        return (
            <Card className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 border-dashed">
                Sem histórico de preços disponível.
            </Card>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
        }).format(price / 100);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("pt-BR", { day: '2-digit', month: '2-digit' }).format(date);
    };

    // Calculate Stats
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

    // Domain & Zones
    const domainMin = Math.floor(minPrice * 0.9);
    const domainMax = Math.ceil(maxPrice * 1.1);

    // Good Buy Zone = anything below (Min + 20% of range)
    const range = maxPrice - minPrice;
    const goodBuyThreshold = minPrice + (range * 0.2);

    const currentPrice = data[data.length - 1].price;
    const isGoodPrice = currentPrice <= goodBuyThreshold;

    return (
        <Card className="bg-card shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        Histórico de Preços (30 dias)
                    </CardTitle>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        A área verde indica um bom momento de compra.
                    </p>
                </div>
                {isGoodPrice && (
                    <Badge variant="default" className="bg-success text-success-foreground animate-pulse">
                        Bom momento pra comprar!
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="h-[320px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />

                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            minTickGap={40}
                            style={{ fontSize: '11px', fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />

                        <YAxis
                            domain={[domainMin, domainMax]}
                            tickFormatter={(val) => `R$${val / 100}`}
                            width={70}
                            style={{ fontSize: '11px', fill: 'hsl(var(--muted-foreground))' }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            formatter={(value: number) => [formatPrice(value), "Preço"]}
                            labelFormatter={(label) => formatDate(label)}
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid hsl(var(--border))',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                backgroundColor: 'hsl(var(--popover))',
                                color: 'hsl(var(--popover-foreground))'
                            }}
                        />

                        {/* Good Buy Zone (Green Background) */}
                        <ReferenceArea
                            y1={domainMin}
                            y2={goodBuyThreshold}
                            fill="hsl(var(--success))"
                            fillOpacity={0.05}
                        />

                        {/* Average Line */}
                        <ReferenceLine
                            y={avgPrice}
                            stroke="hsl(var(--muted-foreground))"
                            strokeDasharray="3 3"
                            label={{
                                value: "Média",
                                position: 'insideRight',
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 10
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
