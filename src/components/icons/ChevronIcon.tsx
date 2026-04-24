import { ComponentPropsWithoutRef } from "react"

interface ChevronIconProps extends ComponentPropsWithoutRef<"svg"> {
    size?: number;
    direction?: "left" | "right" | "up" | "down";
}

export const ChevronIcon = ({ size = 18, className = "", direction = "right", ...props }: ChevronIconProps) => {
    const rotation = {
        left: "rotate-180",
        right: "rotate-0",
        up: "-rotate-90",
        down: "rotate-90",
    }[direction];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all duration-200 ${rotation} ${className}`}
            {...props}
        >
            <path
                d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                fill="currentColor"
            />
        </svg>
    )
}
