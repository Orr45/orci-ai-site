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
          style={{ color: isActive ? 'var(--olive)' : 'var(--text-secondary)' }}
        />
        <span
          className="text-[11px] font-bold mt-0.5 transition-colors"
          style={{ color: isActive ? 'var(--olive)' : 'var(--text-secondary)' }}
        >
          {label}
        </span>
      </>
    )

    const sharedClass = cn(
      "relative group flex flex-col items-center gap-0.5 px-3 pt-2.5 pb-2 rounded-2xl min-w-[58px] transition-colors",
      className
    )
    // Active tab is a cyan sticker; ink on cyan keeps 7.9:1 contrast in both themes
    const sharedStyle: React.CSSProperties = {
      background: isActive ? 'var(--cyan)' : 'transparent',
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
          className="flex items-center gap-1 px-1.5 py-1.5 rounded-[22px] transition-all duration-300"
          style={{
            background: 'var(--surface)',
            border: '2px solid var(--pill-edge)',
            boxShadow: '4px 4px 0 var(--pill-edge)',
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
