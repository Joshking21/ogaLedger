import { Pressable, Text, GestureResponderEvent, View } from "react-native";
import React from "react";

// 1. Updated variants to match Shadcn's naming convention
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface StyledButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  textClassName?: string;
}

const StyledButton = ({
  title = "Click Me",
  onPress = () => {},
  variant = "default",
  size = "default",
  className = "",
  textClassName="",
}: StyledButtonProps) => {
  
  // Background & Border Variants
  const variants: Record<ButtonVariant, string> = {
    default: "bg-zinc-900 dark:bg-zinc-50 active:opacity-90",
    destructive: "bg-red-500 dark:bg-red-900 active:opacity-90",
    outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent active:bg-zinc-100 dark:active:bg-zinc-800",
    secondary: "bg-zinc-100 dark:bg-zinc-800 active:opacity-80",
    ghost: "bg-transparent active:bg-zinc-100 dark:active:bg-zinc-800",
    link: "bg-transparent",
  };

  // Text Color Variants
  const textVariants: Record<ButtonVariant, string> = {
    default: "text-zinc-50 dark:text-zinc-900",
    destructive: "text-zinc-50",
    outline: "text-zinc-900 dark:text-zinc-50",
    secondary: "text-zinc-900 dark:text-zinc-50",
    ghost: "text-zinc-900 dark:text-zinc-50",
    link: "text-zinc-900 dark:text-zinc-50 underline",
  };

  // Size logic (Shadcn uses different paddings for different sizes)
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-center rounded-md ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {({ pressed }) => (
        <Text
          className={`text-sm font-medium ${textVariants[variant]} ${textClassName} ${
            pressed && (variant === "link" || variant === "ghost") ? "opacity-50" : ""
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default StyledButton;