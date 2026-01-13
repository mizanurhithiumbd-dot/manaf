"use client"

import { Bell, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AdminHeader() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0a0a] px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/5">
        <Menu className="w-5 h-5" />
      </Button>

      {/* Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            type="text"
            placeholder="Search orders, products..."
            className="pl-10 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-white/40"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan rounded-full" />
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-white/10">
            <AvatarImage src="/admin-avatar-professional.jpg" />
            <AvatarFallback className="bg-gradient-to-br from-cyan to-purple text-black text-sm font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-white/50">admin@manafmart.com.bd</p>
          </div>
        </div>
      </div>
    </header>
  )
}
