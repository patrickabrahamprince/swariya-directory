export const generateSchema = (vendor: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: vendor.name,
    image: vendor.image || '',
    description: vendor.description || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: vendor.address || '',
      addressLocality: vendor.city,
      addressCountry: 'IN',
    },
    telephone: vendor.phone || '',
    url: `https://swariya.com/vendors/${vendor.id}`,
    priceRange: `₹${vendor.minPrice} - ₹${vendor.maxPrice}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: vendor.rating,
      reviewCount: vendor.reviews || 0,
    },
    review: (vendor.vendorReviews || []).map((r: any) => ({
      '@type': 'Review',
      author: r.author,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
      },
      reviewBody: r.comment,
    })),
  }
}

export const generateSitemap = (vendors: any[]) => {
  const urls = [
    { url: '/', priority: 1.0 },
    { url: '/vendors', priority: 0.9 },
  ]

  vendors.forEach(v => {
    urls.push({
      url: `/vendors/${v.id}`,
      priority: 0.8,
      lastmod: v.updatedAt || new Date().toISOString(),
    })
  })

  return urls
}

export const SEO = {
  home: {
    title: 'Swariya - Find & Book Wedding Vendors',
    description: 'Discover 5000+ verified wedding vendors for your special day. Compare venues, caterers, photographers & more.',
    keywords: 'wedding vendors, wedding planning, venues, caterers, photographers, wedding services',
  },
  vendors: {
    title: 'Wedding Vendors Directory',
    description: 'Browse and filter wedding vendors by city, category, and ratings.',
  },
}
