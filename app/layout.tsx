import type { Metadata } from 'next'
import './globals.css'
import NavMenu from '@/components/NavMenu'

export const metadata: Metadata = {
  title: 'Swariya - Wedding Vendor Directory',
  description: 'Find and book the best wedding vendors in your city',
  keywords: 'wedding vendors, wedding planning, venues, caterers, photographers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* ── Header ── */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-border">
          <nav className="relative max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-brand-black">Swariya</span>
              <span className="text-xs font-medium text-brand-gray tracking-widest uppercase hidden sm:inline">Weddings</span>
            </a>

            <NavMenu />

            {/* CTA — desktop only, mobile is inside NavMenu drawer */}
            <a href="/vendors/signup" className="hidden md:inline-flex btn-primary text-sm py-2 px-5">
              List Your Business
            </a>
          </nav>
        </header>

        {/* Push content below fixed header */}
        <div className="pt-[70px]">
          {children}
        </div>

        {/* ── Footer ── */}
        <footer className="border-t border-brand-border mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <p className="text-lg font-bold text-brand-black mb-1">Swariya Weddings</p>
                <p className="text-sm text-brand-gray">India's trusted wedding vendor directory</p>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-3">Explore</p>
                  <div className="flex flex-col gap-2">
                    <a href="/vendors" className="text-sm text-brand-gray hover:text-brand-black transition-colors">Find Vendors</a>
                    <a href="/vendors/signup" className="text-sm text-brand-gray hover:text-brand-black transition-colors">List Your Business</a>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-3">Cities</p>
                  <div className="flex flex-col gap-2">
                    <a href="/vendors?city=bangalore" className="text-sm text-brand-gray hover:text-brand-black transition-colors">Bangalore</a>
                    <a href="/vendors?city=mumbai" className="text-sm text-brand-gray hover:text-brand-black transition-colors">Mumbai</a>
                    <a href="/vendors?city=delhi" className="text-sm text-brand-gray hover:text-brand-black transition-colors">Delhi</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-brand-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-brand-gray">&copy; 2025 Swariya Wedding Directory. All rights reserved.</p>
              <p className="text-xs text-brand-gray">Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
