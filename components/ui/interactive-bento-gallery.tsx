"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface MediaItemType {
    id: number
    type: string
    title: string
    desc: string
    url: string
    span: string
    href?: string
}

const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    return (
        <Image
            src={item.url}
            alt={item.title}
            fill
            className={`${className} object-cover`}
            onClick={onClick}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
    )
}

interface GalleryModalProps {
    selectedItem: MediaItemType
    isOpen: boolean
    onClose: () => void
    setSelectedItem: (item: MediaItemType | null) => void
    mediaItems: MediaItemType[]
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 })

    if (!isOpen) return null

    return (
        <>
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed inset-0 w-full min-h-screen backdrop-blur-lg rounded-none overflow-hidden z-10"
            >
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-50/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl h-auto max-h-[70vh] rounded-xl overflow-hidden shadow-md"
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{ y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } }}
                                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                            >
                                <Image src={selectedItem.url} alt={selectedItem.title} fill className="object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-t from-black/60 to-transparent">
                                    <h3 className="text-white text-lg md:text-xl font-bold">{selectedItem.title}</h3>
                                    <p className="text-white/80 text-sm mt-1">{selectedItem.desc}</p>
                                    {selectedItem.href && (
                                        <Link href={selectedItem.href} className="inline-block mt-3 px-4 py-2 bg-orci-cyan text-white rounded-lg text-sm font-medium hover:bg-orci-blue transition-colors">
                                            קרא את המדריך ←
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.button
                    className="absolute top-3 right-3 p-2 rounded-full bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 backdrop-blur-sm"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-4 h-4" />
                </motion.button>
            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))
                }}
                className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2 touch-none"
            >
                <motion.div className="relative rounded-xl bg-orci-cyan/20 backdrop-blur-xl border border-orci-cyan/30 shadow-lg cursor-grab active:cursor-grabbing">
                    <div className="flex items-center -space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item) }}
                                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                                className={`relative group w-9 h-9 md:w-10 md:h-10 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id ? 'ring-2 ring-orci-cyan shadow-lg' : 'hover:ring-2 hover:ring-orci-cyan/30'}`}
                                initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{ scale: 1.3, rotate: 0, y: -10, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                            >
                                <div className="relative w-full h-full">
                                    <Image src={item.url} alt={item.title} fill className="object-cover" sizes="40px" />
                                </div>
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-orci-cyan/20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null)
    const [items, setItems] = useState(mediaItems)
    const [isDragging, setIsDragging] = useState(false)

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="mb-8 text-center">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="mt-2 text-base text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>

            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[80px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0, scale: 1, opacity: 1,
                                        transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(_, info) => {
                                    setIsDragging(false)
                                    const moveDistance = info.offset.x + info.offset.y
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items]
                                        const draggedItem = newItems[index]
                                        const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0)
                                        newItems.splice(index, 1)
                                        newItems.splice(targetIndex, 0, draggedItem)
                                        setItems(newItems)
                                    }
                                }}
                            >
                                <MediaItem item={item} className="absolute inset-0 w-full h-full" onClick={() => !isDragging && setSelectedItem(item)} />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-3 md:p-4"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                    <h3 className="relative text-white text-sm md:text-base font-bold line-clamp-1">{item.title}</h3>
                                    <p className="relative text-white/80 text-xs md:text-sm mt-0.5 line-clamp-2">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default InteractiveBentoGallery
