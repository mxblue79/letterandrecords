import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface EmailCopyProps {
    email: string;
    label?: string;
    className?: string;
    showIcon?: boolean;
}

export function EmailCopy({ email, label, className = '', showIcon = false }: EmailCopyProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className={`relative group inline-block ${className}`}>
            <button
                onClick={handleCopy}
                className="hover:text-black transition-colors flex items-center gap-2 text-left group-hover:opacity-70 [font-family:inherit] text-[length:inherit] font-[weight:inherit]"
            >
                {label ? (
                    <>
                        {label}
                    </>
                ) : (
                    email
                )}
                {showIcon && <Copy size={14} className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-all" />}
            </button>

            {/* Copied Toast/Message */}
            <div className={`absolute left-0 -top-8 bg-black text-white text-xs px-3 py-1.5 rounded transition-all duration-300 pointer-events-none flex items-center gap-1.5 z-50 whitespace-nowrap ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <Check size={12} />
                주소를 복사하였습니다
            </div>
        </div>
    );
}
