import { useState } from 'react';
import { Filter, X, DollarSign, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OfferFiltersProps {
    onFilterChange: (filters: FilterState) => void;
    availableStores: string[];
}

export interface FilterState {
    minPrice?: number;
    maxPrice?: number;
    selectedStores: string[];
    showVerifiedOnly: boolean;
}

export default function OfferFilters({ onFilterChange, availableStores }: OfferFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        selectedStores: [],
        showVerifiedOnly: false,
    });

    const handleFilterUpdate = (updates: Partial<FilterState>) => {
        const newFilters = { ...filters, ...updates };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleStoreToggle = (store: string) => {
        const newStores = filters.selectedStores.includes(store)
            ? filters.selectedStores.filter(s => s !== store)
            : [...filters.selectedStores, store];
        handleFilterUpdate({ selectedStores: newStores });
    };

    const clearFilters = () => {
        const resetFilters: FilterState = {
            selectedStores: [],
            showVerifiedOnly: false,
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    const activeFiltersCount =
        (filters.minPrice ? 1 : 0) +
        (filters.maxPrice ? 1 : 0) +
        filters.selectedStores.length +
        (filters.showVerifiedOnly ? 1 : 0);

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
            >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
                {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                    </span>
                )}
            </Button>

            {/* Filter Panel */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                        <h3 className="font-bold text-lg">Filtros</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Faixa de Preço
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="number"
                                placeholder="Mín R$"
                                value={filters.minPrice || ''}
                                onChange={(e) => handleFilterUpdate({ minPrice: parseFloat(e.target.value) || undefined })}
                            />
                            <Input
                                type="number"
                                placeholder="Máx R$"
                                value={filters.maxPrice || ''}
                                onChange={(e) => handleFilterUpdate({ maxPrice: parseFloat(e.target.value) || undefined })}
                            />
                        </div>
                    </div>

                    {/* Store Filter */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Store className="w-4 h-4" />
                            Lojas
                        </Label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {availableStores.map((store) => (
                                <label key={store} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.selectedStores.includes(store)}
                                        onChange={() => handleStoreToggle(store)}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="text-sm">{store}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Verified Only */}
                    <div className="pt-3 border-t border-border">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.showVerifiedOnly}
                                onChange={(e) => handleFilterUpdate({ showVerifiedOnly: e.target.checked })}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm">Somente lojas verificadas</span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3">
                        <Button variant="outline" onClick={clearFilters} className="flex-1">
                            Limpar
                        </Button>
                        <Button onClick={() => setIsOpen(false)} className="flex-1">
                            Aplicar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
