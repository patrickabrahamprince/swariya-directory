-- ============================================================
-- Swariya Wedding Directory — Full Schema + Seed Data
-- Run this in: https://supabase.com/dashboard/project/tfigatebsqckqzjfvdbd/sql/new
-- ============================================================

-- ── Tables ──────────────────────────────────────────────────

create table if not exists vendors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  owner_name text not null,
  email text not null,
  phone text not null,
  category text not null check (category in ('venues','catering','photography','decoration','entertainment')),
  city text not null check (city in ('bangalore','mumbai','delhi','hyderabad','pune')),
  address text,
  description text not null,
  min_price integer,
  max_price integer,
  website text,
  instagram text,
  rating numeric(3,1) default 0,
  review_count integer default 0,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid not null references vendors(id) on delete cascade,
  author text not null,
  email text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────

alter table vendors enable row level security;
alter table reviews enable row level security;

drop policy if exists "Public read approved vendors" on vendors;
drop policy if exists "Public read vendors" on vendors;
drop policy if exists "Public can submit vendors" on vendors;
drop policy if exists "Anon can update vendors" on vendors;
drop policy if exists "Anon can delete vendors" on vendors;
drop policy if exists "Public read reviews" on reviews;
drop policy if exists "Public can write reviews" on reviews;

create policy "Public read vendors"    on vendors for select using (true);
create policy "Public submit vendors"  on vendors for insert with check (true);
create policy "Anon update vendors"    on vendors for update using (true);
create policy "Anon delete vendors"    on vendors for delete using (true);
create policy "Public read reviews"    on reviews for select using (true);
create policy "Public write reviews"   on reviews for insert with check (true);

-- ── Seed Data ───────────────────────────────────────────────
-- 5 cities × 5 categories × 4–5 vendors = ~110 vendors

insert into vendors (name, owner_name, email, phone, category, city, address, description, min_price, max_price, rating, review_count, status, featured) values

-- ══════════════════════════════════════════════
-- BANGALORE — VENUES
-- ══════════════════════════════════════════════
('Meridian by the Lawns', 'Suresh Menon', 'meridian@example.com', '+91 98441 23456', 'venues', 'bangalore', 'Bannerghatta Road, Bangalore', 'Grand multi-function venue with manicured lawns seating 7,000 guests. Perfect for large South Indian weddings with in-house catering and décor teams.', 200000, 2000000, 4.9, 9, 'approved', true),
('The Kings Meadows', 'Vikram Hegde', 'kingsmeadows@example.com', '+91 99001 34567', 'venues', 'bangalore', 'Hebbal, Bangalore', 'Sprawling marriage garden spread across 5 acres in Hebbal. Hosts up to 2,000 guests with outdoor mandap, air-conditioned halls and valet parking.', 200000, 1500000, 4.8, 6, 'approved', true),
('Royal Orchid Hotels', 'Anand Krishnamurthy', 'royalorchid@example.com', '+91 80234 45678', 'venues', 'bangalore', 'Old Airport Road, Bangalore', '5-star hotel banquets offering intimate to mid-size receptions (50–500 guests). World-class hospitality, bridal suites and curated wedding packages.', 280000, 2000000, 5.0, 2, 'approved', false),
('Amita Rasa Resort', 'Deepa Rao', 'amitarasa@example.com', '+91 97410 56789', 'venues', 'bangalore', 'Kanakapura Road, Bangalore', 'Heritage resort-style wedding venue set in natural surroundings. Specialises in eco-friendly themed weddings with capacity for 300–1,500 guests.', 150000, 1200000, 4.7, 14, 'approved', false),
('The LaLit Ashok', 'Pradeep Nair', 'lalitashok@example.com', '+91 80225 67890', 'venues', 'bangalore', 'Kumara Krupa, Bangalore', 'Iconic luxury hotel with pillarless grand ballroom. Hosts corporate galas and royal weddings alike — capacity up to 800 guests with stellar AV setup.', 500000, 5000000, 4.6, 38, 'approved', false),

-- ══════════════════════════════════════════════
-- BANGALORE — CATERING
-- ══════════════════════════════════════════════
('Sri Sai Grand Catering', 'Manjunath Reddy', 'srisai@example.com', '+91 98456 11223', 'catering', 'bangalore', 'Rajajinagar, Bangalore', 'Authentic South Indian multi-cuisine catering specialists. Known for elaborate banana-leaf spreads and live dosa, idli counters. Min 200 plates.', 350, 1200, 4.8, 124, 'approved', true),
('Royal Flavors Catering', 'Sunita Sharma', 'royalflavors@example.com', '+91 87654 22334', 'catering', 'bangalore', 'Indiranagar, Bangalore', 'Premium catering with Mughlai, Continental and South Indian spreads. Celebrity chef-led team. Handles 500–10,000 plate events effortlessly.', 650, 3000, 4.6, 98, 'approved', false),
('Nalapaka Events & Catering', 'Geetha Prasad', 'nalapaka@example.com', '+91 76543 33445', 'catering', 'bangalore', 'BTM Layout, Bangalore', 'Traditional Karnataka-style wedding feasts with modern presentation. Specialises in Sapta Padhi and reception buffets with 40+ dishes.', 300, 900, 4.5, 67, 'approved', false),
('The Grand Feast Caterers', 'Ravi Kumar', 'grandfeast@example.com', '+91 99887 44556', 'catering', 'bangalore', 'Koramangala, Bangalore', 'Live-counter specialists — pasta, biryani, chaat, desserts. Perfect for cocktail receptions and fusion weddings. Minimum 100 plates.', 800, 4000, 4.7, 53, 'approved', false),

-- ══════════════════════════════════════════════
-- BANGALORE — PHOTOGRAPHY
-- ══════════════════════════════════════════════
('Click Moments Studio', 'Arjun Mehta', 'clickmoments@example.com', '+91 76543 55667', 'photography', 'bangalore', 'HSR Layout, Bangalore', 'Award-winning wedding photography & cinematic videography. Known for candid storytelling, drone coverage and same-day highlight reels.', 75000, 400000, 4.9, 320, 'approved', true),
('Frame Perfect Photography', 'Kiran Shetty', 'frameperfect@example.com', '+91 98765 66778', 'photography', 'bangalore', 'Whitefield, Bangalore', 'Fine art wedding photography with a editorial magazine style. Pre-wedding shoots, album design and 4K cinematic films included in all packages.', 60000, 300000, 4.8, 187, 'approved', false),
('Golden Hour Films', 'Neha Joshi', 'goldenhour@example.com', '+91 87411 77889', 'photography', 'bangalore', 'Jayanagar, Bangalore', 'Specialises in golden-hour portraits and documentary-style wedding films. Tamil, Telugu and Kannada wedding specialists.', 40000, 200000, 4.7, 142, 'approved', false),
('Shutter Stories', 'Rahul D''Souza', 'shutterstories@example.com', '+91 77890 88990', 'photography', 'bangalore', 'Malleshwaram, Bangalore', 'Candid photography boutique serving Bangalore''s discerning couples since 2012. Full-day coverage with 1,500+ edited images guaranteed.', 35000, 150000, 4.6, 211, 'approved', false),

-- ══════════════════════════════════════════════
-- BANGALORE — DECORATION
-- ══════════════════════════════════════════════
('Blossom Wedding Decor', 'Pooja Iyer', 'blossomdecor@example.com', '+91 98110 99001', 'decoration', 'bangalore', 'Sarjapur Road, Bangalore', 'Luxury floral and theme décor studio. Signature installations: floral tunnels, ceiling drapes and floating candle pools. Trusted by 5-star venues.', 150000, 2000000, 4.9, 76, 'approved', true),
('Dream Weave Decors', 'Lakshmi Nair', 'dreamweave@example.com', '+91 99002 00112', 'decoration', 'bangalore', 'Electronic City, Bangalore', 'Contemporary theme wedding decoration — Rustic, Bohemian, Royal and Minimalist. Custom backdrop design and floral wall installations.', 100000, 1200000, 4.7, 54, 'approved', false),
('Floral Fantasy Events', 'Ananya Singh', 'floralfantasy@example.com', '+91 88910 11223', 'decoration', 'bangalore', 'JP Nagar, Bangalore', 'Specialises in South Indian traditional décor with fresh jasmine garlands, kolam art and brass lamp installations. 200+ designs in portfolio.', 80000, 800000, 4.6, 89, 'approved', false),

-- ══════════════════════════════════════════════
-- BANGALORE — ENTERTAINMENT
-- ══════════════════════════════════════════════
('Sangeet Stars Entertainment', 'DJ Raj Kumar', 'sangeerstars@example.com', '+91 98200 22334', 'entertainment', 'bangalore', 'MG Road, Bangalore', 'Full-service wedding entertainment: DJ, emcee, live band, dance performances and light shows. Specialists in Sangeet night choreography packages.', 50000, 500000, 4.8, 63, 'approved', true),
('Rhythm & Beats DJ Services', 'Aakash Verma', 'rhythmbeats@example.com', '+91 77001 33445', 'entertainment', 'bangalore', 'Ulsoor, Bangalore', 'Professional DJ setup with 20,000W sound and intelligent lighting rig. Bilingual emcee (Kannada + English). All genres from Bollywood to EDM.', 30000, 200000, 4.6, 48, 'approved', false),
('Royal Nadaswaram Vidwans', 'Palani Kumar', 'nadaswaram@example.com', '+91 99300 44556', 'entertainment', 'bangalore', 'Basavanagudi, Bangalore', 'Traditional Nadaswaram and Tavil ensemble for auspicious ceremonies. Also provide Melam and Panchamukha Vadya groups for processions.', 20000, 100000, 4.9, 32, 'approved', false),

-- ══════════════════════════════════════════════
-- MUMBAI — VENUES
-- ══════════════════════════════════════════════
('Al Ayamna Banquet & Catering', 'Rashid Khan', 'alayamna@example.com', '+91 98200 55667', 'venues', 'mumbai', 'Jogeshwari West, Mumbai', 'Spacious air-conditioned banquet hall seating 600 guests. Known for impeccable in-house Muslim wedding speciality cuisine and décor.', 75000, 800000, 5.0, 186, 'approved', true),
('Farm Regency Gorai', 'Nilesh Patil', 'farmregency@example.com', '+91 88501 66778', 'venues', 'mumbai', 'Mira Road East, Mumbai', 'Lush resort venue with outdoor poolside and garden settings. Ideal for destination-feel weddings in Mumbai — up to 1,200 guests with tented mandap.', 240000, 2000000, 4.7, 21, 'approved', true),
('ILeaf Grand Banquets', 'Supriya Shinde', 'ileafgrand@example.com', '+91 77612 77889', 'venues', 'mumbai', 'Vashi, Navi Mumbai', 'Modern banquet complex in Navi Mumbai with 3 independent halls. Full A/V setup, bridal changing rooms and dedicated wedding coordinator on-site.', 120000, 1000000, 5.0, 2, 'approved', false),
('The Fountain City', 'Rohit Desai', 'fountaincity@example.com', '+91 99010 88990', 'venues', 'mumbai', 'Thane West, Mumbai', 'Elegant 3-level wedding resort with cascading water features. Corporate and social events up to 1,500 guests. On-site bridal suite and spa.', 99900, 1500000, 4.5, 33, 'approved', false),
('Taj Lands End', 'Devika Mehta', 'tajlandsend@example.com', '+91 22661 99001', 'venues', 'mumbai', 'Bandra West, Mumbai', 'Iconic 5-star seafront ballroom with panoramic sea views. Perfect for ultra-luxury celebrations — in-house Michelin-quality catering and floral team.', 1000000, 8000000, 4.9, 92, 'approved', false),

-- ══════════════════════════════════════════════
-- MUMBAI — CATERING
-- ══════════════════════════════════════════════
('Shri Mahavir Caterers', 'Haresh Jain', 'mahavircaterers@example.com', '+91 98200 10234', 'catering', 'mumbai', 'Ghatkopar, Mumbai', 'Experts in Jain and pure vegetarian Gujarati-Marwari wedding feasts. Famous for their dal baati, panchkuta and Rajasthani sweets counters.', 400, 1800, 4.8, 213, 'approved', true),
('Zaika Catering Services', 'Imran Sheikh', 'zaika@example.com', '+91 87632 21345', 'catering', 'mumbai', 'Andheri East, Mumbai', 'Mughlai and Maharashtrian wedding caterers. Signature dish: Mutton Nawabi Biryani. Handles 200–5,000 plate weddings with live kebab counters.', 600, 3000, 4.7, 167, 'approved', false),
('Om Sai Caterers', 'Suresh Kulkarni', 'omsai@example.com', '+91 76450 32456', 'catering', 'mumbai', 'Dadar, Mumbai', 'Traditional Maharashtrian paan-supari wedding menu specialists. Known for Puran Poli, Basundi and authentic Sol Kadhi. 20 years in business.', 300, 1200, 4.6, 88, 'approved', false),

-- ══════════════════════════════════════════════
-- MUMBAI — PHOTOGRAPHY
-- ══════════════════════════════════════════════
('The Wedding Chronicles', 'Sameer Kapoor', 'weddingchronicles@example.com', '+91 98110 43567', 'photography', 'mumbai', 'Bandra, Mumbai', 'Bollywood-style cinematic wedding films and editorial photography. Featured in Vogue India Weddings. 10+ team of photographers and cinematographers.', 200000, 1000000, 5.0, 98, 'approved', true),
('Pixel Perfect Studios', 'Priya Malhotra', 'pixelperfect@example.com', '+91 88765 54678', 'photography', 'mumbai', 'Andheri West, Mumbai', 'Luxury destination wedding photography. Covers Hindu, Christian, Parsi and Muslim ceremonies. International shoots and album printing included.', 100000, 500000, 4.8, 143, 'approved', false),
('Candid Frames Mumbai', 'Rohan Bhatia', 'candidframes@example.com', '+91 77432 65789', 'photography', 'mumbai', 'Powai, Mumbai', 'Candid wedding specialists with photojournalistic approach. 2-camera setup, drone videography and Instagram-ready edits within 7 days.', 60000, 300000, 4.7, 209, 'approved', false),

-- ══════════════════════════════════════════════
-- MUMBAI — DECORATION
-- ══════════════════════════════════════════════
('Bloom & Decor Mumbai', 'Priya Patel', 'bloomdecor@example.com', '+91 65432 76890', 'decoration', 'mumbai', 'Juhu, Mumbai', 'Mumbai''s leading floral décor studio. Created over 2,000 wedding installations including 50-ft floral canopies and underwater themed receptions.', 200000, 5000000, 4.9, 312, 'approved', true),
('Shaadi Sajawat', 'Meera Thakur', 'shaadisajawat@example.com', '+91 99100 87901', 'decoration', 'mumbai', 'Borivali, Mumbai', 'Full-service wedding decoration from engagement to reception. Specialises in Maharashtrian traditional and Indo-western fusion themes.', 80000, 1000000, 4.6, 77, 'approved', false),
('Mumbai Floral Events', 'Kavitha Nambiar', 'mumbaifloral@example.com', '+91 88230 98012', 'decoration', 'mumbai', 'Malad West, Mumbai', 'Budget-friendly professional décor with fresh flowers. Specialises in garden and terrace weddings. Provides chairs, drapes and LED backdrops.', 50000, 600000, 4.5, 55, 'approved', false),

-- ══════════════════════════════════════════════
-- MUMBAI — ENTERTAINMENT
-- ══════════════════════════════════════════════
('Bollywood Beats DJ', 'DJ Vishal', 'bollywoodbeats@example.com', '+91 98870 09123', 'entertainment', 'mumbai', 'Versova, Mumbai', 'Mumbai''s #1 Bollywood wedding DJ. Exclusive artist tie-ups, LED stage, fog machines and coordinated light shows. Served over 500 weddings.', 80000, 600000, 4.9, 441, 'approved', true),
('StarNite Events', 'Rakesh Joshi', 'starnite@example.com', '+91 77560 10234', 'entertainment', 'mumbai', 'Goregaon, Mumbai', 'End-to-end wedding entertainment — live Bollywood singers, folk dancers, magic shows and celebrity look-alike acts for Sangeet nights.', 100000, 1000000, 4.7, 88, 'approved', false),
('Naach Gaana Entertainment', 'Simran Sethi', 'naachgaana@example.com', '+91 88210 21345', 'entertainment', 'mumbai', 'Dadar, Mumbai', 'Choreographed Sangeet performances and group dance packages for bride and groom families. 15 trained dancers, custom costume design included.', 50000, 400000, 4.6, 62, 'approved', false),

-- ══════════════════════════════════════════════
-- DELHI — VENUES
-- ══════════════════════════════════════════════
('The Grand New Delhi', 'Anil Sharma', 'grandnewdelhi@example.com', '+91 11234 32456', 'venues', 'delhi', 'Nelson Mandela Road, New Delhi', 'Delhi''s grandest wedding hotel with 8 banquet halls seating up to 5,000 guests. India''s finest in-house wedding planning team and Taj-quality cuisine.', 1000000, 10000000, 4.9, 287, 'approved', true),
('Leela Ambience Convention Hotel', 'Sunaina Kapila', 'leelaambience@example.com', '+91 11456 43567', 'venues', 'delhi', 'Gurugram, Delhi NCR', 'Iconic pillarless convention hall with 26,000 sq ft of event space. Premium AV, valet parking for 600 cars and 5-star banquet catering.', 800000, 8000000, 4.8, 134, 'approved', true),
('Radisson Blu Plaza', 'Vivek Malhotra', 'radissondelhi@example.com', '+91 11678 54678', 'venues', 'delhi', 'Mahipalpur, New Delhi', 'Contemporary hotel venue with rooftop terrace and garden spaces. Ideal for mid-size weddings (100–1,500 guests) with international buffet options.', 300000, 3000000, 4.7, 56, 'approved', false),
('Palam Farms', 'Harinder Singh', 'palamfarms@example.com', '+91 98101 65789', 'venues', 'delhi', 'Palam, New Delhi', 'Open-air farmhouse venue on 8 acres with rustic barn aesthetic. Popular for Punjabi wedding traditions — bhangra floor, haldi area and fire-pit lounge.', 200000, 2000000, 4.6, 43, 'approved', false),
('Jaypee Siddharth', 'Rohini Ahuja', 'jaypeesiddharth@example.com', '+91 11890 76890', 'venues', 'delhi', 'Rajendra Place, New Delhi', 'Heritage business hotel with elegant banquets for intimate to large celebrations. Known for North Indian cuisine and bridal hospitality suites.', 400000, 4000000, 4.5, 29, 'approved', false),

-- ══════════════════════════════════════════════
-- DELHI — CATERING
-- ══════════════════════════════════════════════
('Bikanervala Caterers', 'Vijay Agarwal', 'bikanervala@example.com', '+91 98100 87901', 'catering', 'delhi', 'Karol Bagh, New Delhi', 'Legendary Delhi brand offering authentic Rajasthani and Punjabi wedding menus. Famous for their Ghevar, Halwa and live Dahi Bhalla counters.', 700, 3500, 4.8, 542, 'approved', true),
('Delhi Dawat Caterers', 'Kamal Singh', 'delhidawat@example.com', '+91 87412 98012', 'catering', 'delhi', 'Lajpat Nagar, New Delhi', 'Large-scale Punjabi wedding catering specialists. Handles events from 500 to 10,000 plates. Renowned for their Butter Chicken and Dal Makhani.', 500, 2500, 4.7, 321, 'approved', false),
('Mughlai Khazana', 'Asif Khan', 'mughlaikhazana@example.com', '+91 76123 09123', 'catering', 'delhi', 'Chandni Chowk, New Delhi', 'Authentic Old Delhi Mughlai cuisine for weddings. Signature items: Galouti Kebab, Nihari, Phirni and Shahi Tukda. Min 300 plates.', 600, 3000, 4.6, 198, 'approved', false),

-- ══════════════════════════════════════════════
-- DELHI — PHOTOGRAPHY
-- ══════════════════════════════════════════════
('Delhi Candid Photography', 'Rohit Mehra', 'delhicandid@example.com', '+91 98901 10234', 'photography', 'delhi', 'South Extension, New Delhi', 'Delhi''s most awarded wedding photographers. Known for storytelling portraits at Mughal-era monuments. Travel to destination weddings across India.', 150000, 800000, 5.0, 267, 'approved', true),
('Moments Forever Studio', 'Aditi Batra', 'momentsforever@example.com', '+91 88534 21345', 'photography', 'delhi', 'Vasant Kunj, New Delhi', 'Fine art wedding photography with international editorial aesthetic. Specialises in pre-wedding shoots at Rajasthan forts and Himachal retreats.', 80000, 400000, 4.8, 189, 'approved', false),
('SnapWed Photography', 'Gaurav Khanna', 'snapwed@example.com', '+91 77213 32456', 'photography', 'delhi', 'Janakpuri, New Delhi', 'High-volume quality wedding photography firm. Full-day coverage, 2,000+ edited images, 30-page hardbound album and digital delivery.', 50000, 250000, 4.6, 334, 'approved', false),

-- ══════════════════════════════════════════════
-- DELHI — DECORATION
-- ══════════════════════════════════════════════
('Shaadi Mahal Decorators', 'Rekha Gupta', 'shaadimahal@example.com', '+91 98112 43567', 'decoration', 'delhi', 'Pitampura, New Delhi', 'Delhi''s largest wedding decoration company with 200+ staff. Handles massive Punjabi wedding mandaps, sangeet stages and reception halls.', 200000, 5000000, 4.8, 423, 'approved', true),
('Flower Power Events', 'Tanya Kapoor', 'flowerpower@example.com', '+91 87654 54678', 'decoration', 'delhi', 'Defence Colony, New Delhi', 'Luxury floral design studio. Known for Phoolon Ki Holi setups, ceiling installations and premium imported flower arrangements.', 150000, 3000000, 4.7, 156, 'approved', false),
('Royal Decor Delhi', 'Mohit Arora', 'royaldecor@example.com', '+91 76890 65789', 'decoration', 'delhi', 'Rohini, New Delhi', 'Full decoration solutions from mehndi to reception. Specialises in red-gold royal Punjabi themes with LED arches, throne chairs and phoolon ki chaadar.', 100000, 2000000, 4.5, 88, 'approved', false),

-- ══════════════════════════════════════════════
-- DELHI — ENTERTAINMENT
-- ══════════════════════════════════════════════
('Punjabi Beats DJ & Events', 'DJ Sunny', 'punjabibeats@example.com', '+91 98012 76890', 'entertainment', 'delhi', 'Paschim Vihar, New Delhi', 'Delhi''s go-to Punjabi wedding DJ with 30,000W speaker systems. Bhangra troupe add-on available. Sound and lights setup in under 3 hours.', 60000, 500000, 4.9, 387, 'approved', true),
('Bollywood Live Band', 'Amar Sharma', 'bollywoodlive@example.com', '+91 87210 87901', 'entertainment', 'delhi', 'Connaught Place, New Delhi', '12-piece live wedding band performing Bollywood classics, Sufi and Punjabi folk. Also available as DJ+Band hybrid package for all-night events.', 120000, 800000, 4.8, 124, 'approved', false),
('Dilli Dhamal Entertainment', 'Neetu Verma', 'dillidhamal@example.com', '+91 76345 98012', 'entertainment', 'delhi', 'Dwarka, New Delhi', 'Baraat dhol wallas, fireworks display management, fire-jugglers and LED horse choreography for grand Delhi baraat processions.', 40000, 300000, 4.7, 95, 'approved', false),

-- ══════════════════════════════════════════════
-- HYDERABAD — VENUES
-- ══════════════════════════════════════════════
('Hilton Hyderabad Genome Valley', 'Prasad Rao', 'hiltonhyd@example.com', '+91 40234 09123', 'venues', 'hyderabad', 'Shamirpet, Hyderabad', 'Luxury resort venue on the outskirts of Hyderabad. 100-acre campus with outdoor lawns, pool-side settings and pillarless ballroom for 1,000 guests.', 500000, 5000000, 4.8, 67, 'approved', true),
('Wedica Celebrations', 'Srinivas Murthy', 'wedica@example.com', '+91 98490 10234', 'venues', 'hyderabad', 'Shamshabad, Hyderabad', 'Premium banquet complex near Rajiv Gandhi International Airport. 3 halls ranging from intimate gatherings to 1,200-guest receptions with full amenities.', 120000, 1200000, 4.7, 43, 'approved', true),
('Siri Nature Valley Resort', 'Kavitha Reddy', 'sirinature@example.com', '+91 87612 21345', 'venues', 'hyderabad', 'Nanakramguda, Hyderabad', 'Natural resort venue with lakes and garden mandap areas. Specialises in eco-friendly Telangana-style weddings for 20 to 2,000 guests.', 100000, 1500000, 4.6, 29, 'approved', false),
('The Environ Courtyard Convention', 'Anil Goud', 'theenviron@example.com', '+91 77890 32456', 'venues', 'hyderabad', 'Shamshabad, Hyderabad', 'Sprawling farmhouse and lawn venue with 3,000 guest capacity. Famous for grand Hyderabadi Muslim weddings with traditional decor and cuisine.', 200000, 3000000, 5.0, 4, 'approved', false),
('Novotel Hyderabad Convention Centre', 'Madhuri Sharma', 'novotelhy@example.com', '+91 40456 43567', 'venues', 'hyderabad', 'HICC Complex, Hyderabad', 'HICC-connected luxury hotel with South India''s largest convention facilities. Perfect for destination weddings — 9 halls, 6,500 guest capacity.', 500000, 8000000, 4.9, 112, 'approved', false),

-- ══════════════════════════════════════════════
-- HYDERABAD — CATERING
-- ══════════════════════════════════════════════
('Paradise Catering Services', 'Mohammed Rafi', 'paradisecatering@example.com', '+91 98490 54678', 'catering', 'hyderabad', 'Secunderabad, Hyderabad', 'Legendary Hyderabadi dum biryani catering for weddings. Authentic recipe unchanged since 1953. Handles 1,000 to 20,000 plate events. The gold standard.', 400, 1800, 4.9, 654, 'approved', true),
('Rayalaseema Kitchen', 'Venkateswara Rao', 'rayalaseema@example.com', '+91 87456 65789', 'catering', 'hyderabad', 'Dilsukhnagar, Hyderabad', 'Andhra and Telangana wedding feasts with fiery curries, gongura pachadis and traditional Bobbattu desserts. 500–8,000 plate specialists.', 350, 1500, 4.7, 213, 'approved', false),
('Nawab''s Dawat Caterers', 'Imtiaz Hussain', 'nawabsdawat@example.com', '+91 76234 76890', 'catering', 'hyderabad', 'Old City, Hyderabad', 'Old City Hyderabadi cuisine specialists. Famous for Haleem, Marag, Sheer Korma and authentic Hyderabadi Biryani. Minimum 500 plates.', 550, 2500, 4.8, 389, 'approved', false),

-- ══════════════════════════════════════════════
-- HYDERABAD — PHOTOGRAPHY
-- ══════════════════════════════════════════════
('Hyderabad Wedding Frames', 'Sai Kiran', 'hydframes@example.com', '+91 98765 87901', 'photography', 'hyderabad', 'Banjara Hills, Hyderabad', 'Cinematic wedding films and candid photography. Specialists in grand Hyderabadi Nawabi-themed shoots at Chowmahalla Palace and Golconda Fort.', 80000, 500000, 4.9, 178, 'approved', true),
('Telugu Weddings Photography', 'Ravi Teja', 'teluguweddings@example.com', '+91 88234 98012', 'photography', 'hyderabad', 'Madhapur, Hyderabad', 'Telugu and Urdu wedding photography specialists. Multi-day event coverage from Pellikuthuru to reception. 4K drone films included.', 60000, 350000, 4.7, 134, 'approved', false),
('Vizag Click Studios', 'Anjali Reddy', 'vizagclick@example.com', '+91 77012 09123', 'photography', 'hyderabad', 'Kondapur, Hyderabad', 'Budget-friendly professional wedding photography. 2 photographers, 1,500 edited photos, same-day Instagram teaser and hardbound album.', 30000, 150000, 4.5, 267, 'approved', false),

-- ══════════════════════════════════════════════
-- HYDERABAD — DECORATION
-- ══════════════════════════════════════════════
('Deccan Floral Events', 'Padmaja Rao', 'deccanfloral@example.com', '+91 98100 10234', 'decoration', 'hyderabad', 'Jubilee Hills, Hyderabad', 'Hyderabad''s premium wedding décor house. Known for rose-gold Nawabi palki setups, marigold canopies and jasmine-draped mandaps.', 150000, 3000000, 4.8, 234, 'approved', true),
('Royal Traditions Decor', 'Surekha Kumari', 'royaltraditions@example.com', '+91 87230 21345', 'decoration', 'hyderabad', 'Miyapur, Hyderabad', 'Traditional Telangana and Muslim Hyderabadi wedding décor. Specialises in Mughali arches, chanda decoration and Urdu calligraphy artwork.', 100000, 2000000, 4.6, 88, 'approved', false),

-- ══════════════════════════════════════════════
-- HYDERABAD — ENTERTAINMENT
-- ══════════════════════════════════════════════
('Tollywood Beats DJ', 'DJ Sai', 'tollywoodbeats@example.com', '+91 98432 32456', 'entertainment', 'hyderabad', 'KPHB Colony, Hyderabad', 'Telugu and Urdu wedding DJ with premium Funktion-One sound system. Specialises in Telugu film songs, ghazals and Bollywood mashups.', 50000, 400000, 4.8, 176, 'approved', true),
('Shehnai Maestros Hyderabad', 'Ustad Aslam', 'shehnaimaestros@example.com', '+91 77123 43567', 'entertainment', 'hyderabad', 'Old City, Hyderabad', 'Authentic Shehnai ensemble for Hindu and Muslim wedding ceremonies. Group of 6 musicians performing classical ragas for Nikah and Saptapadi rituals.', 25000, 150000, 4.9, 54, 'approved', false),
('Hyderabad Dhol Tasha Group', 'Raju Yadav', 'dholtasha@example.com', '+91 88901 54678', 'entertainment', 'hyderabad', 'Vanasthalipuram, Hyderabad', 'High-energy dhol and tasha percussion group for baraat processions, haldi ceremony and Sangeet nights. Groups of 6 to 30 performers.', 20000, 200000, 4.7, 88, 'approved', false),

-- ══════════════════════════════════════════════
-- PUNE — VENUES
-- ══════════════════════════════════════════════
('Corinthians Resort & Club', 'Aniket Kulkarni', 'corinthians@example.com', '+91 20234 65789', 'venues', 'pune', 'Nyati County, Pune', 'Premier resort venue in Pune with 9-hole golf course backdrop. Outdoor amphitheatre and 3 banquet halls — 100 to 3,000 guest capacity.', 300000, 3000000, 4.8, 78, 'approved', true),
('Westin Pune Koregaon Park', 'Shreya Joshi', 'westinpune@example.com', '+91 20456 76890', 'venues', 'pune', 'Koregaon Park, Pune', 'Contemporary luxury hotel with flowing indoor-outdoor event spaces. Signature ''Heavenly Bed'' bridal suites and renowned SPG chef-crafted menus.', 400000, 4000000, 4.7, 45, 'approved', true),
('The Mayfair Banquets', 'Prashant Deshpande', 'mayfairpune@example.com', '+91 98223 87901', 'venues', 'pune', 'Kothrud, Pune', 'Elegant mid-range wedding venue with Maharashtrian cultural aesthetics. Vastu-compliant mandap area, AC halls and on-site caterers.', 150000, 1200000, 4.6, 34, 'approved', false),
('Woodlands Garden Venue', 'Leena Sawant', 'woodlandspune@example.com', '+91 88012 98012', 'venues', 'pune', 'Bavdhan, Pune', 'Eco-resort style outdoor wedding venue with dense mango orchard backdrop. Perfect for intimate ceremonies — 50 to 500 guests with open-air mandap.', 80000, 800000, 4.5, 22, 'approved', false),

-- ══════════════════════════════════════════════
-- PUNE — CATERING
-- ══════════════════════════════════════════════
('Chitale Bandhu Caterers', 'Swapna Chitale', 'chitalecaterers@example.com', '+91 20678 09123', 'catering', 'pune', 'Deccan, Pune', 'Iconic Pune brand extending into wedding catering. Authentic Maharashtrian wedding menu with Puran Poli, Modak, Aamras and Ukadiche Modak stations.', 400, 1600, 4.8, 187, 'approved', true),
('Swaad Wedding Caterers', 'Mahesh Kale', 'swaadcatering@example.com', '+91 98201 10234', 'catering', 'pune', 'Hinjewadi, Pune', 'Multi-cuisine wedding caterers covering Maharashtrian, North Indian, Chinese and Continental. Corporate to royal wedding packages for 100–5,000 guests.', 500, 2500, 4.6, 112, 'approved', false),
('Pune Dawat', 'Naseem Ansari', 'punedawat@example.com', '+91 87410 21345', 'catering', 'pune', 'Camp, Pune', 'Muslim wedding specialists with authentic Awadhi, Hyderabadi and Kolhapuri menus. Famous for their Raan, Korma and Sheer Khurma at Walimas.', 550, 2800, 4.7, 76, 'approved', false),

-- ══════════════════════════════════════════════
-- PUNE — PHOTOGRAPHY
-- ══════════════════════════════════════════════
('Pune Wedding Stories', 'Abhijit Patil', 'punestories@example.com', '+91 98233 32456', 'photography', 'pune', 'Viman Nagar, Pune', 'Award-winning documentary wedding photography. Specialises in Maharashtrian ceremonies — Sakhar Puda, Antarpat and Saptapadi rituals beautifully captured.', 50000, 300000, 4.9, 156, 'approved', true),
('Deccan Frames', 'Smita Gaikwad', 'deccanframes@example.com', '+91 88012 43567', 'photography', 'pune', 'Aundh, Pune', 'Candid photography studio with a warm, earthy visual style. Pre-wedding shoots at Sinhagad Fort and Lavasa. 3 photographers per event.', 40000, 220000, 4.7, 98, 'approved', false),
('WedShoot Pune', 'Rahul Thorat', 'wedshootpune@example.com', '+91 77234 54678', 'photography', 'pune', 'Wakad, Pune', 'Young boutique studio known for vibrant editing and Instagram-worthy portraits. 4K short films and same-week delivery as standard.', 30000, 150000, 4.5, 134, 'approved', false),

-- ══════════════════════════════════════════════
-- PUNE — DECORATION
-- ══════════════════════════════════════════════
('Phool Mala Decors', 'Vaishali Nimbalkar', 'phooldecors@example.com', '+91 98120 65789', 'decoration', 'pune', 'Shivajinagar, Pune', 'Traditional and contemporary Maharashtrian wedding décor. Famous for Kelvan floral setups, marigold torans and traditional brass/copper elements.', 80000, 1000000, 4.8, 144, 'approved', true),
('Elite Wedding Decorators', 'Sandip Shinde', 'elitedecor@example.com', '+91 87890 76890', 'decoration', 'pune', 'Pimpri, Pune', 'End-to-end decoration services from mehndi to reception. Themes: Rajasthani royale, Garden English and Modern minimalist. LED video walls available.', 100000, 2000000, 4.6, 67, 'approved', false),

-- ══════════════════════════════════════════════
-- PUNE — ENTERTAINMENT
-- ══════════════════════════════════════════════
('Pune DJ Masters', 'DJ Kartik', 'punedjmasters@example.com', '+91 98432 87901', 'entertainment', 'pune', 'FC Road, Pune', 'Professional wedding DJ services with Void Acoustics sound rigs. Specialises in Marathi Lavani fusion for Sangeet nights and Bollywood sets for receptions.', 40000, 300000, 4.8, 112, 'approved', true),
('Lavani Troupes Pune', 'Asha Mohite', 'lavanipune@example.com', '+91 77890 98012', 'entertainment', 'pune', 'Kasba Peth, Pune', 'Traditional Lavani and Tamasha folk performances for Maharashtrian weddings. Group of 12 professional dancers with authentic nauvari sarees and dholki.', 30000, 200000, 4.9, 78, 'approved', false),
('Pune Halgi Pathak', 'Suresh Waghere', 'halgipathak@example.com', '+91 88123 09123', 'entertainment', 'pune', 'Hadapsar, Pune', 'Authentic Halgi Pathak (traditional Maharashtrian percussion) for auspicious ceremonies, Muhurta and baraat processions. Groups of 5–20 musicians.', 15000, 100000, 4.7, 44, 'approved', false);
