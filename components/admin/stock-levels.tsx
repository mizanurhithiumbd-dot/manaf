"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { products } from "@/lib/mock-data"

export function StockLevels() {
  // Sort products by stock (lowest first)
  const sortedProducts = [...products].sort((a, b) => a.stock - b.stock)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden h-full"
    >
      <div className="p-5 border-b border-white/5">
        <h2 className="text-lg font-semibold text-white">Stock Levels</h2>
        <p className="text-sm text-white/50">Products running low on inventory</p>
      </div>

      <div className="p-5 space-y-4">
        {sortedProducts.map((product, index) => {
          const stockPercentage = Math.min((product.stock / 30) * 100, 100)
          const isLow = product.stock <= 5

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium truncate max-w-[150px]">{product.name}</span>
                <div className="flex items-center gap-2">
                  {isLow && <AlertTriangle className="w-4 h-4 text-gold" />}
                  <span className={`text-sm font-medium ${isLow ? "text-gold" : "text-white/60"}`}>
                    {product.stock} units
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercentage}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
                  className={`h-full rounded-full ${
                    isLow
                      ? "bg-gradient-to-r from-red-500 to-gold"
                      : stockPercentage < 50
                        ? "bg-gradient-to-r from-gold to-cyan"
                        : "bg-gradient-to-r from-cyan to-purple"
                  }`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
