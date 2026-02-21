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
          isActive ? "text-orci-cyan" : "text-slate-400"
        )} />
        <span className={cn(
          "text-[10px] font-medium mt-0.5 transition-colors",
          isActive ? "text-orci-cyan" : "text-slate-500"
        )}>
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="dock-active"
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-orci-cyan"
            style={{ boxShadow: '0 0 8px rgba(0,209,255,0.6)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </>
    )

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={cn(
            "relative group flex flex-col items-center gap-0.5 px-3 pt-2.5 pb-2 rounded-xl min-w-[52px]",
            "hover:bg-orci-cyan/8 transition-colors",
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
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={cn(
          "relative group flex flex-col items-center gap-0.5 px-3 pt-2.5 pb-2 rounded-xl min-w-[52px]",
          "hover:bg-orci-cyan/8 transition-colors",
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
            "flex items-center gap-0.5 px-2 py-1 rounded-2xl",
            "backdrop-blur-xl border shadow-2xl",
            "border-orci-cyan/20",
            "hover:border-orci-cyan/35 transition-all duration-300"
          )}
          style={{
            background: 'rgba(5,13,26,0.92)',
            boxShadow: '0 0 30px rgba(0,209,255,0.08), 0 8px 32px rgba(0,0,0,0.6)',
          }}
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
