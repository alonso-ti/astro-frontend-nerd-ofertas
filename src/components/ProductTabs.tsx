import { useState } from 'react';
import { ShoppingCart, TrendingDown, FileText, Star } from 'lucide-react';

interface ProductTabsProps {
    pricesContent: React.ReactNode;
    historyContent: React.ReactNode;
    specsContent?: React.ReactNode;
    reviewsContent?: React.ReactNode;
}

type TabId = 'prices' | 'history' | 'specs' | 'reviews';

export default function ProductTabs({
    pricesContent,
    historyContent,
    specsContent,
    reviewsContent
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<TabId>('prices');

    const tabs = [
        { id: 'prices' as TabId, label: 'Ofertas', icon: ShoppingCart, content: pricesContent },
        { id: 'history' as TabId, label: 'Histórico', icon: TrendingDown, content: historyContent },
        ...(specsContent ? [{ id: 'specs' as TabId, label: 'Especificações', icon: FileText, content: specsContent }] : []),
        ...(reviewsContent ? [{ id: 'reviews' as TabId, label: 'Avaliações', icon: Star, content: reviewsContent }] : []),
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-border bg-card rounded-t-xl overflow-hidden">
                <div className="flex overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all
                  ${activeTab === tab.id
                                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }
                `}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
