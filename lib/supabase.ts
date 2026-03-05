import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Types ────────────────────────────────────────────────────────────────────

export type VendorStatus = 'pending' | 'approved' | 'rejected'

export interface Vendor {
  id: string
  name: string
  owner_name: string
  email: string
  phone: string
  category: string
  city: string
  address: string | null
  description: string
  min_price: number | null
  max_price: number | null
  website: string | null
  instagram: string | null
  rating: number
  review_count: number
  status: VendorStatus
  featured: boolean
  created_at: string
}

export interface Review {
  id: string
  vendor_id: string
  author: string
  email: string
  rating: number
  comment: string
  created_at: string
}

// ─── Vendor queries ───────────────────────────────────────────────────────────

export async function getVendors(filters?: {
  city?: string
  category?: string
  minRating?: number
  featuredOnly?: boolean
  search?: string
}) {
  let query = supabase
    .from('vendors')
    .select('*')
    .eq('status', 'approved')
    .order('featured', { ascending: false })
    .order('rating', { ascending: false })

  if (filters?.city) query = query.eq('city', filters.city)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.minRating) query = query.gte('rating', filters.minRating)
  if (filters?.featuredOnly) query = query.eq('featured', true)
  if (filters?.search) query = query.ilike('name', `%${filters.search}%`)

  const { data, error } = await query
  if (error) throw error
  return data as Vendor[]
}

export async function getVendorById(id: string) {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Vendor
}

export async function getAllVendorsAdmin() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Vendor[]
}

export async function createVendor(vendor: Omit<Vendor, 'id' | 'rating' | 'review_count' | 'status' | 'featured' | 'created_at'>) {
  const { data, error } = await supabase
    .from('vendors')
    .insert({ ...vendor, status: 'pending', featured: false, rating: 0, review_count: 0 })
    .select()
    .single()

  if (error) throw error
  return data as Vendor
}

export async function updateVendorStatus(id: string, status: VendorStatus) {
  const { error } = await supabase
    .from('vendors')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}

export async function updateVendorFeatured(id: string, featured: boolean) {
  const { error } = await supabase
    .from('vendors')
    .update({ featured })
    .eq('id', id)

  if (error) throw error
}

export async function deleteVendor(id: string) {
  const { error } = await supabase
    .from('vendors')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// ─── Review queries ───────────────────────────────────────────────────────────

export async function getReviewsByVendor(vendorId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('vendor_id', vendorId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Review[]
}

export async function createReview(review: Omit<Review, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('reviews')
    .insert(review)
    .select()
    .single()

  if (error) throw error

  // Recalculate vendor average rating
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('vendor_id', review.vendor_id)

  if (reviews && reviews.length > 0) {
    const avg = reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
    await supabase
      .from('vendors')
      .update({ rating: Math.round(avg * 10) / 10, review_count: reviews.length })
      .eq('id', review.vendor_id)
  }

  return data as Review
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export async function getAdminStats() {
  const [{ count: total }, { count: pending }, { count: featured }] = await Promise.all([
    supabase.from('vendors').select('*', { count: 'exact', head: true }),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('featured', true),
  ])

  return { total: total ?? 0, pending: pending ?? 0, featured: featured ?? 0 }
}
