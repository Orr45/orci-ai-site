"use client"
import React from 'react'
import { motion } from 'framer-motion'
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

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
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

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[80px]"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
            >
                {mediaItems.map((item, index) => {
                    const content = (
                        <motion.div
                            key={item.id}
                            className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
                            variants={{
                                hidden: { y: 50, scale: 0.9, opacity: 0 },
                                visible: {
                                    y: 0, scale: 1, opacity: 1,
                                    transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 }
                                }
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <Image
                                src={item.url}
                                alt={item.title}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
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
                    )

                    if (item.href) {
                        return <Link key={item.id} href={item.href} className={item.span}>{content}</Link>
                    }
                    return content
                })}
            </motion.div>
        </div>
    )
}

export default InteractiveBentoGallery
