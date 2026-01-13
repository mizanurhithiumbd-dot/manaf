"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: { container: "h-8", image: 40 },
    md: { container: "h-10", image: 50 },
    lg: { container: "h-14", image: 70 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 ${className}`}
    >
      <div className={`relative ${sizeClasses[size].container} aspect-square`}>
        <Image
          src="/final_logo.jpeg"
          alt="Manaf Mart Logo"
          width={sizeClasses[size].image}
          height={sizeClasses[size].image}
          className="w-full h-full object-contain rounded-lg"
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">
            MANAF MART
          </span>
          <span className="text-xs text-white/60 -mt-1">Quality First, Trust Always</span>
        </div>
      )}
    </motion.div>
  )
}

export { Logo }
