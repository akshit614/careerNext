# 📚 CareerNext — Interview, Resume, and Career Growth Companion

Welcome to **CareerNext**, your all-in-one solution designed to help students, freshers, and working professionals prepare for tech industry roles.

✨ Get ready for interviews, build impressive resumes and cover letters, sharpen your skills with quizzes, and unlock industry insights — all powered by modern web technologies and smart AI features.

---

## 🚀 Features

### 📋 Onboarding & Dashboard
- Based on your **personalized onboarding form**, a **customized dashboard** shows insights about your industry and career.

### 🎯 Interview Preparation
- Access **AI-generated quizzes** tailored to your industry.
- Get **instant quiz results** along with **personalized improvement tips** after each attempt.

### 📄 Resume Creator
- Build a **professional resume** effortlessly by filling a simple form with your details.
- Download or use your resume for job applications right away.

### ✉️ Cover Letter Generator
- Quickly generate a **customized cover letter** by providing job details.
- Perfect for making a strong first impression on employers!

### 🔐 Authentication
- **Secure user authentication** and registration using [Clerk](https://clerk.dev/).
- Smooth sign-up, sign-in, and profile management experience.

### 🔄 Weekly Industry Insights
- Stay updated with **automated weekly industry insights** powered by [Inngest](https://www.inngest.com/).
- Keep track of trends, technologies, and opportunities in your field.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| [Next.js](https://nextjs.org/) | Full-stack React framework (pages, APIs) |
| [PostgreSQL](https://www.postgresql.org/) | Relational database to store user data, resumes, quizzes |
| [Prisma ORM](https://www.prisma.io/) | Type-safe database ORM for PostgreSQL |
| [Tailwind CSS](https://tailwindcss.com/) | Rapid and beautiful frontend styling |
| [shadcn/ui](https://ui.shadcn.dev/) | Beautiful pre-built UI components |
| [Clerk](https://clerk.dev/) | Authentication and user management |
| [Inngest](https://www.inngest.com/) | Event-driven background jobs (weekly insights refresh) |
| [Gemini]| AI-generated quizzes and content (cover letters, resumes) |

---

## 🛡️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/akshit614/carrier-next.git

# 2. Navigate into the directory
cd carrier-next

# 3. Install dependencies
npm install

# 4. Setup environment variables
# Create a .env file and add necessary keys (PostgreSQL DB URL, Clerk keys, OpenAI keys, etc.)

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📈 Roadmap

- [x] User Onboarding & Dashboard
- [x] AI Interview Quiz Generator
- [x] Resume Creation Tool
- [x] Cover Letter Generator
- [x] Clerk Authentication Integration
- [x] Weekly Industry Insights Automation
