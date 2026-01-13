"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Eye, Truck, XCircle, Mail, MailCheck, MailX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { recentOrders } from "@/lib/mock-data"
import Link from "next/link"

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Delivered: "bg-cyan/20 text-cyan border-cyan/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function RecentOrdersTable() {
  const [orders, setOrders] = useState(recentOrders)
  const { toast } = useToast()

  const handleSendInvoice = async (orderId: string, email: string) => {
    try {
      const response = await fetch("/api/emails/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, invoiceEmailed: true } : o)))
        toast({
          title: "Invoice Sent!",
          description: `Invoice sent to ${email}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invoice",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden"
    >
      <div className="p-5 border-b border-white/5">
        <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
        <p className="text-sm text-white/50">Latest orders from your store</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Order ID</th>
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Customer</th>
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Amount</th>
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Status</th>
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Invoice</th>
              <th className="text-left px-5 py-4 text-sm font-medium text-white/60">Date</th>
              <th className="text-right px-5 py-4 text-sm font-medium text-white/60">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-4">
                  <Link href={`/admin/order/${encodeURIComponent(order.id)}`}>
                    <span className="text-cyan font-mono text-sm hover:underline cursor-pointer">{order.id}</span>
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white">{order.customer}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white font-medium">৳ {order.amount.toLocaleString()}</span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.invoiceEmailed ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {order.invoiceEmailed ? (
                      <>
                        <MailCheck className="w-3 h-3" />
                        Sent
                      </>
                    ) : (
                      <>
                        <MailX className="w-3 h-3" />
                        Not Sent
                      </>
                    )}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-white/60 text-sm">{order.date}</span>
                </td>
                <td className="px-5 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-white/5">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin/order/${encodeURIComponent(order.id)}`}
                          className="text-white/80 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/invoice/${encodeURIComponent(order.id)}`}
                          className="text-white/80 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Invoice
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSendInvoice(order.id, order.email)}
                        className="text-purple hover:text-purple/80 focus:text-purple focus:bg-purple/10"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {order.invoiceEmailed ? "Resend Invoice" : "Send Invoice"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white/80 hover:text-white focus:text-white focus:bg-white/5">
                        <Truck className="w-4 h-4 mr-2" />
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/5">
        <Button variant="ghost" className="text-cyan hover:text-cyan/80 hover:bg-cyan/10">
          View All Orders
        </Button>
      </div>
    </motion.div>
  )
}
