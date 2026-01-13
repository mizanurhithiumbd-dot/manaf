"use client"

import { motion } from "framer-motion"
import { liveTicker } from "@/lib/mock-data"

export function LiveTicker() {
  // Duplicate the ticker items for seamless loop
  const tickerItems = [...liveTicker, ...liveTicker, ...liveTicker]

  return (
    <div className="relative overflow-hidden py-4 glass border-t border-b border-white/5">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-white/70">
            <span className="text-lg">{index % 2 === 0 ? "🚀" : "🔥"}</span>
            <span>
              <span className="text-cyan font-medium">{item.user}</span> in{" "}
              <span className="text-purple">{item.location}</span> just bought{" "}
              <span className="text-white font-medium">{item.product}</span>
            </span>
            <span className="text-white/30">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
