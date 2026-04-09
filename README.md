<div align="center">

# 🎵 Music Rental Hub

**Rent premium musical instruments — by the day or week.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5-orange)](https://zustand-demo.pmnd.rs/)

[Live Demo](#) · [Report Bug](https://github.com/Sid1458/music-rental-hub/issues) · [Request Feature](https://github.com/Sid1458/music-rental-hub/issues)

</div>

---

## 📖 About

**Music Rental Hub** is a modern web platform where musicians, event organizers, and singers can browse and rent musical instruments (guitars, drums, keyboards, and more) for a day or a week at affordable prices.

This project is currently **frontend-only**, built with a clean architecture that is fully ready for backend/API integration.

---

## ✨ Features

- 🏠 **Landing Page** — Hero section, stats, how-it-works, and featured instruments
- 🎸 **Instrument Catalog** — Browse all instruments with category filtering
- 📅 **Booking System** — Full booking form with instrument selection, duration, date, and live price calculation
- 🔐 **Login Page** — Clean auth UI (ready for backend integration)
- 📱 **Fully Responsive** — Mobile-first design with hamburger menu
- 🎨 **Modern UI/UX** — Dark theme, glassmorphism, gradient accents, micro-animations
- 🗃️ **State Management** — Zustand for global state (booking form, cart, UI)
- 🧩 **Reusable Components** — Navbar, Footer, InstrumentCard, BookingForm

---

## 🛠️ Tech Stack

| Layer            | Technology        |
|------------------|-------------------|
| Framework        | Next.js 16 (App Router) |
| Language         | TypeScript        |
| Styling          | Tailwind CSS 4    |
| State Management | Zustand           |
| Font             | Inter (Google Fonts) |

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── instruments/          # Instrument images
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home / Landing page
│   │   ├── instruments/
│   │   │   └── page.tsx      # Instruments catalog
│   │   ├── booking/
│   │   │   └── page.tsx      # Booking page
│   │   ├── login/
│   │   │   └── page.tsx      # Login page (UI only)
│   │   ├── layout.tsx        # Root layout (Navbar + Footer)
│   │   └── globals.css       # Global styles + custom animations
│   ├── components/
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── InstrumentCard.tsx# Instrument display card
│   │   ├── BookingForm.tsx   # Booking form with validation
│   │   └── Footer.tsx        # Site footer
│   └── lib/
│       ├── data.ts           # Mock data + TypeScript types
│       └── store.ts          # Zustand global store
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Sid1458/music-rental-hub.git
cd music-rental-hub/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📸 Pages Overview

| Page         | Route           | Description                              |
|--------------|-----------------|------------------------------------------|
| Home         | `/`             | Hero, stats, how-it-works, featured instruments |
| Instruments  | `/instruments`  | Full catalog with category filtering     |
| Booking      | `/booking`      | Rental booking form with price calculator |
| Login        | `/login`        | Authentication UI (no backend yet)       |

---

## 🔮 Roadmap

- [x] Frontend — Next.js + TypeScript + Tailwind CSS
- [x] State Management — Zustand
- [x] Responsive Design
- [x] Mock Data Layer
- [ ] Backend API (Node.js / Express / Prisma)
- [ ] Database Integration (PostgreSQL / MongoDB)
- [ ] Authentication (NextAuth.js)
- [ ] Payment Gateway (Stripe / Razorpay)

- [ ] Admin Dashboard
- [ ] Email Notifications
- [ ] Deployment (Vercel / AWS)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Sid1458](https://github.com/Sid1458)**

</div>
