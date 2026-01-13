"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Package, label: "Products", href: "/admin/products", active: false },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders", active: false },
  { icon: Users, label: "Customers", href: "/admin/customers", active: false },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics", active: false },
  { icon: Settings, label: "Settings", href: "/admin/settings", active: false },
]

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      className="hidden md:flex flex-col bg-[#0a0a0a] border-r border-white/5 h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <Link href="/">
            <Logo size="sm" />
          </Link>
        )}
        {collapsed && (
          <Link href="/">
            <Logo size="sm" showText={false} />
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="hover:bg-white/5">
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  item.active
                    ? "bg-gradient-to-r from-cyan/20 to-purple/20 text-cyan border border-cyan/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <Button
          variant="ghost"
          className={`w-full flex items-center gap-3 px-3 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl ${collapsed ? "justify-center" : "justify-start"}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </motion.aside>
  )
}
