export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    description?: string;
    children?: Category[];
    productCount?: number;
}

export const CATEGORY_TREE: Category[] = [
    {
        id: 'eletronicos',
        name: 'Eletrônicos',
        slug: 'eletronicos',
        icon: '📱',
        children: [
            { id: 'smartphones', name: 'Smartphones', slug: 'smartphones' },
            { id: 'tablets', name: 'Tablets', slug: 'tablets' },
            { id: 'smartwatches', name: 'Smartwatches', slug: 'smartwatches' },
            { id: 'fones', name: 'Fones de Ouvido', slug: 'fones' },
            { id: 'cameras', name: 'Câmeras', slug: 'cameras' },
            { id: 'drones', name: 'Drones', slug: 'drones' },
        ],
    },
    {
        id: 'informatica',
        name: 'Informática',
        slug: 'informatica',
        icon: '💻',
        children: [
            {
                id: 'notebooks',
                name: 'Notebooks',
                slug: 'notebooks',
                children: [
                    { id: 'notebooks-gamer', name: 'Gamer', slug: 'notebooks-gamer' },
                    { id: 'notebooks-profissional', name: 'Profissional', slug: 'notebooks-profissional' },
                    { id: 'ultrabooks', name: 'Ultrabooks', slug: 'ultrabooks' },
                ],
            },
            {
                id: 'componentes',
                name: 'Componentes PC',
                slug: 'componentes',
                children: [
                    { id: 'processadores', name: 'Processadores', slug: 'processadores' },
                    { id: 'placas-de-video', name: 'Placas de Vídeo', slug: 'placas-de-video' },
                    { id: 'memorias', name: 'Memórias RAM', slug: 'memorias' },
                    { id: 'placas-mae', name: 'Placas-Mãe', slug: 'placas-mae' },
                    { id: 'ssd', name: 'SSDs', slug: 'ssd' },
                    { id: 'hd', name: 'HDs', slug: 'hd' },
                    { id: 'fontes', name: 'Fontes', slug: 'fontes' },
                    { id: 'gabinetes', name: 'Gabinetes', slug: 'gabinetes' },
                    { id: 'coolers', name: 'Coolers', slug: 'coolers' },
                ],
            },
            {
                id: 'perifericos',
                name: 'Periféricos',
                slug: 'perifericos',
                children: [
                    { id: 'monitores', name: 'Monitores', slug: 'monitores' },
                    { id: 'teclados', name: 'Teclados', slug: 'teclados' },
                    { id: 'mouses', name: 'Mouses', slug: 'mouses' },
                    { id: 'headsets', name: 'Headsets', slug: 'headsets' },
                    { id: 'webcams', name: 'Webcams', slug: 'webcams' },
                    { id: 'impressoras', name: 'Impressoras', slug: 'impressoras' },
                ],
            },
            { id: 'roteadores', name: 'Roteadores', slug: 'roteadores' },
            { id: 'nobreak', name: 'Nobreaks', slug: 'nobreak' },
        ],
    },
    {
        id: 'games',
        name: 'Games',
        slug: 'games',
        icon: '🎮',
        children: [
            { id: 'playstation', name: 'PlayStation', slug: 'playstation' },
            { id: 'xbox', name: 'Xbox', slug: 'xbox' },
            { id: 'nintendo', name: 'Nintendo', slug: 'nintendo' },
            { id: 'jogos', name: 'Jogos', slug: 'jogos' },
            { id: 'cadeiras-gamer', name: 'Cadeiras Gamer', slug: 'cadeiras-gamer' },
            { id: 'mesas-gamer', name: 'Mesas Gamer', slug: 'mesas-gamer' },
        ],
    },
    {
        id: 'eletrodomesticos',
        name: 'Eletrodomésticos',
        slug: 'eletrodomesticos',
        icon: '🏠',
        children: [
            { id: 'geladeiras', name: 'Geladeiras', slug: 'geladeiras' },
            { id: 'fogoes', name: 'Fogões', slug: 'fogoes' },
            { id: 'micro-ondas', name: 'Micro-ondas', slug: 'micro-ondas' },
            { id: 'maquina-lavar', name: 'Máquinas de Lavar', slug: 'maquina-lavar' },
            { id: 'ar-condicionado', name: 'Ar Condicionado', slug: 'ar-condicionado' },
            { id: 'ventiladores', name: 'Ventiladores', slug: 'ventiladores' },
            { id: 'liquidificadores', name: 'Liquidificadores', slug: 'liquidificadores' },
            { id: 'aspiradores', name: 'Aspiradores', slug: 'aspiradores' },
            { id: 'cafeteiras', name: 'Cafeteiras', slug: 'cafeteiras' },
        ],
    },
    {
        id: 'tv-audio',
        name: 'TV e Áudio',
        slug: 'tv-audio',
        icon: '📺',
        children: [
            { id: 'smart-tv', name: 'Smart TVs', slug: 'smart-tv' },
            { id: 'soundbar', name: 'Soundbars', slug: 'soundbar' },
            { id: 'home-theater', name: 'Home Theater', slug: 'home-theater' },
            { id: 'projetores', name: 'Projetores', slug: 'projetores' },
            { id: 'caixas-som', name: 'Caixas de Som', slug: 'caixas-som' },
        ],
    },
    {
        id: 'moveis',
        name: 'Móveis',
        slug: 'moveis',
        icon: '🪑',
        children: [
            { id: 'sofas', name: 'Sofás', slug: 'sofas' },
            { id: 'camas', name: 'Camas', slug: 'camas' },
            { id: 'guarda-roupas', name: 'Guarda-roupas', slug: 'guarda-roupas' },
            { id: 'mesas', name: 'Mesas', slug: 'mesas' },
            { id: 'cadeiras-escritorio', name: 'Cadeiras de Escritório', slug: 'cadeiras-escritorio' },
            { id: 'estantes', name: 'Estantes', slug: 'estantes' },
        ],
    },
    {
        id: 'casa-decoracao',
        name: 'Casa e Decoração',
        slug: 'casa-decoracao',
        icon: '🏡',
        children: [
            { id: 'cama-mesa-banho', name: 'Cama, Mesa e Banho', slug: 'cama-mesa-banho' },
            { id: 'organizacao', name: 'Organização', slug: 'organizacao' },
            { id: 'decoracao', name: 'Decoração', slug: 'decoracao' },
            { id: 'iluminacao', name: 'Iluminação', slug: 'iluminacao' },
            { id: 'ferramentas', name: 'Ferramentas', slug: 'ferramentas' },
            { id: 'jardinagem', name: 'Jardinagem', slug: 'jardinagem' },
        ],
    },
    {
        id: 'moda',
        name: 'Moda',
        slug: 'moda',
        icon: '👔',
        children: [
            { id: 'roupas-masculino', name: 'Roupas Masculinas', slug: 'roupas-masculino' },
            { id: 'roupas-feminino', name: 'Roupas Femininas', slug: 'roupas-feminino' },
            { id: 'calcados', name: 'Calçados', slug: 'calcados' },
            { id: 'bolsas', name: 'Bolsas', slug: 'bolsas' },
            { id: 'acessorios', name: 'Acessórios', slug: 'acessorios' },
            { id: 'relogios', name: 'Relógios', slug: 'relogios' },
        ],
    },
    {
        id: 'esportes',
        name: 'Esportes e Fitness',
        slug: 'esportes',
        icon: '⚽',
        children: [
            { id: 'academia', name: 'Academia', slug: 'academia' },
            { id: 'corrida', name: 'Corrida', slug: 'corrida' },
            { id: 'ciclismo', name: 'Ciclismo', slug: 'ciclismo' },
            { id: 'futebol', name: 'Futebol', slug: 'futebol' },
            { id: 'natacao', name: 'Natação', slug: 'natacao' },
            { id: 'camping', name: 'Camping', slug: 'camping' },
        ],
    },
    {
        id: 'beleza',
        name: 'Beleza e Perfumaria',
        slug: 'beleza',
        icon: '💄',
        children: [
            { id: 'perfumes', name: 'Perfumes', slug: 'perfumes' },
            { id: 'maquiagem', name: 'Maquiagem', slug: 'maquiagem' },
            { id: 'cuidados-pele', name: 'Cuidados com a Pele', slug: 'cuidados-pele' },
            { id: 'cabelos', name: 'Cabelos', slug: 'cabelos' },
            { id: 'higiene', name: 'Higiene Pessoal', slug: 'higiene' },
        ],
    },
    {
        id: 'saude',
        name: 'Saúde',
        slug: 'saude',
        icon: '💊',
        children: [
            { id: 'suplementos', name: 'Suplementos', slug: 'suplementos' },
            { id: 'vitaminas', name: 'Vitaminas', slug: 'vitaminas' },
            { id: 'medicamentos', name: 'Medicamentos', slug: 'medicamentos' },
            { id: 'equipamentos-medicos', name: 'Equipamentos Médicos', slug: 'equipamentos-medicos' },
        ],
    },
    {
        id: 'livros',
        name: 'Livros e Papelaria',
        slug: 'livros',
        icon: '📚',
        children: [
            { id: 'livros-ficção', name: 'Ficção', slug: 'livros-ficcao' },
            { id: 'livros-tecnicos', name: 'Técnicos', slug: 'livros-tecnicos' },
            { id: 'papelaria', name: 'Papelaria', slug: 'papelaria' },
            { id: 'material-escolar', name: 'Material Escolar', slug: 'material-escolar' },
        ],
    },
    {
        id: 'brinquedos',
        name: 'Brinquedos',
        slug: 'brinquedos',
        icon: '🧸',
        children: [
            { id: 'acao', name: 'Bonecos de Ação', slug: 'acao' },
            { id: 'bonecas', name: 'Bonecas', slug: 'bonecas' },
            { id: 'lego', name: 'LEGO', slug: 'lego' },
            { id: 'educativos', name: 'Educativos', slug: 'educativos' },
            { id: 'bebes', name: 'Bebês', slug: 'bebes' },
        ],
    },
    {
        id: 'automotivo',
        name: 'Automotivo',
        slug: 'automotivo',
        icon: '🚗',
        children: [
            { id: 'acessorios-carro', name: 'Acessórios', slug: 'acessorios-carro' },
            { id: 'som-automotivo', name: 'Som Automotivo', slug: 'som-automotivo' },
            { id: 'ferramentas-auto', name: 'Ferramentas', slug: 'ferramentas-auto' },
            { id: 'gps', name: 'GPS', slug: 'gps' },
        ],
    },
    {
        id: 'pet',
        name: 'Pet Shop',
        slug: 'pet',
        icon: '🐾',
        children: [
            { id: 'racoes', name: 'Rações', slug: 'racoes' },
            { id: 'brinquedos-pet', name: 'Brinquedos', slug: 'brinquedos-pet' },
            { id: 'higiene-pet', name: 'Higiene', slug: 'higiene-pet' },
            { id: 'acessorios-pet', name: 'Acessórios', slug: 'acessorios-pet' },
        ],
    },
];

// Helper functions
export function getCategoryBySlug(slug: string, tree: Category[] = CATEGORY_TREE): Category | null {
    for (const category of tree) {
        if (category.slug === slug) {
            return category;
        }
        if (category.children) {
            const found = getCategoryBySlug(slug, category.children);
            if (found) return found;
        }
    }
    return null;
}

export function getCategoryPath(slug: string, tree: Category[] = CATEGORY_TREE, path: Category[] = []): Category[] {
    for (const category of tree) {
        if (category.slug === slug) {
            return [...path, category];
        }
        if (category.children) {
            const found = getCategoryPath(slug, category.children, [...path, category]);
            if (found.length > 0) return found;
        }
    }
    return [];
}

export function getAllCategories(tree: Category[] = CATEGORY_TREE): Category[] {
    const result: Category[] = [];
    for (const category of tree) {
        result.push(category);
        if (category.children) {
            result.push(...getAllCategories(category.children));
        }
    }
    return result;
}

// Get top-level categories only
export function getMainCategories(): Category[] {
    return CATEGORY_TREE;
}

// Get category count
export function getCategoryCount(): number {
    return getAllCategories().length;
}
