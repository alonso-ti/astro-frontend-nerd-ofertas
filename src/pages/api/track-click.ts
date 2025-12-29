---
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();
        const { productId, category, timestamp } = data;

        // Write to Analytics Engine for trending algorithm
        const analytics = locals.runtime?.env?.ANALYTICS;
        if (analytics) {
            // Record click event
            analytics.writeDataPoint({
                // blobs: string data
                blobs: [productId, category],
                // doubles: numeric data
                doubles: [1], // click count
                // indexes: for efficient filtering
                indexes: [productId],
            });
        }

        // Fallback to KV if Analytics Engine not available (local dev)
        const kv = locals.runtime?.env?.KV;
        if (!analytics && kv) {
            const key = `clicks:${productId}`;
            const currentClicks = await kv.get(key);
            const newCount = currentClicks ? parseInt(currentClicks) + 1 : 1;
            await kv.put(key, newCount.toString(), { expirationTtl: 60 * 60 * 24 * 7 });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Click tracking error:', error);
        return new Response(JSON.stringify({ error: 'Failed to track click' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
