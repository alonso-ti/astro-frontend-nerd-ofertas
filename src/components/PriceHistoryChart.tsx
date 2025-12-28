import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PriceHistoryChartProps {
    data: { price: number; date: string }[];
}

export default function PriceHistoryChart({ data }: PriceHistoryChartProps) {
    if (!data || data.length === 0) {
        return (
            <Card className="h-[300px] flex items-center justify-center text-muted-foreground">
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

    // Determine min/max for Y axis domain to look nice
    const minPrice = Math.min(...data.map(d => d.price));
    const maxPrice = Math.max(...data.map(d => d.price));
    const domainMin = Math.floor(minPrice * 0.9);
    const domainMax = Math.ceil(maxPrice * 1.1);

    const currentPrice = data[data.length - 1].price;
    const lowestHistory = minPrice;

    const isGoodPrice = currentPrice <= lowestHistory * 1.05; // 5% margin from lowest

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Histórico de Preços</CardTitle>
                {isGoodPrice && <Badge variant="default" className="bg-green-600">Bom momento pra comprar!</Badge>}
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            minTickGap={30}
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            domain={[domainMin, domainMax]}
                            tickFormatter={(val) => `R$ ${val / 100}`}
                            width={80}
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            formatter={(value: number) => [formatPrice(value), "Preço"]}
                            labelFormatter={(label) => formatDate(label)}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#2563eb"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
