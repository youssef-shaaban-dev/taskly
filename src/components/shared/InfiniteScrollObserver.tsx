"use client";
import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
    onIntersect: () => void;
    isLoading: boolean;
    hasMore: boolean;
}

export const InfiniteScrollObserver = ({ onIntersect, isLoading, hasMore }: InfiniteScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    onIntersect();
                }
            },
            { threshold: 0.5 }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => observer.disconnect();
    }, [onIntersect, isLoading, hasMore]);

    if (!hasMore) return null;

    return (
        <div ref={targetRef} className="w-full py-6 flex items-center justify-center">
            {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    Loading more...
                </div>
            )}
        </div>
    );
};