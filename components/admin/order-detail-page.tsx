"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  MailCheck,
  MailX,
  FileText,
  Truck,
  Phone,
  MapPin,
  RefreshCw,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Order } from "@/lib/mock-data"

interface OrderDetailPageProps {
  order: Order
}

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Delivered: "bg-cyan/20 text-cyan border-cyan/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
}

export function OrderDetailPage({ order }: OrderDetailPageProps) {
  const [invoiceEmailed, setInvoiceEmailed] = useState(order.invoiceEmailed)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleResendInvoice = async () => {
    setIsSending(true)
    try {
      const response = await fetch("/api/emails/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, resend: true }),
      })

      const data = await response.json()

      if (data.success) {
        setInvoiceEmailed(true)
        toast({
          title: "Invoice Sent!",
          description: `Invoice sent to ${data.customerEmail}`,
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send invoice",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invoice email",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Order {order.id}</h1>
              <p className="text-white/60 text-sm">Order details and invoice management</p>
            </div>
          </div>

          <Link href={`/invoice/${encodeURIComponent(order.id)}`}>
            <Button className="bg-cyan text-black hover:bg-cyan/90 font-semibold">
              <FileText className="w-4 h-4 mr-2" />
              View Invoice
            </Button>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Order Info - 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl p-6"
          >
            {/* Status and Email Badge Row */}
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium border ${statusColors[order.status]}`}
              >
                {order.status}
              </span>

              {/* Invoice Email Status Badge */}
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border ${
                  invoiceEmailed
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                }`}
              >
                {invoiceEmailed ? (
                  <>
                    <MailCheck className="w-4 h-4" />
                    Invoice Emailed: Yes
                  </>
                ) : (
                  <>
                    <MailX className="w-4 h-4" />
                    Invoice Emailed: No
                  </>
                )}
              </span>
            </div>

            {/* Customer Info */}
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-2">Customer</h3>
                <p className="text-white font-semibold text-lg">{order.customer}</p>
                <div className="flex items-center gap-2 text-white/60 mt-1">
                  <Mail className="w-4 h-4" />
                  {order.email}
                </div>
                <div className="flex items-center gap-2 text-white/60 mt-1">
                  <Phone className="w-4 h-4" />
                  {order.phone}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-2">Delivery Address</h3>
                <div className="flex items-start gap-2 text-white/80">
                  <MapPin className="w-4 h-4 mt-1 shrink-0" />
                  {order.address}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-white/5 pt-6">
              <h3 className="text-sm font-medium text-white/50 mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/[0.02] rounded-xl p-4">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-white/50 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">৳ {item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <span className="text-white/60">Total</span>
                <span className="text-2xl font-bold text-white">৳ {order.amount.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Actions Panel - 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-fit"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>

            <div className="space-y-3">
              {/* Resend Invoice Button */}
              <Button
                onClick={handleResendInvoice}
                disabled={isSending}
                className="w-full bg-purple/20 text-purple hover:bg-purple/30 border border-purple/30"
              >
                {isSending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {invoiceEmailed ? "Resend Invoice Email" : "Send Invoice Email"}
                  </>
                )}
              </Button>

              {/* Update Status Button */}
              <Button
                variant="outline"
                className="w-full border-white/10 text-white/70 hover:text-white hover:bg-white/5 bg-transparent"
              >
                <Truck className="w-4 h-4 mr-2" />
                Update Status
              </Button>

              {/* Mark as Delivered */}
              {order.status !== "Delivered" && (
                <Button
                  variant="outline"
                  className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}
            </div>

            {/* Order Meta */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/50">Order Date</span>
                <span className="text-white">{order.date}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Payment</span>
                <span className="text-cyan">COD</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
