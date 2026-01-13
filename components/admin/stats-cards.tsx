"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, CheckCircle, Package } from "lucide-react"

const stats = [
  {
    label: "Total Revenue",
    value: "৳ 2,45,890",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "cyan",
  },
  {
    label: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "purple",
  },
  {
    label: "COD Confirmation Rate",
    value: "87.5%",
    change: "-2.1%",
    trend: "down",
    icon: CheckCircle,
    color: "pink",
  },
  {
    label: "Products in Stock",
    value: "456",
    change: "+5 new",
    trend: "up",
    icon: Package,
    color: "gold",
  },
]

export function StatsCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                stat.color === "cyan"
                  ? "bg-cyan/10 text-cyan"
                  : stat.color === "purple"
                    ? "bg-purple/10 text-purple"
                    : stat.color === "pink"
                      ? "bg-pink/10 text-pink"
                      : "bg-gold/10 text-gold"
              }`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
            >
              {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {stat.change}
            </div>
          </div>

          <p className="text-white/60 text-sm mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-white">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
