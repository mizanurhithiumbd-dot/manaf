"use client"

import { motion } from "framer-motion"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { StatsCards } from "@/components/admin/stats-cards"
import { RecentOrdersTable } from "@/components/admin/recent-orders-table"
import { StockLevels } from "@/components/admin/stock-levels"

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/60 mb-8">Welcome back. Here's what's happening with your store.</p>
          </motion.div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Recent Orders - Takes 2 columns */}
            <div className="lg:col-span-2">
              <RecentOrdersTable />
            </div>

            {/* Stock Levels - Takes 1 column */}
            <div>
              <StockLevels />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
