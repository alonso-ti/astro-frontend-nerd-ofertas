import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type TabConfig = {
    id: string;
    label: string;
    icon?: React.ReactNode;
};

interface TabNavigationProps {
    tabs: TabConfig[];
    defaultTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}

export default function TabNavigation({
    tabs,
    defaultTab,
    onTabChange,
    className,
}: TabNavigationProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    // Sync with URL hash if present
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash && tabs.some(tab => tab.id === hash)) {
            setActiveTab(hash);
        }
    }, [tabs]);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);

        // Update URL hash
        window.history.replaceState(null, '', `#${tabId}`);

        // Call callback if provided
        onTabChange?.(tabId);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
        let nextIndex = currentIndex;

        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            e.preventDefault();
        } else if (e.key === 'Home') {
            nextIndex = 0;
            e.preventDefault();
        } else if (e.key === 'End') {
            nextIndex = tabs.length - 1;
            e.preventDefault();
        }

        if (nextIndex !== currentIndex) {
            handleTabClick(tabs[nextIndex].id);
            // Focus the new tab button
            const tabButton = document.querySelector(
                `[data-tab-id="${tabs[nextIndex].id}"]`
            ) as HTMLButtonElement;
            tabButton?.focus();
        }
    };

    return (
        <div className={cn('border-b border-border bg-card', className)}>
            <div
                role="tablist"
                aria-label="Product information tabs"
                className="flex gap-1 overflow-x-auto scrollbar-hide px-4 md:px-0"
            >
                {tabs.map((tab, index) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${tab.id}`}
                            id={`tab-${tab.id}`}
                            data-tab-id={tab.id}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => handleTabClick(tab.id)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={cn(
                                'relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200',
                                'hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-t-md',
                                isActive
                                    ? 'text-primary border-b-2 border-primary bg-background'
                                    : 'text-muted-foreground hover:bg-muted/50'
                            )}
                        >
                            <span className="flex items-center gap-2">
                                {tab.icon}
                                {tab.label}
                            </span>

                            {/* Active indicator line */}
                            {isActive && (
                                <span
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-bottom"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * Tab Panel Component - Wrapper for tab content
 */
interface TabPanelProps {
    id: string;
    activeTab: string;
    children: React.ReactNode;
    className?: string;
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
    const isActive = id === activeTab;

    return (
        <div
            role="tabpanel"
            id={`tabpanel-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={!isActive}
            tabIndex={0}
            className={cn(
                'py-6 focus:outline-none',
                isActive ? 'animate-in fade-in-50 slide-in-from-bottom-2 duration-300' : '',
                className
            )}
        >
            {isActive && children}
        </div>
    );
}
