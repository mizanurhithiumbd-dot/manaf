"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react"
import Logo from "@/components/logo"

export function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <div className="glass py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="mb-4">
                <Logo size="md" />
              </div>
              <p className="text-white/60 text-sm mb-6">
                Quality First, Trust Always - Your reliable source for quality products.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyan/20 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple/20 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Smart Gear
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Daily Utilities
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Modern Living
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Flash Sales
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-cyan transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-4 text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                  <span>House 42, Road 11, Banani, Dhaka 1213</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span>+880 1700-000000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan flex-shrink-0" />
                  <span>hello@manafmart.com.bd</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <p>&copy; 2026 Manaf Mart. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
