'use client'
import { useState, useEffect } from 'react'
import {
  getAllVendorsAdmin,
  updateVendorStatus,
  updateVendorFeatured,
  deleteVendor,
  createVendor,
  getAdminStats,
  type Vendor,
} from '@/lib/supabase'

export default function AdminDashboard() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, featured: 0 })
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    owner_name: '',
    email: '',
    phone: '',
    category: 'venues',
    city: 'bangalore',
    description: '',
    address: '',
    min_price: '',
    max_price: '',
    website: '',
    instagram: '',
  })

  async function load() {
    setLoading(true)
    try {
      const [vendorData, statsData] = await Promise.all([
        getAllVendorsAdmin(),
        getAdminStats(),
      ])
      setVendors(vendorData)
      setStats(statsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleAddVendor = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createVendor({
        name: formData.name,
        owner_name: formData.owner_name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        city: formData.city,
        description: formData.description,
        address: formData.address || null,
        min_price: formData.min_price ? parseInt(formData.min_price) : null,
        max_price: formData.max_price ? parseInt(formData.max_price) : null,
        website: formData.website || null,
        instagram: formData.instagram || null,
      })
      setFormData({ name: '', owner_name: '', email: '', phone: '', category: 'venues', city: 'bangalore', description: '', address: '', min_price: '', max_price: '', website: '', instagram: '' })
      setShowAddForm(false)
      await load()
    } catch (err) {
      console.error(err)
      alert('Failed to add vendor.')
    }
  }

  const handleApprove = async (id: string) => {
    await updateVendorStatus(id, 'approved')
    setVendors(vendors.map(v => v.id === id ? { ...v, status: 'approved' } : v))
    setStats(s => ({ ...s, pending: s.pending - 1 }))
  }

  const handleReject = async (id: string) => {
    await updateVendorStatus(id, 'rejected')
    setVendors(vendors.map(v => v.id === id ? { ...v, status: 'rejected' } : v))
    setStats(s => ({ ...s, pending: s.pending - 1 }))
  }

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await updateVendorFeatured(id, !current)
    setVendors(vendors.map(v => v.id === id ? { ...v, featured: !current } : v))
    setStats(s => ({ ...s, featured: s.featured + (current ? -1 : 1) }))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this vendor? This cannot be undone.')) return
    await deleteVendor(id)
    setVendors(vendors.filter(v => v.id !== id))
    setStats(s => ({ ...s, total: s.total - 1 }))
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 gradient-text">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-burgundy">{stats.total}</p>
          <p className="text-gray-600">Total Vendors</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-burgundy">{stats.pending}</p>
          <p className="text-gray-600">Pending Approval</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-burgundy">{stats.featured}</p>
          <p className="text-gray-600">Featured</p>
        </div>
        <div className="card p-6 text-center">
          <p className="text-3xl font-bold text-burgundy">₹0</p>
          <p className="text-gray-600">Revenue (This Month)</p>
        </div>
      </div>

      {/* Add Vendor Form */}
      {showAddForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Vendor</h2>
          <form onSubmit={handleAddVendor} className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Business name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Owner name *"
              value={formData.owner_name}
              onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Phone *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="venues">Venues</option>
              <option value="catering">Catering</option>
              <option value="photography">Photography</option>
              <option value="decoration">Decoration</option>
              <option value="entertainment">Entertainment</option>
            </select>
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
            </select>
            <textarea
              placeholder="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg col-span-3"
              rows={2}
              required
            />
            <button type="submit" className="btn-primary">Add Vendor</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary">
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Vendors</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary">
          + Add Vendor
        </button>
      </div>

      {/* Vendors Table */}
      {loading ? (
        <div className="card p-8 text-center text-gray-500">Loading vendors...</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-burgundy text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">City</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{vendor.name}</td>
                  <td className="px-6 py-4">{vendor.category}</td>
                  <td className="px-6 py-4">{vendor.city}</td>
                  <td className="px-6 py-4">
                    {vendor.rating > 0 ? `${vendor.rating} ⭐` : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        vendor.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : vendor.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={vendor.featured}
                      onChange={() => handleToggleFeatured(vendor.id, vendor.featured)}
                      className="w-5 h-5"
                    />
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {vendor.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(vendor.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(vendor.id)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(vendor.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {vendors.length === 0 && (
            <p className="text-center text-gray-500 py-8">No vendors yet.</p>
          )}
        </div>
      )}
    </main>
  )
}
