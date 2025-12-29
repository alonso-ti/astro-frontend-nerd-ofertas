// Session management utilities
export interface User {
    id: string;
    email: string;
}

export function getSessionToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('sessionToken');
}

export function getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

export function isAuthenticated(): boolean {
    return !!getSessionToken() && !!getUser();
}

export async function logout() {
    const token = getSessionToken();

    if (token) {
        try {
            await fetch(`${import.meta.env.PUBLIC_DB_SERVICE_URL || 'http://localhost:8787'}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
    window.location.href = '/';
}

export function requireAuth() {
    if (typeof window === 'undefined') return;

    if (!isAuthenticated()) {
        window.location.href = '/login';
    }
}
