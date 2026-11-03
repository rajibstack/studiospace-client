# StudioSpace — Creative Workspace Sharing Platform

A peer-to-peer workspace sharing marketplace web application connecting creators and professionals with premium production spaces, recording suites, and creative studios.

---

## 🚀 Live Demo & Repository

- **Frontend Repository:** `https://github.com/your-username/studiospace-client`
- **Backend Repository:** `https://github.com/your-username/studiospace-server`

---

## ✨ Key Features

- \*\* Peer-to-Peer Studio Exploration & Booking: Browse diverse creative workspaces, filter by categories, and book sessions seamlessly with real-time collision checks preventing double bookings.
- \*\* Secure Authentication: Robust user authentication system powered by JWT with secure, HTTPOnly cookies for safe session management.
- \*\* Downloadable PDF Invoice Generator: Built-in jsPDF integration allowing users to download professional, formatted booking receipts directly from their dashboard.
- \*\* Saved Studios Wishlist: Interactive wishlist functionality allowing logged-in users to save and manage their favorite creative spaces.
- \*\* Dynamic Dark/Light Mode Theme: Fully customizable global theme toggle built with modern Tailwind CSS v4 custom variants.

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

Create a `.env` in the root of the server folder and add your environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### **4. Run Development Server**

```bash
npm run dev
```

### **Setup and Run the Client Application**

cd studiospace-client
npm install

### **Create a .env.local file in the root of the client folder and add your API URL:**

NEXT_PUBLIC_API_URL=http://localhost:5000

### **4. Run Development Server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

### **Examiner Test Credentials**

You can use the following test account credentials to log in and evaluate the platform features (such as booking management, wishlists, and invoice generation):

Email: test@gmail.com
Password: Test1234@ (Or use Google/Email Authentication configured in the app)
