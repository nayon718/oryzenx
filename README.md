# 🚀 Oryzenx - Premium Domain Marketplace

> A fully dynamic, professional SaaS platform for premium domain trading with integrated blog system, secure payments, and comprehensive admin dashboard.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6.svg)

## 🌟 Features

### 📱 User Experience
- **Mobile-First Design**: Native app-like experience on mobile devices with sticky bottom navigation
- **Responsive Desktop**: Premium SaaS-style layout for desktop users
- **Light Mode Only**: Clean, modern interface optimized for readability
- **Glassmorphism Cards**: Modern frosted glass UI components throughout
- **Smooth Animations**: Page transitions, loading animations, and interactive elements
- **Fast Loading**: Optimized performance with image compression and lazy loading

### 🌐 Core Modules

#### Domain Marketplace
- Browse 5000+ premium domains
- Filter by price, quality badge, and rating
- Make offers with minimum $150 validation
- Real-time domain availability
- Quality badges: Excellent, Good, Average, Basic
- 5-star rating system

#### Blog System
- Multi-language support (English & Bangla)
- Rich text editor with emoji support
- Auto image compression (MB → KB)
- Category filtering
- Relative time display ("2 hours ago")
- Love/reaction system
- View counter
- Author profiles

#### Advanced Search
- Instant dynamic search results
- Search across domains, posts, categories, keywords, and content
- Debounced search for performance
- Real-time filtering

#### Services Page
- Web Development
- App Development
- UI/UX Design
- Hosting Solutions
- Domain Solutions
- Tech Consulting
- Digital Marketing

#### Contact System
- Company information display
- Contact form with validation
- Animated partner logos (Namecheap, GoDaddy, etc.)
- Message management dashboard

### 👤 User Authentication
- **Signup** with Name, Email, Address, Password
- **Login** with Email and Password
- **Forgot Password** with admin notification system
- JWT-based authentication
- Password hashing with bcryptjs
- User profile management

### 💰 Payment System
- **Cryptocurrency Only** (Secure & Transparent)
- Supported Wallets:
  - USDT BEP20: `0x79395cbf73a98c48bfa53480d16cd5b428b5aff9`
  - TRX/TRC20: `TLKZgeHU45vMuZcHeEHQ95GZQ2UhB3cfxV`
- QR code for easy wallet scanning
- Auto image compression for payment proof
- Payment status tracking (Pending, Approved, Rejected)
- Transaction history

### 🔔 Notification System
- Real-time notifications
- Notification center in header
- Filter notifications by user email
- Individual and batch notifications
- Relative time stamps
- Notification types: New posts, new domains, offers, admin alerts

### 👥 User Profile
- Profile information display
- Edit profile functionality
- Offer history
- Payment history
- Account details
- My offers dashboard
- Transaction records

### 🛡️ Admin Dashboard

#### Domain Management
- Add/Edit/Delete domains
- Set prices and asking prices
- Manage quality badges
- Star ratings
- Bulk operations

#### Blog Management
- Create/Edit/Delete posts
- Image upload with auto-compression
- Multi-language support
- Rich text editor
- Category management
- Publish/Unpublish control

#### Offer Management
- View all offers
- Accept/Reject offers
- Filter by status
- Email notifications
- Offer analytics

#### Payment Management
- Approve/Reject payments
- View payment proofs
- Transaction history
- Payment analytics
- Cryptocurrency wallet management

#### User Management
- View all users
- User statistics
- Activity logs
- Role management
- Account status control

#### Notification Management
- Send push notifications
- Filter by user email
- Schedule notifications
- View notification history
- Analytics

#### Additional Admin Features
- Forgot Password requests management
- Contact messages inbox
- Website settings (SEO, logo, menu)
- Partner logos management
- Backup & restore functionality
- Activity logs
- Analytics dashboard

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.3
- **UI Components**: Glassmorphism, Font Awesome Icons
- **State Management**: Zustand + React Context
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Toast Notifications**: React Hot Toast
- **Rich Text**: React Quill
- **QR Codes**: qrcode.react

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB (ready for integration)
- **Authentication**: JWT with bcryptjs
- **File Upload**: Sharp for image compression
- **Validation**: Built-in form validation

### DevOps & Deployment
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Build Tool**: Next.js SWC
- **Environment**: Docker-ready

## 📦 Installation

### Prerequisites
```bash
Node.js >= 16.x
npm >= 8.x or yarn >= 3.x
Git
```

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/nayon718/oryzenx.git
cd oryzenx
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and update:
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/oryzenx
DATABASE_NAME=oryzenx

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRY=7d

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
API_SECRET=your_api_secret_key

# Admin
ADMIN_EMAIL=admin@oryzenx.com
ADMIN_PASSWORD=secure_password_here

# Image Settings
IMAGE_QUALITY=80
IMAGE_MAX_WIDTH=1200
IMAGE_MAX_HEIGHT=1200
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables
   - Click "Deploy"

### Docker

1. **Build Docker image**
```bash
docker build -t oryzenx:latest .
```

2. **Run container**
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI="your_uri" \
  -e JWT_SECRET="your_secret" \
  oryzenx:latest
```

### Traditional Server (Ubuntu/Debian)

1. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Clone and setup**
```bash
git clone https://github.com/nayon718/oryzenx.git
cd oryzenx
npm install
npm run build
```

3. **Start with PM2**
```bash
npm install -g pm2
pm2 start "npm start" --name oryzenx
pm2 startup
pm2 save
```

## 📁 Project Structure

```
oryzenx/
├── src/
│   ├── api/
│   │   ├── client.ts              # Axios instance
│   │   ├── middleware/
│   │   │   └── auth.ts            # JWT verification
│   │   ├── domains.ts             # Domain API
│   │   ├── blog.ts                # Blog API
│   │   ├── offers.ts              # Offer API
│   │   ├── payments.ts            # Payment API
│   │   ├── notifications.ts       # Notification API
│   │   ├── upload.ts              # File upload API
│   │   └── index.ts               # Exports
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Header.tsx         # Sticky header
│   │   │   ├── Footer.tsx         # Footer
│   │   │   ├── Layout.tsx         # Main layout
│   │   │   ├── MobileBottomNav.tsx # Mobile navigation
│   │   │   ├── Loading.tsx        # Loading spinner
│   │   │   ├── GlassCard.tsx      # Glassmorphism card
│   │   ├── domains/
│   │   │   ├── DomainCard.tsx     # Domain listing card
│   │   │   └── OfferModal.tsx     # Offer submission modal
│   │   └── blog/
│   │       └── BlogCard.tsx       # Blog post card
│   ├── contexts/
│   │   └── AuthContext.tsx        # Auth provider & hooks
│   ├── hooks/
│   │   └── index.ts               # Custom hooks
│   ├── pages/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts
│   │   │   │   ├── signup.ts
│   │   │   │   └── forgot-password.ts
│   │   │   ├── domains/
│   │   │   │   └── index.ts
│   │   │   ├── blog/
│   │   │   │   └── index.ts
│   │   │   ├── offers/
│   │   │   │   └── index.ts
│   │   │   ├── payments/
│   │   │   │   └── index.ts
│   │   │   ├── contact.ts
│   │   │   └── notifications/
│   │   │       └── index.ts
│   │   ├── _app.tsx               # App wrapper
│   │   ├── _document.tsx          # HTML document
│   │   ├── index.tsx              # Home page
│   │   ├── domains.tsx            # Domains listing
│   │   ├── blog.tsx               # Blog listing
│   │   ├── search.tsx             # Search page
│   │   ├── services.tsx           # Services page
│   │   ├── contact.tsx            # Contact page
│   │   ├── login.tsx              # Login page
│   │   ├── signup.tsx             # Signup page
│   │   ├── forgot-password.tsx    # Password reset
│   │   ├── profile.tsx            # User profile
│   │   └── admin/
│   │       ├── index.tsx          # Admin dashboard
│   │       ├── domains.tsx        # Domain management
│   │       ├── blog.tsx           # Blog management
│   │       ├── offers.tsx         # Offer management
│   │       ├── payments.tsx       # Payment management
│   │       ├── notifications.tsx  # Notification management
│   │       ├── users.tsx          # User management
│   │       ├── settings.tsx       # Website settings
│   │       └── contact-messages.tsx
│   ├── store/
│   │   └── index.ts               # Zustand store
│   ├── styles/
│   │   └── globals.css            # Global styles
│   └── types/
│       ├── index.ts               # Type definitions
│       └── next.d.ts              # Next.js types
├── public/
│   ├── favicon.ico
│   └── images/
├── .env.example                   # Environment template
├── .gitignore
├── next.config.js
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🎨 UI/UX Highlights

- **Glassmorphism Design**: Modern frosted glass effects throughout
- **Smooth Animations**: Page transitions, hover effects, and loading states
- **Mobile Optimization**: Native app-like experience with bottom navigation
- **Accessibility**: WCAG compliant with proper color contrast
- **Performance**: Image optimization, lazy loading, code splitting
- **Responsive**: Works seamlessly on all device sizes
- **Dark Mode Ready**: Foundation for dark mode implementation

## 🔒 Security Features

- JWT authentication with secure tokens
- Password hashing with bcryptjs
- CORS protection
- Input validation on client and server
- Secure crypto payment integration
- Admin role-based access control
- Environment variable protection
- SQL injection prevention (when using database)

## 📊 Admin Dashboard Capabilities

### Analytics
- Total domains count
- Active users count
- Pending offers
- Recent transactions
- User activity logs
- Payment statistics

### Management
- Full CRUD operations on all resources
- Bulk actions support
- Advanced filtering
- Search functionality
- Export capabilities (ready to implement)
- Audit logs

## 🚀 Performance Optimization

- Next.js SWC for fast compilation
- Image optimization with Sharp
- Lazy loading for images
- Code splitting
- CSS minification
- Dynamic imports
- Caching strategies
- Debounced search

## 📱 Mobile Features

- Bottom sticky navigation (Domains, Blog, Search, Services, Contact)
- Touch-optimized buttons and inputs
- Responsive grid layouts
- Mobile-first CSS
- Native-like transitions
- Optimized for small screens

## 🔧 API Documentation

### Authentication
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "password": "password123"
}
```

### Domains
```bash
GET /api/domains?page=1&limit=20
GET /api/domains?q=search_term
POST /api/domains (admin only)
PUT /api/domains/:id (admin only)
DELETE /api/domains/:id (admin only)
```

### Offers
```bash
POST /api/offers
{
  "domainId": "domain_id",
  "offerPrice": 500
}

GET /api/offers
```

### Payments
```bash
POST /api/payments
{
  "offerId": "offer_id",
  "amount": 500,
  "currency": "USDT",
  "proofImage": "base64_or_url"
}

GET /api/payments
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Email**: support@oryzenx.com
- **Website**: https://oryzenx.com
- **GitHub Issues**: [Report a bug](https://github.com/nayon718/oryzenx/issues)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first CSS
- Font Awesome for beautiful icons
- All contributors and supporters

## 📈 Roadmap

- [ ] MongoDB integration
- [ ] Email notifications
- [ ] Push notifications (FCM)
- [ ] Dark mode
- [ ] Advanced analytics
- [ ] API rate limiting
- [ ] Two-factor authentication
- [ ] WebSocket for real-time updates
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)

---

**Made with ❤️ by the Oryzenx Team**

*Last Updated: 2026-06-19*
