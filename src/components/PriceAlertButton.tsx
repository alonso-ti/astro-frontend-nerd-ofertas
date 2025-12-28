import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, BellOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceAlertButtonProps {
    productId: string;
    productTitle: string;
    currentPrice: number;
    className?: string;
}

export default function PriceAlertButton({
    productId,
    productTitle,
    currentPrice,
    className,
}: PriceAlertButtonProps) {
    const [showForm, setShowForm] = useState(false);
    const [targetPrice, setTargetPrice] = useState('');
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price / 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: Integrate with backend API
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubscribed(true);
        setIsLoading(false);
        setShowForm(false);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubscribed(false);
        }, 3000);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        if (showForm) {
            setTargetPrice('');
            setEmail('');
        }
    };

    return (
        <div className={cn('relative', className)}>
            <Button
                variant={isSubscribed ? 'default' : 'outline'}
                size="lg"
                onClick={toggleForm}
                className={cn(
                    'w-full font-semibold transition-all',
                    isSubscribed && 'bg-success hover:bg-success/90 text-white'
                )}
            >
                {isSubscribed ? (
                    <>
                        <Check className="w-5 h-5 mr-2" />
                        Alerta Criado!
                    </>
                ) : (
                    <>
                        <Bell className="w-5 h-5 mr-2" />
                        Criar Alerta de Preço
                    </>
                )}
            </Button>

            {/* Alert Form Popover */}
            {showForm && !isSubscribed && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40 md:hidden"
                        onClick={toggleForm}
                    />

                    {/* Form */}
                    <div className="absolute left-0 right-0 md:left-auto md:right-0 top-full mt-2 w-full md:w-80 bg-card border border-border rounded-lg shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-sm">Alerta de Preço</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Notificaremos quando o preço cair
                                </p>
                            </div>
                            <button
                                onClick={toggleForm}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Fechar"
                            >
                                <BellOff className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Target Price */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">
                                    Avisar quando chegar em:
                                </label>
                                <Input
                                    type="number"
                                    placeholder={formatPrice(currentPrice * 0.9).replace('R$', '').trim()}
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    className="h-9"
                                    required
                                    min={0}
                                    step={0.01}
                                />
                                <p className="text-[10px] text-muted-foreground mt-1">
                                    Preço atual: {formatPrice(currentPrice)}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1">
                                    Seu e-mail:
                                </label>
                                <Input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-9"
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                size="sm"
                                className="w-full font-semibold"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Criando...
                                    </>
                                ) : (
                                    <>
                                        <Bell className="w-4 h-4 mr-2" />
                                        Criar Alerta
                                    </>
                                )}
                            </Button>

                            <p className="text-[10px] text-muted-foreground text-center">
                                Você receberá um email quando o preço atingir o valor desejado
                            </p>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
