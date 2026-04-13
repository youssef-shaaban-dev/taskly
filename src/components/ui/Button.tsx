import { ReactNode, ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const Button = ({ 
  variant = "primary", 
  children, 
  className = "", 
  ...props 
}: ButtonProps) => {

  const baseStyles = "px-[24px] py-[10px] min-w-[148px] rounded-[2px] text-label-sm font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-center";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-linear-to-b from-[#003D98] to-[#0052CC] text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:opacity-95",
    secondary: "bg-surface-low text-primary hover:bg-surface-highest",
    ghost: "bg-transparent text-slate-500 hover:bg-surface-low hover:text-slate-900"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props} 
    >
      {children}
    </button>
  );
};

export default Button;