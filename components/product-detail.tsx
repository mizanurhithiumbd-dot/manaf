"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Users, Play, Minus, Plus, Heart, Share2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { products } from "@/lib/mock-data"

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

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [compareMode, setCompareMode] = useState(false)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  // Get a competitor product for comparison
  const competitorProduct = products.find((p) => p.id !== product.id && p.category === product.category) || products[1]

  return (
    <>
      <section className="pt-28 md:pt-36 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Compare Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-end gap-3 mb-6"
          >
            <Label htmlFor="compare-mode" className="text-white/70">
              Compare Mode
            </Label>
            <Switch id="compare-mode" checked={compareMode} onCheckedChange={setCompareMode} />
          </motion.div>

          <div className={`grid gap-8 ${compareMode ? "lg:grid-cols-2" : "lg:grid-cols-2"}`}>
            {/* Main Product Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={compareMode ? "glass rounded-2xl p-6" : ""}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="relative">
                  <div className="glass rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-30">
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, #00f2ff 0%, transparent 70%)" }}
                      />
                    </div>

                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="relative z-10 w-full h-full object-contain"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-sm font-semibold ${
                          product.badge === "Flash Sale"
                            ? "bg-red-500 text-white animate-pulse-glow"
                            : product.badge === "Bestseller"
                              ? "bg-gold text-black"
                              : "bg-cyan text-black"
                        }`}
                      >
                        {product.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <p className="text-sm text-cyan uppercase tracking-wider mb-2">{product.category}</p>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-cyan">৳ {product.price.toLocaleString()}</span>
                    <span className="text-lg text-white/40 line-through">
                      ৳ {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-pink/20 text-pink text-sm font-medium">
                      Save {discount}%
                    </span>
                  </div>

                  {/* NFT Warranty Badge */}
                  <div className="glass rounded-xl p-4 flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">NFT Warranty Included</p>
                      <p className="text-sm text-white/60">Blockchain-verified 2-year warranty</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-white/70">Quantity:</span>
                    <div className="flex items-center gap-3 glass rounded-full px-2 py-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-full hover:bg-white/10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded-full hover:bg-white/10"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-white/50">{product.stock} in stock</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-cyan to-purple hover:from-cyan/80 hover:to-purple/80 rounded-xl">
                      Add to Cart - ৳ {(product.price * quantity).toLocaleString()}
                    </Button>

                    {/* Social Buy Button */}
                    <Button
                      variant="outline"
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 hover:border-green-500 text-green-400 hover:text-green-300 rounded-xl group"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Buy with a Friend - Save ৳500
                    </Button>

                    {/* Secondary Actions */}
                    <div className="flex gap-3">
                      <Button variant="ghost" className="flex-1 glass rounded-xl hover:bg-white/10">
                        <Heart className="w-5 h-5 mr-2" />
                        Wishlist
                      </Button>
                      <Button variant="ghost" className="flex-1 glass rounded-xl hover:bg-white/10">
                        <Share2 className="w-5 h-5 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comparison Product (shown when compare mode is active) */}
            {compareMode && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6 border-2 border-purple/30"
              >
                <div className="text-center mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple/20 text-purple text-sm font-medium">
                    Comparing With
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Competitor Image */}
                  <div className="relative">
                    <div className="bg-white/5 rounded-2xl p-8 aspect-square flex items-center justify-center">
                      <Image
                        src={competitorProduct.image || "/placeholder.svg"}
                        alt={competitorProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain opacity-80"
                      />
                    </div>
                  </div>

                  {/* Competitor Info */}
                  <div className="flex flex-col">
                    <p className="text-sm text-purple uppercase tracking-wider mb-2">{competitorProduct.category}</p>
                    <h2 className="text-2xl font-bold text-white/80 mb-4">{competitorProduct.name}</h2>

                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold text-purple">
                        ৳ {competitorProduct.price.toLocaleString()}
                      </span>
                      <span className="text-white/40 line-through">
                        ৳ {competitorProduct.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Comparison Stats */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Price Difference</span>
                        <span className={product.price < competitorProduct.price ? "text-green-400" : "text-red-400"}>
                          {product.price < competitorProduct.price
                            ? `You save ৳${(competitorProduct.price - product.price).toLocaleString()}`
                            : `৳${(product.price - competitorProduct.price).toLocaleString()} more`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Stock</span>
                        <span className="text-white">{competitorProduct.stock} available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Rare Tube Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-cyan-purple mb-8 text-center">
              Rare Tube - Product Showcase
            </h2>

            <div className="relative max-w-4xl mx-auto">
              {/* Cinema screen styling */}
              <div className="absolute inset-0 -m-4 bg-gradient-to-b from-white/5 to-transparent rounded-t-3xl" />
              <div className="relative glass rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-[#0a0a0a] to-[#111] flex items-center justify-center relative">
                  {/* Fake video thumbnail */}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-30"
                  />

                  {/* Play button */}
                  <button className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                    <div className="absolute inset-0 rounded-full bg-cyan/30 animate-ping" />
                  </button>

                  {/* Video info */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{product.name} - Full Review</p>
                      <p className="text-white/60 text-sm">12:34 • 24K views</p>
                    </div>
                    <Button variant="ghost" className="glass rounded-full px-4">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      45 Comments
                    </Button>
                  </div>
                </div>
              </div>
              {/* Cinema base */}
              <div className="h-4 bg-gradient-to-b from-white/5 to-transparent rounded-b-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton product={product} />
    </>
  )
}
