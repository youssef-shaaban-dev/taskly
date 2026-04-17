import { ComponentPropsWithoutRef } from "react"

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: number;
}

export const MenuIcon = ({ size = 18, className = "", ...props }: IconProps) => (
    <svg
        width={size}
        height={size * (12 / 18)}
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-colors duration-200 ${className}`}
        {...props}
    >
        <path
            d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
            fill="currentColor"
        />
    </svg>
)
