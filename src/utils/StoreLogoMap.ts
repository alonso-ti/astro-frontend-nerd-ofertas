/**
 * Store Logo Mapping Utility
 * Maps store names to their logo URLs and brand information
 */

export type StoreInfo = {
    name: string;
    displayName: string;
    logo: string;
    color?: string; // Brand primary color for theming
    isOfficial?: boolean;
};

/**
 * Map of store identifiers to store information
 * Keys are lowercase normalized store names for easy matching
 */
export const STORE_MAP: Record<string, StoreInfo> = {
    // Major Brazilian Retailers
    'amazon': {
        name: 'amazon',
        displayName: 'Amazon',
        logo: 'https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-2.png',
        color: '#FF9900',
        isOfficial: true,
    },
    'kabum': {
        name: 'kabum',
        displayName: 'KaBuM!',
        logo: 'https://logodownload.org/wp-content/uploads/2017/11/kabum-logo.png',
        color: '#FF6500',
        isOfficial: true,
    },
    'mercadolivre': {
        name: 'mercadolivre',
        displayName: 'Mercado Livre',
        logo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/logo__large_plus.png',
        color: '#FFE600',
        isOfficial: true,
    },
    'americanas': {
        name: 'americanas',
        displayName: 'Americanas',
        logo: 'https://logodownload.org/wp-content/uploads/2020/02/americanas-logo.png',
        color: '#E8192A',
        isOfficial: true,
    },
    'magazineluiza': {
        name: 'magazineluiza',
        displayName: 'Magazine Luiza',
        logo: 'https://logodownload.org/wp-content/uploads/2014/07/magazine-luiza-logo.png',
        color: '#0086FF',
        isOfficial: true,
    },
    'magalu': {
        name: 'magalu',
        displayName: 'Magalu',
        logo: 'https://logodownload.org/wp-content/uploads/2014/07/magazine-luiza-logo.png',
        color: '#0086FF',
        isOfficial: true,
    },
    'casasbahia': {
        name: 'casasbahia',
        displayName: 'Casas Bahia',
        logo: 'https://logodownload.org/wp-content/uploads/2014/07/casas-bahia-logo.png',
        color: '#F59E00',
        isOfficial: true,
    },
    'pichau': {
        name: 'pichau',
        displayName: 'Pichau',
        logo: 'https://www.pichau.com.br/img/logo.svg',
        color: '#F58220',
        isOfficial: true,
    },
    'terabyteshop': {
        name: 'terabyteshop',
        displayName: 'Terabyte Shop',
        logo: 'https://www.terabyteshop.com.br/themes/t3/images/logo-terabyte.svg',
        color: '#E31E24',
        isOfficial: true,
    },
    'terabyte': {
        name: 'terabyte',
        displayName: 'Terabyte',
        logo: 'https://www.terabyteshop.com.br/themes/t3/images/logo-terabyte.svg',
        color: '#E31E24',
        isOfficial: true,
    },
    'leveros': {
        name: 'leveros',
        displayName: 'Leveros',
        logo: '/placeholder-store.svg', // Placeholder, update with actual logo if available
        color: '#666666',
        isOfficial: false,
    },
    'submarino': {
        name: 'submarino',
        displayName: 'Submarino',
        logo: 'https://logodownload.org/wp-content/uploads/2020/02/submarino-logo.png',
        color: '#0073CF',
        isOfficial: true,
    },
    'extracom': {
        name: 'extracom',
        displayName: 'Extra',
        logo: 'https://logodownload.org/wp-content/uploads/2020/11/extra-logo.png',
        color: '#E20714',
        isOfficial: true,
    },
    'pontofrio': {
        name: 'pontofrio',
        displayName: 'Ponto Frio',
        logo: 'https://logodownload.org/wp-content/uploads/2014/07/ponto-frio-logo.png',
        color: '#0060AF',
        isOfficial: true,
    },
};

/**
 * Normalizes a store name for lookup
 * Removes special characters, spaces, and converts to lowercase
 */
export function normalizeStoreName(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]/g, ''); // Remove special chars and spaces
}

/**
 * Gets store information based on store name
 * Falls back to a default store info if not found
 */
export function getStoreInfo(storeName: string | undefined): StoreInfo {
    if (!storeName) {
        return {
            name: 'unknown',
            displayName: 'Loja Desconhecida',
            logo: '/placeholder-store.svg',
            color: '#666666',
            isOfficial: false,
        };
    }

    const normalized = normalizeStoreName(storeName);

    // Try exact match first
    if (STORE_MAP[normalized]) {
        return STORE_MAP[normalized];
    }

    // Try partial match (e.g., "KaBuM! Oficial" matches "kabum")
    const partialMatch = Object.keys(STORE_MAP).find(key =>
        normalized.includes(key) || key.includes(normalized)
    );

    if (partialMatch) {
        return STORE_MAP[partialMatch];
    }

    // Return default if no match
    return {
        name: normalized,
        displayName: storeName,
        logo: '/placeholder-store.svg',
        color: '#666666',
        isOfficial: false,
    };
}

/**
 * Gets all available stores
 */
export function getAllStores(): StoreInfo[] {
    return Object.values(STORE_MAP);
}
