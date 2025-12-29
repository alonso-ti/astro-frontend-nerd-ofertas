import { SlidersHorizontal, X, DollarSign, Tag, Store, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';

interface SearchFiltersProps {
    onFilterChange: (filters: SearchFilterState) => void;
    initialFilters?: SearchFilterState;
}

export interface SearchFilterState {
    categories: string[];
    minPrice?: number;
    maxPrice?: number;
    stores: string[];
    sortBy: 'price_asc' | 'price_desc' | 'relevance' | 'recent';
}

const AVAILABLE_CATEGORIES = [
    'Processadores',
    'Placas de Vídeo',
    'Memória RAM',
    'SSD/HD',
    'Placas-Mãe',
    'Fontes',
    'Gabinetes',
    'Monitores',
    'Periféricos',
    'Notebooks',
];

const AVAILABLE_STORES = [
    'KaBuM!',
    'Amazon',
    'Mercado Livre',
    'Magazine Luiza',
    'Pichau',
    'Terabyte',
];

export default function SearchFilters({ onFilterChange, initialFilters }: SearchFiltersProps) {
    const parseURLParams = (): SearchFilterState => {
        const params = new URLSearchParams(window.location.search);
        return {
            categories: params.get('categories')?.split(',').filter(Boolean) || [],
            stores: params.get('stores')?.split(',').filter(Boolean) || [],
            minPrice: params.has('minPrice') ? parseFloat(params.get('minPrice')!) : undefined,
            maxPrice: params.has('maxPrice') ? parseFloat(params.get('maxPrice')!) : undefined,
            sortBy: (params.get('sort') as SearchFilterState['sortBy']) || 'relevance',
        };
    };

    const [filters, setFilters] = useState<SearchFilterState>(
        initialFilters || parseURLParams()
    );
    const [isOpen, setIsOpen] = useState(false);

    // Sync filters with URL
    const updateURL = (newFilters: SearchFilterState) => {
        const params = new URLSearchParams(window.location.search);

        // Preserve search query
        const q = params.get('q');
        const newParams = new URLSearchParams();
        if (q) newParams.set('q', q);

        // Add filters to URL
        if (newFilters.categories.length > 0) {
            newParams.set('categories', newFilters.categories.join(','));
        }
        if (newFilters.stores.length > 0) {
            newParams.set('stores', newFilters.stores.join(','));
        }
        if (newFilters.minPrice) {
            newParams.set('minPrice', newFilters.minPrice.toString());
        }
        if (newFilters.maxPrice) {
            newParams.set('maxPrice', newFilters.maxPrice.toString());
        }
        if (newFilters.sortBy !== 'relevance') {
            newParams.set('sort', newFilters.sortBy);
        }

        // Update URL without reload
        window.history.pushState({}, '', `${window.location.pathname}?${newParams.toString()}`);
    };

    useEffect(() => {
        onFilterChange(filters);
        updateURL(filters);
    }, [filters]);

    const handleCategoryToggle = (category: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category],
        }));
    };

    const handleStoreToggle = (store: string) => {
        setFilters(prev => ({
            ...prev,
            stores: prev.stores.includes(store)
                ? prev.stores.filter(s => s !== store)
                : [...prev.stores, store],
        }));
    };

    const clearFilters = () => {
        const resetFilters: SearchFilterState = {
            categories: [],
            stores: [],
            sortBy: 'relevance',
        };
        setFilters(resetFilters);
    };

    const activeFiltersCount =
        filters.categories.length +
        filters.stores.length +
        (filters.minPrice ? 1 : 0) +
        (filters.maxPrice ? 1 : 0);

    return (
        <>
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full relative"
                >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </div>

            {/* Sidebar Filters */}
            <div
                className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
          bg-card border-r lg:border-r-0 lg:border border-border rounded-none lg:rounded-xl
          p-6 space-y-6 overflow-y-auto z-50 transition-transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Mobile Header */}
                <div className="flex lg:hidden items-center justify-between pb-4 border-b border-border">
                    <h2 className="text-lg font-bold">Filtros</h2>
                    <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sort By */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-bold">
                        <ArrowUpDown className="w-4 h-4" />
                        Ordenar por
                    </Label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                    >
                        <option value="relevance">Relevância</option>
                        <option value="price_asc">Menor Preço</option>
                        <option value="price_desc">Maior Preço</option>
                        <option value="recent">Mais Recentes</option>
                    </select>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-bold">
                        <DollarSign className="w-4 h-4" />
                        Faixa de Preço
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Mín R$"
                            value={filters.minPrice || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: parseFloat(e.target.value) || undefined }))}
                            className="text-sm"
                        />
                        <Input
                            type="number"
                            placeholder="Máx R$"
                            value={filters.maxPrice || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseFloat(e.target.value) || undefined }))}
                            className="text-sm"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-bold">
                        <Tag className="w-4 h-4" />
                        Categorias
                    </Label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {AVAILABLE_CATEGORIES.map((category) => (
                            <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(category)}
                                    onChange={() => handleCategoryToggle(category)}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Stores */}
                <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-base font-bold">
                        <Store className="w-4 h-4" />
                        Lojas
                    </Label>
                    <div className="space-y-2">
                        {AVAILABLE_STORES.map((store) => (
                            <label key={store} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.stores.includes(store)}
                                    onChange={() => handleStoreToggle(store)}
                                    className="rounded border-gray-300"
                                />
                                <span className="text-sm">{store}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                        Limpar Filtros ({activeFiltersCount})
                    </Button>
                )}
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
