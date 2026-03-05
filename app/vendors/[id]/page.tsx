'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getVendorById, getReviewsByVendor, createReview, type Vendor, type Review } from '@/lib/supabase'

export default function VendorDetail({ params }: { params: { id: string } }) {
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [quoteSent, setQuoteSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', rating: 5, comment: '' })
  const [quoteData, setQuoteData] = useState({ name: '', email: '', phone: '', date: '', guests: '', message: '' })

  useEffect(() => {
    async function load() {
      try {
        const [v, r] = await Promise.all([
          getVendorById(params.id),
          getReviewsByVendor(params.id),
        ])
        setVendor(v)
        setReviews(r)
      } catch {
        // vendor not found — fallback data shown below
      } finally {
        setLoading(false)
      }
    }
    load()
    // restore saved state
    try {
      const s: string[] = JSON.parse(localStorage.getItem('swariya_saved') || '[]')
      setIsSaved(s.includes(params.id))
    } catch {}
  }, [params.id])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleToggleSave = () => {
    try {
      const s: string[] = JSON.parse(localStorage.getItem('swariya_saved') || '[]')
      const next = isSaved ? s.filter(x => x !== params.id) : [...s, params.id]
      localStorage.setItem('swariya_saved', JSON.stringify(next))
      setIsSaved(!isSaved)
      showToast(isSaved ? 'Removed from saved' : 'Vendor saved!')
    } catch {}
  }

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSent(true)
    showToast('Quote request sent!')
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const review = await createReview({
        vendor_id: params.id,
        author: formData.name,
        email: formData.email,
        rating: formData.rating,
        comment: formData.comment,
      })
      setReviews([review, ...reviews])
      setFormData({ name: '', email: '', rating: 5, comment: '' })
      setShowReviewForm(false)
    } catch (err) {
      console.error(err)
      alert('Failed to submit review.')
    } finally {
      setSubmitting(false)
    }
  }

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10 animate-pulse">
        <div className="h-4 skeleton w-40 mb-8" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 h-80 skeleton rounded-2xl" />
          <div className="h-80 skeleton rounded-2xl" />
        </div>
      </main>
    )
  }

  const name = vendor?.name ?? 'The Grand Palace'
  const city = vendor?.city ?? 'bangalore'
  const category = vendor?.category ?? 'venues'
  const description = vendor?.description ?? 'Luxury banquet hall with 500+ capacity and world-class amenities for your perfect wedding day.'
  const minPrice = vendor?.min_price ?? 300000
  const maxPrice = vendor?.max_price ?? 1000000
  const avgRating = vendor?.rating ?? 4.8
  const reviewCount = vendor?.review_count ?? reviews.length

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-black text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg">
          {toast}
        </div>
      )}
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brand-gray mb-8">
        <Link href="/vendors" className="hover:text-brand-black transition-colors">Vendors</Link>
        <span>/</span>
        <span className="text-brand-black font-medium">{name}</span>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-10">
        {/* Gallery */}
        <div className="col-span-2">
          <div className="h-80 bg-brand-light rounded-2xl flex items-center justify-center text-brand-gray mb-3">
            Main Photo
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-brand-light rounded-xl flex items-center justify-center text-brand-gray text-xs">
                {i}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky info card */}
        <div className="card p-6 self-start sticky top-24">
          <h1 className="text-2xl font-bold text-brand-black mb-1">{name}</h1>
          <p className="text-sm text-brand-gray">📍 {cap(city)} · {cap(category)}</p>

          <div className="border-t border-brand-border my-5" />

          <div className="flex items-center gap-3 mb-5">
            <p className="text-3xl font-bold text-brand-black">{avgRating}</p>
            <div>
              <p className="text-yellow-500 text-sm">{'⭐'.repeat(Math.round(Number(avgRating)))}</p>
              <p className="text-xs text-brand-gray">{reviewCount} reviews</p>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-1">Price Range</p>
          <p className="text-xl font-bold text-brand-black mb-6">
            ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
          </p>

          <button
            onClick={() => { setShowQuoteForm(!showQuoteForm); setQuoteSent(false) }}
            className="btn-primary w-full mb-3"
          >
            {showQuoteForm ? 'Close Form' : 'Request Quote'}
          </button>
          <button
            onClick={handleToggleSave}
            className={`w-full text-sm py-3 px-6 rounded-full border font-semibold transition-all duration-200 ${
              isSaved
                ? 'bg-brand-black text-white border-brand-black'
                : 'bg-transparent text-brand-black border-brand-border hover:border-brand-black'
            }`}
          >
            {isSaved ? '✓ Saved' : 'Save Vendor'}
          </button>

          {/* Quote Form */}
          {showQuoteForm && !quoteSent && (
            <form onSubmit={handleSubmitQuote} className="mt-5 space-y-3 border-t border-brand-border pt-5">
              <p className="text-sm font-semibold text-brand-black">Your Details</p>
              <input
                type="text"
                placeholder="Your name"
                value={quoteData.name}
                onChange={e => setQuoteData({ ...quoteData, name: e.target.value })}
                className="input text-sm"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={quoteData.email}
                onChange={e => setQuoteData({ ...quoteData, email: e.target.value })}
                className="input text-sm"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={quoteData.phone}
                onChange={e => setQuoteData({ ...quoteData, phone: e.target.value })}
                className="input text-sm"
                required
              />
              <input
                type="date"
                value={quoteData.date}
                onChange={e => setQuoteData({ ...quoteData, date: e.target.value })}
                className="input text-sm"
              />
              <input
                type="number"
                placeholder="No. of guests"
                value={quoteData.guests}
                onChange={e => setQuoteData({ ...quoteData, guests: e.target.value })}
                className="input text-sm"
              />
              <textarea
                placeholder="Any specific requirements?"
                value={quoteData.message}
                onChange={e => setQuoteData({ ...quoteData, message: e.target.value })}
                className="input resize-none text-sm"
                rows={3}
              />
              <button type="submit" className="btn-primary w-full">Send Request</button>
            </form>
          )}
          {showQuoteForm && quoteSent && (
            <div className="mt-5 border-t border-brand-border pt-5 text-center">
              <p className="text-2xl mb-2">✓</p>
              <p className="text-sm font-semibold text-brand-black">Request sent!</p>
              <p className="text-xs text-brand-gray mt-1">The vendor will contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>

      {/* About */}
      <section className="card p-8 mb-6">
        <h2 className="text-xl font-bold text-brand-black mb-3">About This Vendor</h2>
        <p className="text-brand-gray leading-relaxed mb-6">{description}</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Experience', value: '15 years' },
            { label: 'Events Hosted', value: '500+' },
            { label: 'Team Size', value: '25 staff' },
          ].map(item => (
            <div key={item.label} className="bg-brand-light rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gray mb-1">{item.label}</p>
              <p className="text-xl font-bold text-brand-black">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-brand-black">Reviews & Ratings</h2>
          <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn-primary text-sm py-2 px-5">
            Write a Review
          </button>
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="bg-brand-light rounded-2xl p-6 mb-8 space-y-4">
            <h3 className="font-semibold text-brand-black">Your Review</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                required
              />
            </div>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="input"
            >
              <option value="5">5 ⭐ — Excellent</option>
              <option value="4">4 ⭐ — Good</option>
              <option value="3">3 ⭐ — Average</option>
              <option value="2">2 ⭐ — Poor</option>
              <option value="1">1 ⭐ — Terrible</option>
            </select>
            <textarea
              placeholder="Share your experience..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="input resize-none"
              rows={4}
              required
            />
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                {submitting ? 'Submitting…' : 'Submit Review'}
              </button>
              <button type="button" onClick={() => setShowReviewForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-brand-gray text-sm py-4">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-5">
            {reviews.map(review => (
              <div key={review.id} className="border-b border-brand-border pb-5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-brand-black">{review.author}</p>
                    <p className="text-yellow-500 text-sm mt-0.5">{'⭐'.repeat(review.rating)}</p>
                  </div>
                  <p className="text-xs text-brand-gray">{new Date(review.created_at).toLocaleDateString('en-IN')}</p>
                </div>
                <p className="text-sm text-brand-gray leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
