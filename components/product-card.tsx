"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  badge: string | null
  stock: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="relative glass rounded-2xl overflow-hidden rainbow-border">
        {/* Inner container for the actual card */}
        <div className="relative bg-[#050505] rounded-2xl overflow-hidden">
          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold ${
                product.badge === "Flash Sale"
                  ? "bg-red-500/90 text-white animate-pulse-glow"
                  : product.badge === "Bestseller"
                    ? "bg-gold/90 text-black"
                    : "bg-cyan/90 text-black"
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Stock indicator */}
          {product.stock <= 5 && (
            <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-full bg-pink/20 text-pink text-xs font-medium border border-pink/30">
              Only {product.stock} left
            </div>
          )}

          {/* Image Container */}
          <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={250}
              height={250}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />

            {/* Quick actions overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
              <Link href={`/product/${product.id}`}>
                <Button
                  size="icon"
                  className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20"
                >
                  <Eye className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="icon" className="rounded-full bg-cyan hover:bg-cyan/80 text-black border-0">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">{product.category}</p>
            <h3 className="text-lg font-semibold text-white mb-3 line-clamp-1">{product.name}</h3>

            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-cyan">৳ {product.price.toLocaleString()}</span>
              <span className="text-sm text-white/40 line-through">৳ {product.originalPrice.toLocaleString()}</span>
              <span className="text-xs font-medium text-pink">-{discount}%</span>
            </div>

            {/* Quick Add Button - appears on hover */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Button className="w-full bg-gradient-to-r from-cyan to-purple hover:from-cyan/80 hover:to-purple/80 text-white font-semibold rounded-xl">
                Quick Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
