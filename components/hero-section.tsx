"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const typewriterWords = ["ADVENTURE", "WORKFLOW", "VICTORY"]

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseDelay = 2000

    if (!isDeleting && displayText === currentWord) {
      setTimeout(() => setIsDeleting(true), pauseDelay)
      return
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? currentWord.substring(0, prev.length - 1) : currentWord.substring(0, prev.length + 1),
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-32 md:pt-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-white">GEAR FOR YOUR</span>
                <br />
                <span className="text-white">NEXT </span>
                <span className="gradient-text inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[340px]">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/60 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Quality First, Trust Always - Your trusted partner for quality products and reliable service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan via-purple to-pink hover:shadow-lg hover:shadow-cyan/30 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  Shop the Future
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </div>

          {/* Hero Product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow effect behind product */}
              <div
                className="absolute inset-0 opacity-60 blur-3xl"
                style={{
                  background: "radial-gradient(circle, #00f2ff 0%, #8b5cf6 50%, transparent 70%)",
                }}
              />

              {/* Floating product */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <Image
                  src="/futuristic-smartwatch-with-holographic-display.jpg"
                  alt="Ultima Pro Smartwatch - Hero Product"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
