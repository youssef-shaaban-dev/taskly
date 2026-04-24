import { ComponentPropsWithoutRef } from "react"

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: number;
}

export const WifiOffIcon = ({ size = 18, className = "", ...props }: IconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-200 ${className}`}
        {...props}
    >
        <path
            d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.51L18.18 13.84 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"
            fill="currentColor"
        />
    </svg>
)
