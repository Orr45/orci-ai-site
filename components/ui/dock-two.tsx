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

const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, href, isActive, className }, ref) => {
    const content = (
      <>
        <Icon
          className="w-5 h-5 transition-colors"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
        />
        <span
          className="text-[10px] font-medium mt-0.5 transition-colors"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="dock-active"
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </>
    )

    const sharedClass = cn(
      "relative group flex flex-col items-center gap-0.5 px-3 pt-2.5 pb-2 rounded-xl min-w-[52px] transition-colors",
      className
    )
    const sharedStyle: React.CSSProperties = {
      background: isActive ? 'var(--accent-soft)' : 'transparent',
    }

    if (href) {
      return (
        <motion.a
          href={href}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className={sharedClass}
          style={sharedStyle}
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
        className={sharedClass}
        style={sharedStyle}
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
        <div
          className="flex items-center gap-0.5 px-2 py-1 rounded-2xl backdrop-blur-xl transition-all duration-300"
          style={{
            background: 'color-mix(in srgb, var(--surface) 92%, transparent)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card-hover)',
          }}
        >
          {items.map((item) => (
            <DockIconButton key={item.label} {...item} />
          ))}
        </div>
      </div>
    )
  }
)
Dock.displayName = "Dock"

export { Dock }
