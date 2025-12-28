import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Facebook, Twitter, Link as LinkIcon, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
    title: string;
    url?: string;
    description?: string;
    className?: string;
}

export default function ShareButton({ title, url, description, className }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = description || `Confira ${title} com o melhor preço!`;

    // Native Web Share API (mobile-first)
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                // User cancelled or API not available
                console.log('Share cancelled or failed:', err);
            }
        } else {
            // Fallback: show share options
            setShowOptions(!showOptions);
        }
    };

    // Copy link to clipboard
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Social share URLs
    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleNativeShare}
                className={cn('text-muted-foreground hover:text-foreground', className)}
                aria-label="Compartilhar produto"
            >
                <Share2 className="w-4 h-4" />
            </Button>

            {/* Fallback Share Options (desktop) */}
            {showOptions && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowOptions(false)}
                    />

                    {/* Share Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="space-y-1">
                            {/* Copy Link */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 text-success" />
                                        <span className="text-success">Link copiado!</span>
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="w-4 h-4" />
                                        <span>Copiar link</span>
                                    </>
                                )}
                            </button>

                            {/* WhatsApp */}
                            <a
                                href={shareLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span>WhatsApp</span>
                            </a>

                            {/* Facebook */}
                            <a
                                href={shareLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                                <span>Facebook</span>
                            </a>

                            {/* Twitter */}
                            <a
                                href={shareLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                                <span>Twitter</span>
                            </a>

                            {/* Email */}
                            <a
                                href={shareLinks.email}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
