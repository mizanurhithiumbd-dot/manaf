"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { categories } from "@/lib/mock-data"

export function ProductCategories() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-cyan-purple mb-4">Explore Categories</h2>
          <p className="text-white/60 text-lg">Discover the perfect gear for every aspect of your life</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}>
                <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      background: `linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.5) 50%, transparent 100%)`,
                    }}
                  />

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{ backgroundColor: category.color }}
                  />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300"
                      style={{ color: category.color }}
                    >
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">{category.description}</p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span style={{ color: category.color }}>Explore Collection</span>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
