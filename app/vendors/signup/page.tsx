'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createVendor } from '@/lib/supabase'

export default function VendorSignup() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    category: 'venues',
    city: 'bangalore',
    address: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    website: '',
    instagram: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createVendor({
        name: formData.businessName,
        owner_name: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        city: formData.city,
        address: formData.address || null,
        description: formData.description,
        min_price: formData.minPrice ? parseInt(formData.minPrice) : null,
        max_price: formData.maxPrice ? parseInt(formData.maxPrice) : null,
        website: formData.website || null,
        instagram: formData.instagram || null,
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Failed to submit. Please try again.')
    }
  }

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="card p-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold gradient-text mb-4">Registration Received!</h1>
          <p className="text-gray-600 mb-6">
            Thank you, <strong>{formData.ownerName}</strong>! Your business{' '}
            <strong>{formData.businessName}</strong> has been submitted for review.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-bold text-amber-800 mb-3">What happens next?</h2>
            <ol className="space-y-2 text-amber-700">
              <li>1. Our team reviews your listing (1-2 business days)</li>
              <li>2. We verify your business details</li>
              <li>3. You receive approval email at {formData.email}</li>
              <li>4. Your listing goes live on Swariya!</li>
            </ol>
          </div>
          <Link href="/vendors" className="btn-primary">
            Browse Vendors
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">List Your Business</h1>
        <p className="text-gray-600">Join 5000+ vendors on Swariya and grow your wedding business</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-burgundy text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 2 && (
              <div className={`w-24 h-1 ${step > s ? 'bg-burgundy' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
        <div className="ml-4 text-sm text-gray-600">
          {step === 1 ? 'Business Info' : 'Pricing & Social'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-8">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="The Grand Palace"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Rajesh Kumar"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                >
                  <option value="venues">Venues</option>
                  <option value="catering">Catering</option>
                  <option value="photography">Photography</option>
                  <option value="decoration">Decoration</option>
                  <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                >
                  <option value="bangalore">Bangalore</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="pune">Pune</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 MG Road, Bengaluru"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Business Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell couples what makes your business special..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!formData.businessName || !formData.ownerName || !formData.email || !formData.phone || !formData.description}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Pricing & Social
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Min Price (₹)</label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleChange}
                  placeholder="50000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Max Price (₹)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleChange}
                  placeholder="500000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourbusiness.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Instagram Handle</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@yourbusiness"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-semibold mb-1">Free Listing Included</p>
              <p className="text-green-700 text-sm">
                Basic listing is free. Upgrade to Featured for ₹2,999/month to appear at the top of search results.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button type="submit" className="btn-primary flex-1">
                Submit for Review
              </button>
            </div>
          </div>
        )}
      </form>
    </main>
  )
}
