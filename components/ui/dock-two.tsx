"use client";

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface DockProps {
  className?: string
  items: {
    icon: LucideIcon
    label: string
    onClick?: () => void
    href?: string
    isActive?: boolean
  }[]
}

interface DockIconButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  href?: string
  isActive?: boolean
  className?: string
}

const floatingTransition = {
  duration: 4,
  repeat: Infinity,
  ease: "easeInOut" as const,
}

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, href, isActive, className }, ref) => {
    const content = (
      <>
        <Icon className={cn(
          "w-5 h-5 transition-colors",
          isActive ? "text-orci-cyan" : "text-slate-300"
        )} />
        <span className={cn(
          "absolute -top-9 left-1/2 -translate-x-1/2",
          "px-2.5 py-1 rounded-lg text-xs font-medium",
          "bg-gray-800 text-white shadow-lg",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity whitespace-nowrap pointer-events-none"
        )}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="dock-active"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orci-cyan"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </>
    )

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "relative group p-3 rounded-xl",
            "hover:bg-orci-cyan/10 transition-colors",
            isActive && "bg-orci-cyan/10",
            className
          )}
        >
          {content}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative group p-3 rounded-xl",
          "hover:bg-orci-cyan/10 transition-colors",
          isActive && "bg-orci-cyan/10",
          className
        )}
      >
        {content}
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center justify-center", className)}>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-1, 1, -1] }}
          transition={floatingTransition}
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-2xl",
            "backdrop-blur-xl border shadow-lg",
            "bg-white/85 border-gray-200/80",
            "hover:shadow-xl hover:shadow-orci-cyan/5 transition-shadow duration-300"
          )}
        >
          {items.map((item) => (
            <DockIconButton key={item.label} {...item} />
          ))}
        </motion.div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }
