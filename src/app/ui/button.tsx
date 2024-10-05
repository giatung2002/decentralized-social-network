import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ size = "md", variant = "solid", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring";
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg px-6 py-3",
  };
  const variantStyles = {
    solid: "bg-black text-white hover:bg-gray-800",
    outline: "border border-black text-black hover:bg-gray-100",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    />
  );
};