"use client"

import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { motion } from "framer-motion"
import { Printer, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Order } from "@/lib/mock-data"

interface InvoicePageProps {
  order: Order
}

export function InvoicePage({ order }: InvoicePageProps) {
  const invoiceRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${order.id}`,
  })

  return (
    <div className="min-h-screen bg-[#050505] py-8 px-4">
      {/* Action Buttons */}
      <div className="max-w-[210mm] mx-auto mb-6 flex items-center justify-between">
        <Link href="/admin">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
          <Button onClick={() => handlePrint()} className="bg-cyan text-black hover:bg-cyan/90 font-semibold">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
          <Button
            onClick={() => handlePrint()}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </motion.div>
      </div>

      {/* A4 Invoice - Printer Friendly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-[210mm] mx-auto"
      >
        <div
          ref={invoiceRef}
          className="bg-white text-black p-8 md:p-12 shadow-2xl print:shadow-none"
          style={{ minHeight: "297mm" }}
        >
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">MANAF MART</h1>
              <p className="text-gray-600 mt-1">Quality First, Trust Always</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold">Badda, Dhaka</p>
              <p className="text-gray-600">+8809696079373</p>
              <p className="text-gray-600">www.manafmart.com.bd</p>
            </div>
          </div>

          {/* Invoice Title & Number */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">INVOICE</h2>
              <p className="text-gray-600">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Invoice Date</p>
              <p className="font-semibold">{order.date}</p>
            </div>
          </div>

          {/* Bill To Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Bill To</h3>
              <p className="font-semibold text-lg">{order.customer}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">{order.phone}</p>
              <p className="text-gray-600">{order.email}</p>
            </div>
            <div className="md:text-right">
              <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Order Status</h3>
              <span
                className={`inline-flex px-4 py-1.5 rounded-full text-sm font-semibold ${
                  order.status === "Confirmed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-10">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="text-left py-3 font-bold">Item</th>
                  <th className="text-center py-3 font-bold">Qty</th>
                  <th className="text-right py-3 font-bold">Price</th>
                  <th className="text-right py-3 font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4">{item.name}</td>
                    <td className="py-4 text-center">{item.quantity}</td>
                    <td className="py-4 text-right">৳ {item.price.toLocaleString()}</td>
                    <td className="py-4 text-right font-semibold">৳ {(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-10">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span>৳ {order.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span>৳ 0</span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-black font-bold text-lg">
                <span>Total</span>
                <span>৳ {order.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 pt-6 mt-auto">
            <div className="text-center text-sm text-gray-600">
              <p className="font-semibold text-black mb-2">Thank you for shopping with Manaf Mart!</p>
              <p>For any queries, contact us at +8809696079373</p>
              <p className="mt-4 text-xs">This is a computer-generated invoice and does not require a signature.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
