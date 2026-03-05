'use client'
import { useState } from 'react'

export default function NavMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/" className="text-sm font-medium text-brand-gray hover:text-brand-black transition-colors">Home</a>
        <a href="/vendors" className="text-sm font-medium text-brand-gray hover:text-brand-black transition-colors">Find Vendors</a>
        <a href="/admin" className="text-sm font-medium text-brand-gray hover:text-brand-black transition-colors">Admin</a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-brand-black transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-brand-black transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-brand-black transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-brand-border shadow-lg z-40 px-6 py-4 flex flex-col gap-4">
          <a href="/" onClick={() => setOpen(false)} className="text-sm font-medium text-brand-black py-2 border-b border-brand-border">Home</a>
          <a href="/vendors" onClick={() => setOpen(false)} className="text-sm font-medium text-brand-black py-2 border-b border-brand-border">Find Vendors</a>
          <a href="/admin" onClick={() => setOpen(false)} className="text-sm font-medium text-brand-black py-2 border-b border-brand-border">Admin</a>
          <a href="/vendors/signup" onClick={() => setOpen(false)} className="btn-primary w-full text-center mt-2">
            List Your Business
          </a>
        </div>
      )}
    </>
  )
}
