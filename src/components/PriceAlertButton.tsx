import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface PriceAlertButtonProps {
    productId: string;
    productTitle: string;
    currentPrice: number;
    className?: string;
}

const DB_SERVICE_URL = import.meta.env.PUBLIC_DB_SERVICE_URL || 'http://localhost:8787';

export default function PriceAlertButton({
    productId,
    productTitle,
    currentPrice,
    className = ''
}: PriceAlertButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [created, setCreated] = useState(false);
    const [email, setEmail] = useState('');
    const [targetPrice, setTargetPrice] = useState(Math.floor(currentPrice * 0.9) / 100); // 10% discount

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleCreateAlert = async () => {
        if (!email || !targetPrice) {
            alert('Preencha todos os campos');
            return;
        }

        setIsCreating(true);

        try {
            const response = await fetch(`${DB_SERVICE_URL}/alerts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    userEmail: email,
                    targetPrice: Math.floor(targetPrice * 100), // Convert to cents
                    currentPrice,
                }),
            });

            if (!response.ok) throw new Error('Failed to create alert');

            setCreated(true);
            setTimeout(() => {
                setCreated(false);
                setIsOpen(false);
                setEmail('');
            }, 2000);
        } catch (error) {
            console.error('Error creating alert:', error);
            alert('Erro ao criar alerta. Tente novamente.');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <>
            <Button
                variant="outline"
                size="lg"
                className={`h-12 font-semibold ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <Bell className="w-5 h-5 mr-2" />
                Criar Alerta
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Criar Alerta de Preço</DialogTitle>
                        <DialogDescription>
                            Receba uma notificação quando o preço de <strong>{productTitle}</strong> atingir o valor desejado.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Seu E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="targetPrice">
                                Preço Desejado
                                <span className="text-xs text-muted-foreground block mt-1">
                                    Preço atual: {formatPrice(currentPrice / 100)}
                                </span>
                            </Label>
                            <Input
                                id="targetPrice"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isCreating}>
                            Cancelar
                        </Button>
                        <Button onClick={handleCreateAlert} disabled={isCreating || created}>
                            {created ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Criado!
                                </>
                            ) : (
                                <>{isCreating ? 'Criando...' : 'Criar Alerta'}</>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
