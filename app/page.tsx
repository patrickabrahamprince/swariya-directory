'use client'
import { useState } from 'react'
import Link from 'next/link'

const cities = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune']
const categories = ['Venues', 'Catering', 'Photography', 'Decoration', 'Entertainment']

const categoryIcons: Record<string, string> = {
  Venues: '🏛️',
  Catering: '🍽️',
  Photography: '📸',
  Decoration: '🌸',
  Entertainment: '🎵',
}

export default function Home() {
  const [city, setCity] = useState('Bangalore')
  const [category, setCategory] = useState('Venues')

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#faf9f7] border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-5">
              India's Trusted Wedding Directory
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-brand-black mb-6">
              Find Your Perfect<br />
              <span className="text-brand-gold">Wedding Vendors</span>
            </h1>
            <p className="text-lg text-brand-gray font-medium mb-10 leading-relaxed">
              Discover and book from 5,000+ verified vendors across India — venues, caterers, photographers and more.
            </p>

            {/* Search bar */}
            <div className="bg-white border border-brand-border rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-sm max-w-xl">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-4 py-3 bg-brand-light rounded-xl text-sm font-medium text-brand-black focus:outline-none"
              >
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-4 py-3 bg-brand-light rounded-xl text-sm font-medium text-brand-black focus:outline-none"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <Link
                href={`/vendors?city=${city.toLowerCase()}&category=${category.toLowerCase()}`}
                className="btn-primary px-8 whitespace-nowrap"
              >
                Search
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-brand-border bg-white">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap gap-10">
            {[
              { n: '5,000+', label: 'Verified Vendors' },
              { n: '25+', label: 'Cities' },
              { n: '50,000+', label: 'Happy Couples' },
              { n: '4.8 ⭐', label: 'Average Rating' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-brand-black">{s.n}</p>
                <p className="text-xs text-brand-gray font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-3">Browse by Category</p>
        <h2 className="text-3xl font-bold text-brand-black mb-10">Everything for Your Wedding</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/vendors?category=${cat.toLowerCase()}`}
              className="card-hover p-6 text-center group cursor-pointer"
            >
              <p className="text-3xl mb-3">{categoryIcons[cat]}</p>
              <p className="font-semibold text-brand-black group-hover:text-brand-gold transition-colors text-sm">{cat}</p>
              <p className="text-xs text-brand-gray mt-1">1,000+ vendors</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Vendors ── */}
      <section className="bg-[#faf9f7] border-y border-brand-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-3">Handpicked for You</p>
              <h2 className="text-3xl font-bold text-brand-black">Featured Vendors</h2>
            </div>
            <Link href="/vendors" className="btn-secondary text-sm py-2 px-5">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'The Grand Palace', cat: 'Venue', city: 'Bangalore', price: '₹3L – ₹10L', rating: 4.8, reviews: 245 },
              { name: 'Click Moments', cat: 'Photography', city: 'Bangalore', price: '₹25K – ₹5L', rating: 4.9, reviews: 320 },
              { name: 'Royal Catering Co.', cat: 'Catering', city: 'Mumbai', price: '₹500 – ₹5K/plate', rating: 4.6, reviews: 180 },
            ].map((v, i) => (
              <div key={i} className="card-hover overflow-hidden">
                <div className="h-52 bg-brand-light flex items-center justify-center text-brand-gray text-sm">
                  Photo
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-bold text-brand-black">{v.name}</p>
                      <p className="text-xs text-brand-gray mt-0.5">{v.cat} · {v.city}</p>
                    </div>
                    <span className="badge-gold">Featured</span>
                  </div>
                  <p className="text-xs text-brand-gray mt-3 mb-1">⭐ {v.rating} ({v.reviews} reviews)</p>
                  <p className="text-sm font-semibold text-brand-black mb-4">{v.price}</p>
                  <Link href={`/vendors/${i + 1}`} className="btn-secondary w-full text-sm py-2">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cities ── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-3">Explore Locally</p>
        <h2 className="text-3xl font-bold text-brand-black mb-10">Browse by City</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {cities.map(c => (
            <Link
              key={c}
              href={`/vendors?city=${c.toLowerCase()}`}
              className="card-hover p-6 text-center group cursor-pointer"
            >
              <p className="font-bold text-brand-black group-hover:text-brand-gold transition-colors">{c}</p>
              <p className="text-xs text-brand-gray mt-1">1,000+ vendors</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Vendor CTA ── */}
      <section className="bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Are you a wedding vendor?</h2>
            <p className="text-white/60 font-medium">Join 5,000+ businesses already listed on Swariya</p>
          </div>
          <Link
            href="/vendors/signup"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-black font-semibold rounded-full hover:bg-brand-light transition-colors whitespace-nowrap"
          >
            List Your Business Free
          </Link>
        </div>
      </section>
    </main>
  )
}
