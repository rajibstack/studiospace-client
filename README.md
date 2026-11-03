# StudioSpace 🎬

**StudioSpace** is a modern, peer-to-peer (P2P) creative workspace sharing platform built for creators, photographers, musicians, and podcasters to rent, explore, and manage professional studio spaces effortlessly.

---

## 🚀 Live Demo & Repository

- **Frontend Repository:** `https://github.com/your-username/studiospace-client`
- **Backend Repository:** `https://github.com/your-username/studiospace-server`

---

## ✨ Key Features

- **🔐 Secure Authentication (HTTPOnly Cookies & JWT):** Fully secured authentication flow using JSON Web Tokens stored safely inside HTTPOnly cookies to prevent XSS and security vulnerabilities.
- **🏠 Studio Space Management:**
  - **Explore Studios:** Filter and search through various studio categories, locations, and pricing.
  - **Studio Details:** View complete information, photos, amenities, and host details.
  - **Add New Studio:** Creators and space owners can easily list their studios with photos, pricing, and specs.
  - **My Studio Listings:** Space owners can update, edit, or remove their posted studios.
- **📅 Double-Booking Prevention & Booking System:**
  - Prevents overlapping reservations for the same studio on the same date.
  - Interactive booking modal for selecting dates and time slots.
  - Track booking states: `Pending`, `Confirmed`, `Completed`, and `Cancelled`.
- **📄 PDF Booking Invoice Generator:** 
  - Downloadable PDF receipts for confirmed studio bookings generated directly on the client side using `jsPDF`.
- **❤️ Saved Studios Wishlist:** 
  - Logged-in users can bookmark their favorite studio spaces, saved directly into MongoDB.
- **🌓 Global Light/Dark Theme:** 
  - Built-in theme switcher integrated seamlessly into the navigation header with persistent user preferences (`localStorage`).
- **📱 Fully Responsive Design & Active Link Highlighting:** 
  - Mobile-friendly user interface with active menu route indicators, skeleton loading UI, and user profile management.

---

## 🛠️ Tech Stack & Technologies

### **Frontend**
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **PDF Generation:** jsPDF
- **Notifications:** Sonner Toast

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Security:** JSON Web Token (JWT), Cookie-Parser, CORS

---

## 📂 Project Structure

```text
studiospace-client/
├── public/                 # Static assets (Favicon/Icon, logos)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── add-studio/     # Add new studio space page
│   │   ├── dashboard/      # User dashboard overview
│   │   ├── my-bookings/    # User bookings list & PDF invoice generator
│   │   ├── my-listings/    # Owner studio listings page
│   │   ├── studios/        # Explore & filter studios page
│   │   ├── layout.js       # Root layout & global metadata
│   │   └── page.js         # Homepage
│   ├── components/         # Reusable UI components (Navbar, ThemeToggle, etc.)
│   ├── context/            # Authentication context (AuthContext.js)
│   └── styles/             # Global CSS setup (@tailwindcss v4 configuration)
└── package.json
```

---

## ⚡ Getting Started (Local Setup)

### **Prerequisites**
Make sure you have Node.js and npm installed on your machine.

### **1. Clone the repository**
```bash
git clone https://github.com/your-username/studiospace-client.git
cd studiospace-client
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in the root of the project and add your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### **4. Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).