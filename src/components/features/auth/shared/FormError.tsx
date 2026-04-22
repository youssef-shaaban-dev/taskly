import { useFormContext } from "react-hook-form";

export default function FormError() {

    const { formState: { errors } } = useFormContext();

    const message = errors.root?.message;

    const rootError = errors.root;

    return (
        rootError && (
            <div className="bg-red-50 text-error text-xs p-3 rounded-sm border border-error/20 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{message}</span>
            </div>
        )
    );
}

