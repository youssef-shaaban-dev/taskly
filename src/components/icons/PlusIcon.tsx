import { ComponentPropsWithoutRef } from "react"

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: number;
}

export const PlusIcon = ({ size = 18, className = "", ...props }: IconProps) => (
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
            d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            fill="currentColor"
        />
    </svg>
)
