'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { getVendors, type Vendor } from '@/lib/supabase'

const cities = [
  'bangalore', 'mumbai', 'delhi', 'hyderabad', 'pune',
  'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'chandigarh',
  'goa', 'kochi', 'lucknow', 'bhopal', 'indore',
  'nagpur', 'surat', 'vadodara', 'coimbatore', 'visakhapatnam',
  'agra', 'amritsar', 'jodhpur', 'udaipur', 'mysore',
]
const categories = ['venues', 'catering', 'photography', 'decoration', 'entertainment']

function vendorImage(id: string, index = 0) {
  return `https://picsum.photos/seed/${id}-${index}/400/300`
}

function useSaved() {
  const [saved, setSaved] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set()
    try { return new Set(JSON.parse(localStorage.getItem('swariya_saved') || '[]')) } catch { return new Set() }
  })
  const toggle = (id: string) => {
    setSaved(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('swariya_saved', JSON.stringify([...next]))
      return next
    })
  }
  return { saved, toggle }
}

function VendorListing() {
  const searchParams = useSearchParams()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [total, setTotal] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const { saved, toggle } = useSaved()
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || 'bangalore',
    category: searchParams.get('category') || 'venues',
    minRating: 0,
    search: '',
  })

  const totalPages = Math.ceil(total / pageSize)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    async function fetchVendors() {
      setLoading(true)
      setError(null)
      try {
        const result = await getVendors({ ...filters, page })
        setVendors(result.vendors)
        setTotal(result.total)
        setPageSize(result.pageSize)
      } catch (err) {
        setError('Failed to load vendors.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVendors()
  }, [filters, page])

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  const handleSearch = () => {
    setPage(1)
    setFilters(f => ({ ...f, search: searchInput.trim() }))
  }

  const goToPage = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-black text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg">
          {toast}
        </div>
      )}

      {/* Page title */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-2">Directory</p>
        <h1 className="text-3xl font-bold text-brand-black mb-5">
          {cap(filters.category)} in {cap(filters.city)}
        </h1>

        {/* Search bar */}
        <div className="flex gap-2 max-w-xl">
          <input
            type="text"
            placeholder="Search by vendor name..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className="input flex-1"
          />
          <button onClick={handleSearch} className="btn-primary px-6">
            Search
          </button>
          {filters.search && (
            <button
              onClick={() => { setSearchInput(''); setFilters(f => ({ ...f, search: '' })) }}
              className="btn-secondary px-4"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        {/* ── Filters sidebar ── */}
        <aside className="col-span-1">
          <div className="card p-6 sticky top-24 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray">Filters</p>

            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">City / Location</label>
              <select
                value={filters.city}
                onChange={(e) => { setPage(1); setFilters({ ...filters, city: e.target.value }) }}
                className="input"
              >
                {cities.map(c => <option key={c} value={c}>{cap(c)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => { setPage(1); setFilters({ ...filters, category: e.target.value }) }}
                className="input"
              >
                {categories.map(c => <option key={c} value={c}>{cap(c)}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-black mb-2">
                Min Rating: {filters.minRating > 0 ? `${filters.minRating}+` : 'Any'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                className="w-full accent-brand-black"
              />
              <div className="flex justify-between text-xs text-brand-gray mt-1">
                <span>Any</span><span>5 ⭐</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSearchInput('')
                setPage(1)
                setFilters({ city: 'bangalore', category: 'venues', minRating: 0, search: '' })
              }}
              className="btn-secondary w-full text-sm"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* ── Vendor list ── */}
        <div className="col-span-3">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-32 h-28 skeleton flex-shrink-0" />
                    <div className="flex-1 space-y-3 py-1">
                      <div className="h-5 skeleton w-2/3" />
                      <div className="h-4 skeleton w-full" />
                      <div className="h-4 skeleton w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="card p-10 text-center">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : vendors.length === 0 ? (
            <div className="card p-14 text-center">
              <p className="text-2xl mb-3">🔍</p>
              <p className="font-semibold text-brand-black mb-1">No vendors found</p>
              <p className="text-sm text-brand-gray mb-6">Try adjusting your filters or be the first to list here.</p>
              <Link href="/vendors/signup" className="btn-primary">List Your Business</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-brand-gray mb-4">
                {total.toLocaleString()} vendors found · page {page} of {totalPages}
              </p>
              <div className="space-y-4">
                {vendors.map(vendor => (
                  <div key={vendor.id} className="card-hover p-6">
                    <div className="flex gap-5">
                      {/* Thumbnail strip */}
                      <div className="flex-shrink-0 flex flex-col gap-1.5">
                        <div className="w-36 h-24 rounded-xl overflow-hidden relative">
                          <Image
                            src={vendorImage(vendor.id, 0)}
                            alt={vendor.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-[43px] h-[30px] rounded-md overflow-hidden relative">
                              <Image
                                src={vendorImage(vendor.id, i)}
                                alt=""
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div>
                            <h3 className="font-bold text-brand-black text-lg leading-tight">{vendor.name}</h3>
                            <p className="text-xs text-brand-gray mt-0.5">
                              {cap(vendor.category)} · 📍 {vendor.address || cap(vendor.city)}
                            </p>
                          </div>
                          {vendor.featured && <span className="badge-gold flex-shrink-0">Featured</span>}
                        </div>
                        <p className="text-sm text-brand-gray mt-2 line-clamp-2">{vendor.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          {vendor.rating > 0 && (
                            <p className="text-sm font-medium text-brand-black">⭐ {vendor.rating} <span className="text-brand-gray">({vendor.review_count})</span></p>
                          )}
                          {vendor.min_price && (
                            <p className="text-sm font-semibold text-brand-black">
                              ₹{vendor.min_price.toLocaleString('en-IN')}
                              {vendor.max_price && <span className="text-brand-gray font-normal"> – ₹{vendor.max_price.toLocaleString('en-IN')}</span>}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col justify-center gap-2 flex-shrink-0">
                        <Link href={`/vendors/${vendor.id}`} className="btn-primary text-sm py-2 px-5">
                          View
                        </Link>
                        <button
                          onClick={() => {
                            toggle(vendor.id)
                            showToast(saved.has(vendor.id) ? 'Removed from saved' : 'Vendor saved!')
                          }}
                          className={`text-sm py-2 px-5 rounded-full border transition-all duration-200 font-semibold ${
                            saved.has(vendor.id)
                              ? 'bg-brand-black text-white border-brand-black'
                              : 'bg-transparent text-brand-black border-brand-border hover:border-brand-black'
                          }`}
                        >
                          {saved.has(vendor.id) ? '✓ Saved' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="btn-secondary py-2 px-4 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let p: number
                    if (totalPages <= 7) {
                      p = i + 1
                    } else if (page <= 4) {
                      p = i + 1
                    } else if (page >= totalPages - 3) {
                      p = totalPages - 6 + i
                    } else {
                      p = page - 3 + i
                    }
                    return (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                          p === page
                            ? 'bg-brand-black text-white'
                            : 'bg-transparent text-brand-gray hover:text-brand-black border border-brand-border hover:border-brand-black'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="btn-secondary py-2 px-4 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-10 animate-pulse"><div className="h-8 skeleton w-64 mb-8" /></div>}>
      <VendorListing />
    </Suspense>
  )
}
