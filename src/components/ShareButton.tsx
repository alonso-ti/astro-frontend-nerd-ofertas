import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ShareButtonProps {
    title: string;
    description?: string;
    className?: string;
}

export default function ShareButton({ title, description, className = '' }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        const shareData = {
            title,
            text: description || title,
            url,
        };

        // Check if native share is available (mobile)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled or failed');
            }
        } else {
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy');
            }
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={`text-muted-foreground hover:text-foreground ${className}`}
            onClick={handleShare}
            title={copied ? 'Link copiado!' : 'Compartilhar'}
        >
            <Share2 className="w-4 h-4" />
        </Button>
    );
}
