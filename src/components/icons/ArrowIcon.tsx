import { ComponentPropsWithoutRef } from "react"

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: number;
}

export const ArrowIcon = ({ size = 12, className = "", ...props }: IconProps) => (
    <svg
        width={size}
        height={size * (20 / 12)}
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-200 ${className}`}
        {...props}
    >
        <path
            d="M10 20L0 10L10 0L11.775 1.775L3.55 10L11.775 18.225L10 20Z"
            fill="currentColor"
        />
    </svg>
)
