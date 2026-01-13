"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, ShoppingCart, User, Home, MessageSquare, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
      >
        <div className="mx-4 mt-4">
          <div className="glass rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between gap-6">
              <Link href="/" className="flex-shrink-0">
                <Logo size="md" />
              </Link>

              {/* Agentic AI Search */}
              <div className="flex-1 max-w-xl">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-white/50" />
                    <Input
                      type="text"
                      placeholder="Ask AI for the best bass headphones..."
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-cyan/50 focus:ring-cyan/20"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                {/* Nest Eggs Counter */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <span className="text-lg">🥚</span>
                  <span className="font-semibold text-gold">1,250</span>
                </div>

                {/* User Avatar */}
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                  <User className="w-5 h-5" />
                </Button>

                {/* Cart */}
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-white/10">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="glass mx-4 mt-4 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo size="sm" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pb-2"
            >
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Ask AI..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border-white/10 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
                <span className="text-lg">🥚</span>
                <span className="font-semibold text-gold">1,250</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass mx-4 mb-4 rounded-2xl">
          <div className="flex items-center justify-around py-3">
            <Link href="/" className="flex flex-col items-center gap-1 text-cyan hover:text-cyan transition-colors">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">AI Chat</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 right-2 w-4 h-4 bg-pink text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
              <span className="text-xs">Cart</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
