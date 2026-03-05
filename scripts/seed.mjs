import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tfigatebsqckqzjfvdbd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmaWdhdGVic3Fja3F6amZ2ZGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMTgxODIsImV4cCI6MjA4NDU5NDE4Mn0.1SjzX1fNXV5GThwdY3aGQ5EbUY3QDzmBXnQxB0jj4aw'
)

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(1))

const cityData = {
  bangalore: { areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'Hebbal', 'JP Nagar', 'Jayanagar', 'Marathahalli', 'HSR Layout', 'Electronic City', 'Malleshwaram'], phone_prefix: '+91 98' },
  mumbai: { areas: ['Bandra', 'Andheri', 'Juhu', 'Powai', 'Borivali', 'Thane', 'Navi Mumbai', 'Goregaon', 'Malad', 'Dadar'], phone_prefix: '+91 99' },
  delhi: { areas: ['Connaught Place', 'South Extension', 'Vasant Kunj', 'Janakpuri', 'Rohini', 'Dwarka', 'Lajpat Nagar', 'Pitampura', 'Karol Bagh', 'Defence Colony'], phone_prefix: '+91 98' },
  hyderabad: { areas: ['Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur', 'Miyapur', 'KPHB Colony', 'Secunderabad', 'Dilsukhnagar', 'Gachibowli', 'Begumpet'], phone_prefix: '+91 98' },
  pune: { areas: ['Koregaon Park', 'Viman Nagar', 'Aundh', 'Hinjewadi', 'Wakad', 'Kothrud', 'Pimpri', 'Shivajinagar', 'Hadapsar', 'Baner'], phone_prefix: '+91 98' },
  chennai: { areas: ['Anna Nagar', 'T Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'Mylapore', 'Tambaram', 'Porur', 'Perambur', 'Guindy'], phone_prefix: '+91 98' },
  kolkata: { areas: ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Alipore', 'Dumdum', 'Behala', 'Howrah', 'Gariahat', 'Kasba'], phone_prefix: '+91 98' },
  ahmedabad: { areas: ['Navrangpura', 'Vastrapur', 'Satellite', 'Bodakdev', 'Prahlad Nagar', 'Maninagar', 'Gota', 'SG Highway', 'Thaltej', 'Chandkheda'], phone_prefix: '+91 98' },
  jaipur: { areas: ['C-Scheme', 'Vaishali Nagar', 'Malviya Nagar', 'Tonk Road', 'Jagatpura', 'Mansarovar', 'Civil Lines', 'Bani Park', 'Sanganer', 'Sitapura'], phone_prefix: '+91 98' },
  chandigarh: { areas: ['Sector 17', 'Sector 22', 'Sector 35', 'Panchkula', 'Mohali', 'Phase 7', 'Phase 10', 'Sector 8', 'Sector 26', 'Manimajra'], phone_prefix: '+91 98' },
  goa: { areas: ['Panaji', 'Calangute', 'Candolim', 'Anjuna', 'Mapusa', 'Ponda', 'Margao', 'Vasco', 'Vagator', 'Arpora'], phone_prefix: '+91 98' },
  kochi: { areas: ['Ernakulam', 'Kakkanad', 'Marine Drive', 'Aluva', 'Thrippunithura', 'Edapally', 'Vyttila', 'Palarivattom', 'Kaloor', 'Panampilly Nagar'], phone_prefix: '+91 98' },
  lucknow: { areas: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Chinhat', 'Vibhuti Khand', 'Aliganj', 'Charbagh', 'Lalbagh', 'Mahanagar'], phone_prefix: '+91 98' },
  bhopal: { areas: ['MP Nagar', 'Arera Colony', 'Kolar Road', 'Hoshangabad Road', 'Gulmohar', 'Shahpura', 'Bawadia Kalan', 'New Market', 'TT Nagar', 'Shyamla Hills'], phone_prefix: '+91 98' },
  indore: { areas: ['Vijay Nagar', 'Palasia', 'Bhawarkuan', 'Rajwada', 'Rau', 'Lasudia', 'Bicholi Hapsi', 'Scheme 54', 'MG Road', 'AB Road'], phone_prefix: '+91 98' },
  nagpur: { areas: ['Dharampeth', 'Sadar', 'Sitabuldi', 'Manish Nagar', 'Trimurti Nagar', 'Pratap Nagar', 'Ramdaspeth', 'Civil Lines', 'Hingna Road', 'Wardha Road'], phone_prefix: '+91 98' },
  surat: { areas: ['Athwa', 'Adajan', 'Vesu', 'Citylight', 'Katargam', 'Varachha', 'Althan', 'Pal', 'Udhna', 'Rander'], phone_prefix: '+91 98' },
  vadodara: { areas: ['Alkapuri', 'Fatehgunj', 'Gotri', 'Sayajigunj', 'Manjalpur', 'Subhanpura', 'Waghodia Road', 'Race Course', 'Makarpura', 'Harni'], phone_prefix: '+91 98' },
  coimbatore: { areas: ['RS Puram', 'Peelamedu', 'Gandhipuram', 'Singanallur', 'Saibaba Colony', 'Ramanathapuram', 'Ukkadam', 'Vadavalli', 'Kovaipudur', 'Pollachi Road'], phone_prefix: '+91 98' },
  visakhapatnam: { areas: ['Dwaraka Nagar', 'MVP Colony', 'Gajuwaka', 'Vizag Steel', 'Maddilapalem', 'Seethammadhara', 'Waltair', 'Rushikonda', 'Bheemunipatnam', 'Pendurthi'], phone_prefix: '+91 98' },
  agra: { areas: ['Taj Ganj', 'Civil Lines', 'Kamla Nagar', 'Sikandra', 'Shahganj', 'Bodla', 'Dayalbagh', 'Belanganj', 'Sanjay Place', 'Fatehabad Road'], phone_prefix: '+91 98' },
  amritsar: { areas: ['Lawrence Road', 'Ranjit Avenue', 'Green Avenue', 'Model Town', 'Majitha Road', 'GT Road', 'Queens Road', 'Sultanwind', 'Batala Road', 'Mall Road'], phone_prefix: '+91 98' },
  jodhpur: { areas: ['Ratanada', 'Shastri Nagar', 'Sardarpura', 'Pal Road', 'Bhati Circle', 'Basni', 'Chopasni Housing Board', 'Pratap Nagar', 'Circuit House', 'Sojati Gate'], phone_prefix: '+91 98' },
  udaipur: { areas: ['Hiran Magri', 'Sector 11', 'Fatehpura', 'Madhuban', 'Sukhadia Circle', 'Chetak Circle', 'Udaipole', 'Bhatiyani Chohatta', 'Ambamata', 'Shobhagpura'], phone_prefix: '+91 98' },
  mysore: { areas: ['Saraswathipuram', 'Jayalakshmipuram', 'Gokulam', 'Vijayanagar', 'Kuvempunagar', 'Hebbal', 'Nazarbad', 'Bogadi', 'Ittige Gudu', 'Mandi Mohalla'], phone_prefix: '+91 98' },
}

const templates = {
  venues: {
    prefixes: ['The', 'Royal', 'Grand', 'Elite', 'Premier', 'Golden', 'Silver', 'Diamond', 'Majestic', 'Regal', 'Classic', 'Heritage', 'Imperial', 'Prestige', 'Luxe'],
    names: ['Gardens', 'Banquets', 'Palace', 'Manor', 'Lawns', 'Hall', 'Resort', 'Pavilion', 'Terrace', 'Estate', 'Meadows', 'Courtyard', 'Regency', 'Plaza', 'Convention'],
    suffixes: ['& Events', 'Wedding Venue', 'Celebrations', 'Banquet Hall', '& Gardens', 'Event Space', 'Marriage Hall', '& Resort'],
    descriptions: [
      'Elegant banquet hall with state-of-the-art facilities for weddings of all sizes. In-house catering and decoration team available.',
      'Luxurious wedding venue with outdoor lawns and air-conditioned halls. Capacity from 100 to 2,000 guests.',
      'Premium marriage hall with modern amenities, ample parking and dedicated bridal suite.',
      'Beautiful garden venue perfect for outdoor ceremonies and receptions. Natural ambience with professional event management.',
      'Heritage-inspired banquet space with intricate décor and world-class hospitality. Ideal for grand celebrations.',
      'Contemporary event space with cutting-edge AV systems and customisable layouts for all wedding themes.',
      'Spacious multi-hall complex with dedicated spaces for mehendi, sangeet and reception events.',
      'Resort-style venue set in lush greenery. Destination wedding feel within the city limits.',
    ],
    min_price_range: [50000, 500000],
    max_price_range: [500000, 5000000],
  },
  catering: {
    prefixes: ['Shree', 'Royal', 'Grand', 'Golden', 'Annapurna', 'Swaad', 'Spice', 'Flavour', 'Taste', 'Zaika', 'Divine', 'Classic', 'Premium', 'Deluxe', 'Heritage'],
    names: ['Caterers', 'Kitchen', 'Catering', 'Food Services', 'Cuisines', 'Dawat', 'Bhoj', 'Rasoi', 'Caterers', 'Catering Co'],
    suffixes: ['& Events', 'Services', 'Pvt Ltd', '& Co', 'Wedding Specialists'],
    descriptions: [
      'Multi-cuisine wedding catering specialists. Live counters, elaborate buffets and customised menus for all dietary needs.',
      'Traditional Indian wedding feast experts. North Indian, South Indian and Continental options available.',
      'Professional wedding caterers with 15+ years of experience. Minimum 100 plates to large-scale 10,000+ plate events.',
      'Pure vegetarian wedding catering with authentic regional specialties. Jain options available on request.',
      'Premium catering service with celebrity chef-curated menus. Live cooking stations and dessert spreads included.',
      'Specialist in multi-day wedding event catering. Covers mehendi brunch to grand reception dinner seamlessly.',
      'Authentic regional cuisine specialists for weddings. Banana-leaf meals, live dosa counters and traditional sweets.',
      'Fusion and international cuisine wedding caterers. Ideal for modern couples wanting a unique dining experience.',
    ],
    min_price_range: [250, 800],
    max_price_range: [1000, 5000],
  },
  photography: {
    prefixes: ['Click', 'Frame', 'Pixel', 'Shutter', 'Golden', 'Candid', 'Moment', 'Story', 'Vision', 'Lens', 'Capture', 'Focus', 'Timeless', 'Perfect', 'Vivid'],
    names: ['Studios', 'Photography', 'Films', 'Frames', 'Moments', 'Stories', 'Clicks', 'Captures', 'Visuals', 'Productions'],
    suffixes: ['Wedding Photography', '& Videography', 'Wedding Films', 'Studios', '& Co'],
    descriptions: [
      'Award-winning candid wedding photography. Cinematic videography with drone coverage and same-day edits.',
      'Fine art wedding photography capturing genuine emotions. Pre-wedding shoots and premium album design included.',
      'Documentary-style wedding photography that tells your love story authentically. 4K films available.',
      'Professional wedding photographers with 2,000+ edited images per event. Guaranteed delivery in 30 days.',
      'Cinematic wedding films and editorial photography. Specialises in destination weddings across India.',
      'Candid photography specialists with photojournalistic approach. Instagram-ready galleries within 7 days.',
      'Experienced wedding photography team covering all ceremonies from haldi to reception. Multiple packages available.',
      'Creative wedding photography studio blending traditional and contemporary styles. Digital and print albums included.',
    ],
    min_price_range: [25000, 150000],
    max_price_range: [150000, 1000000],
  },
  decoration: {
    prefixes: ['Blossom', 'Floral', 'Dream', 'Royal', 'Elegant', 'Bloom', 'Petal', 'Divine', 'Grand', 'Luxe', 'Exotic', 'Enchanted', 'Radiant', 'Opulent', 'Celestial'],
    names: ['Decors', 'Decorators', 'Events', 'Weddings', 'Creations', 'Designs', 'Styling', 'Setup', 'Arrangements', 'Florals'],
    suffixes: ['& Events', 'Wedding Decor', '& Floral', 'Pvt Ltd', 'Wedding Styling'],
    descriptions: [
      'Luxury floral wedding decoration specialists. Signature installations including floral canopies and ceiling drapes.',
      'Full-service wedding decoration from engagement to reception. Custom theme design and execution.',
      'Traditional and contemporary wedding décor. Specialises in fresh flower arrangements and thematic setups.',
      'Premium wedding decoration company handling mandap, stage, entrance and reception area styling.',
      'Creative wedding decoration studio. Rustic, bohemian, royal and minimalist themes with detailed execution.',
      'End-to-end wedding decoration services. Floral walls, LED backdrops, throne chairs and phoolon ki chaadar.',
      'Boutique wedding decoration studio known for unique concept designs and personalised styling.',
      'Large-scale wedding decoration specialists handling 500+ events annually. Quick setup and professional team.',
    ],
    min_price_range: [50000, 300000],
    max_price_range: [300000, 5000000],
  },
  entertainment: {
    prefixes: ['Beats', 'Rhythm', 'Sangeet', 'Star', 'Royal', 'Grand', 'Premier', 'Elite', 'Magic', 'Dhamaal', 'Bollywood', 'Classic', 'Ultimate', 'Super', 'Mega'],
    names: ['DJ Services', 'Entertainment', 'Events', 'Productions', 'Shows', 'Performers', 'Artists', 'Band', 'Music', 'Troupe'],
    suffixes: ['& Events', 'Wedding Entertainment', 'Pvt Ltd', '& Co', 'Live Entertainment'],
    descriptions: [
      'Professional wedding DJ with premium sound systems. All genres from Bollywood to EDM. Bilingual emcee included.',
      'Full-service wedding entertainment: DJ, live band, emcee, light shows and special effects.',
      'Live Bollywood band performing at weddings. 8-piece ensemble covering classical, folk and contemporary hits.',
      'Traditional folk and classical musicians for wedding ceremonies. Nadaswaram, shehnai and dhol groups available.',
      'Sangeet night specialists with choreographed performances. Dancers, choreographers and costume design included.',
      'Wedding DJ with intelligent lighting rig and fog machine setup. Sound systems up to 50,000W for large venues.',
      'Baraat entertainment specialists — dhol wallas, fireworks management and LED horse arrangements.',
      'Celebrity-style entertainment packages for weddings. Comedy acts, celebrity look-alikes and magic shows.',
    ],
    min_price_range: [15000, 100000],
    max_price_range: [100000, 800000],
  },
}

const ownerFirstNames = ['Rajesh', 'Suresh', 'Priya', 'Anita', 'Vikram', 'Deepa', 'Anil', 'Sunita', 'Rahul', 'Pooja', 'Kiran', 'Meera', 'Arjun', 'Neha', 'Sanjay', 'Kavitha', 'Ravi', 'Lakshmi', 'Amit', 'Shreya', 'Rohit', 'Divya', 'Manoj', 'Swati', 'Nitin', 'Rekha', 'Ajay', 'Shilpa', 'Vijay', 'Asha', 'Prakash', 'Nisha', 'Sunil', 'Geeta', 'Ramesh']
const ownerLastNames = ['Sharma', 'Verma', 'Singh', 'Kumar', 'Gupta', 'Joshi', 'Patel', 'Rao', 'Nair', 'Reddy', 'Iyer', 'Menon', 'Hegde', 'Kulkarni', 'Desai', 'Mehta', 'Kapoor', 'Malhotra', 'Bhatia', 'Sethi', 'Arora', 'Khanna', 'Agarwal', 'Jain', 'Shah', 'Naik', 'Patil', 'Shinde', 'Deshpande', 'Sawant']

function generateVendor(city, category, index) {
  const t = templates[category]
  const cd = cityData[city]
  const area = rand(cd.areas)

  const prefix = rand(t.prefixes)
  const name = rand(t.names)
  const suffix = Math.random() > 0.5 ? ' ' + rand(t.suffixes) : ''
  const vendorName = `${prefix} ${name}${suffix}`

  const ownerName = `${rand(ownerFirstNames)} ${rand(ownerLastNames)}`
  const emailSlug = vendorName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15)
  const email = `${emailSlug}${index}@example.com`

  const phoneNum = `${randInt(10, 99)}${randInt(100, 999)} ${randInt(10000, 99999)}`
  const phone = `${cd.phone_prefix}${phoneNum}`

  const description = rand(t.descriptions)
  const minPrice = randInt(t.min_price_range[0], t.min_price_range[1])
  const maxPrice = minPrice * randInt(3, 10)
  const rating = randFloat(4.0, 5.0)
  const reviewCount = randInt(5, 400)
  const featured = Math.random() > 0.85

  return {
    name: vendorName,
    owner_name: ownerName,
    email,
    phone,
    category,
    city,
    address: `${area}, ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    description,
    min_price: minPrice,
    max_price: maxPrice,
    rating,
    review_count: reviewCount,
    status: 'approved',
    featured,
  }
}

async function seed() {
  const cities = Object.keys(cityData)
  const categories = ['venues', 'catering', 'photography', 'decoration', 'entertainment']
  const perCityPerCategory = 8 // 25 cities × 5 categories × 8 = 1000 vendors

  const vendors = []
  let idx = 0
  for (const city of cities) {
    for (const category of categories) {
      for (let i = 0; i < perCityPerCategory; i++) {
        vendors.push(generateVendor(city, category, idx++))
      }
    }
  }

  console.log(`Generated ${vendors.length} vendors. Inserting in batches...`)

  // Insert in batches of 100
  const batchSize = 100
  for (let i = 0; i < vendors.length; i += batchSize) {
    const batch = vendors.slice(i, i + batchSize)
    const { error } = await supabase.from('vendors').insert(batch)
    if (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error.message)
    } else {
      console.log(`Batch ${i / batchSize + 1}/${Math.ceil(vendors.length / batchSize)} inserted`)
    }
  }

  console.log('Done!')
}

seed()
