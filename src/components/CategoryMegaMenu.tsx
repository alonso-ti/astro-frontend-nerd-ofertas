import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { CATEGORY_TREE, type Category } from '../lib/categories';

export default function CategoryMegaMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);

    const buildCategoryUrl = (parent: Category, child?: Category) => {
        if (child) {
            return `/${parent.slug}/${child.slug}`;
        }
        return `/${parent.slug}`;
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Menu de categorias"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Mega Menu */}
            <nav className="hidden lg:block">
                <ul className="flex items-center gap-1">
                    {CATEGORY_TREE.map((category) => (
                        <li
                            key={category.id}
                            className="relative group"
                            onMouseEnter={() => setActiveMega(category.id)}
                            onMouseLeave={() => setActiveMega(null)}
                        >
                            <a
                                href={`/${category.slug}`}
                                className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-lg hover:bg-muted"
                            >
                                {category.icon && <span className="text-lg">{category.icon}</span>}
                                {category.name}
                                {category.children && category.children.length > 0 && (
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                )}
                            </a>

                            {/* Mega Dropdown */}
                            {category.children && category.children.length > 0 && (
                                <div
                                    className={`
                    absolute top-full left-0 mt-1 w-[600px] bg-card border border-border rounded-xl shadow-xl p-6
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all duration-200 z-50
                  `}
                                >
                                    <div className="grid grid-cols-2 gap-6">
                                        {category.children.map((subcategory) => (
                                            <div key={subcategory.id}>
                                                <a
                                                    href={buildCategoryUrl(category, subcategory)}
                                                    className="block font-semibold text-foreground hover:text-primary mb-2 transition-colors"
                                                >
                                                    {subcategory.name}
                                                </a>
                                                {subcategory.description && (
                                                    <p className="text-xs text-muted-foreground mb-2">
                                                        {subcategory.description}
                                                    </p>
                                                )}
                                                {subcategory.children && subcategory.children.length > 0 && (
                                                    <ul className="space-y-1 ml-2">
                                                        {subcategory.children.map((subchild) => (
                                                            <li key={subchild.id}>
                                                                <a
                                                                    href={buildCategoryUrl(category, subchild)}
                                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                                >
                                                                    → {subchild.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* View All Link */}
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <a
                                            href={`/${category.slug}`}
                                            className="text-sm font-semibold text-primary hover:underline"
                                        >
                                            Ver todos em {category.name} →
                                        </a>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-card border-r border-border overflow-y-auto">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-bold text-lg">Categorias</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 space-y-2">
                            {CATEGORY_TREE.map((category) => (
                                <div key={category.id} className="space-y-1">
                                    <a
                                        href={`/${category.slug}`}
                                        className="flex items-center gap-2 p-3 hover:bg-muted rounded-lg transition-colors font-semibold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {category.icon && <span className="text-xl">{category.icon}</span>}
                                        {category.name}
                                    </a>

                                    {category.children && category.children.length > 0 && (
                                        <div className="ml-6 space-y-1">
                                            {category.children.map((subcategory) => (
                                                <div key={subcategory.id}>
                                                    <a
                                                        href={buildCategoryUrl(category, subcategory)}
                                                        className="block p-2 text-sm hover:bg-muted rounded-lg transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subcategory.name}
                                                    </a>
                                                    {subcategory.children && subcategory.children.length > 0 && (
                                                        <div className="ml-4 space-y-1">
                                                            {subcategory.children.map((subchild) => (
                                                                <a
                                                                    key={subchild.id}
                                                                    href={buildCategoryUrl(category, subchild)}
                                                                    className="block p-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {subchild.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
