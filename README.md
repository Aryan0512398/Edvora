# 📚 Edvora – AI-Powered Learning Platform
**[Live Demo →](https://edvora-chi-gules.vercel.app/)**  
**[GitHub Repo →](https://github.com/Aryan0512398/Edvora)**


Edvora is a modern AI-powered learning platform that allows users to generate personalized courses using AI, track their progress, and even integrate YouTube content. Built using **Next.js 15**, **ShadCN UI**, **Clerk for Auth**, **PostgreSQL (Neon)**, and **Stripe** for billing.

## 🚀 Features

- 🔐 Authentication with Clerk (Sign In/Up, Protected Routes)
- 🤖 AI-based course generation
- 📺 YouTube integration per lesson
- ✅ Progress tracking and dashboard
- 💳 Stripe-based subscription payments
- 📩 Contact form with Resend email integration
- 🌐 Responsive, animated UI with Framer Motion + ShadCN

---

## 🧠 Tech Stack

| Feature           | Tech                                   |
|------------------|----------------------------------------|
| Frontend         | Next.js 14, React, Tailwind CSS        |
| UI Components    | ShadCN UI, Lucide Icons                |
| Auth             | Clerk.dev                              |
| Database         | PostgreSQL (Neon)                      |
| ORM              | Drizzle ORM                            |
| Payments         | Stripe                                 |
| Emails           | Resend (Transactional)                 |
| Deployment       | Vercel                                 |

---
# 📦 Getting Started
## 🗃️ Database Setup (Neon + Drizzle)

1. Create a project on [Neon](https://neon.tech).
2. Copy your database URL.
3. Update `.env` file:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>/<db_name>
```
## 🚀 Getting Started with Edvora
```bash
git clone https://github.com/Aryan0512398/Edvora.git
cd Edvora
npm install
```
Create a `.env.local` file in the root with the following:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# PostgreSQL (Neon Database)
DATABASE_URL=your_neon_postgres_url

# Google Gemini API (for AI course generation)
GEMINI_API_KEY=your_gemini_api_key

# AI Image Generator (optional for future use)
AI_IMAGE_API=your_image_api_key

# YouTube API (for video-based lessons)
YOUTUBE_API_KEY=your_youtube_data_api_key

# Resend Email Service (for contact form)
RESEND_API_KEY=your_resend_api_key
TO_EMAIL=your_verified_domain_email@example.com
```

> ⚠️ Never commit your `.env.local` to Git.

Then run the app locally:

```bash
npm run dev
```
Visit http://localhost:3000 to explore Edvora.

🧠 Future Tasks
 -🎨 AI Tools page (coming soon)
-🧩 Quiz Generation — auto-generate quizzes from course content using AI- 
-🎓 Certificate Generator — award learners with custom course completion certificates
- 👥 Team collaboration support
-🧾 Downloadable Reports — progress and performance exports in PDF/CSV
Deployed on **Vercel**: https://penny-path-flax.vercel.app

Made with ❤️ by [Aryan0512398](https://github.com/Aryan0512398/Edvora)

