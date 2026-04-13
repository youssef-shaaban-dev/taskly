import { ComponentPropsWithoutRef, useId } from "react"

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
    error?: string;
}

const Input = ({ label, error, className = "", ...props }: InputProps) => {
    const inputId = useId();

    return (
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor={inputId}
                className={`form-label ${error ? "text-error" : "text-slate-400"}`}
            >
                {label}
            </label>

            <input
                id={inputId}
                className={`
        
          ${error
                        ? "bg-red-50 text-error border-error/20"
                        : "bg-surface-low text-slate-900 border-transparent focus:bg-white focus:ring-1 focus:ring-primary/20"}
          
          ${className}
        `}
                {...props}
            />

            {/* Error Message */}
            {error && (
                <span className="form-label text-error mt-1">
                    {error}
                </span>
            )}
        </div>
    )
}

export default Input