# Deployment Guide

## 1. Backend (Render)
**Service Type**: Web Service
**Root Directory**: `backend`
**Build Command**: `npm install`
**Start Command**: `node src/server.js`

### Environment Variables (Add these in Render Dashboard)
| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Optimizes for production |
| `MONGO_URI` | `...` | Your MongoDB Atlas connection string |
| `GROQ_API_KEY` | `...` | Your Groq AI API Key |
| `GROQ_MODEL` | `llama3-70b-8192` | (Optional) Model to use |
| `ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` | **IMPORTANT**: Update this after deploying frontend |

---

## 2. Frontend (Vercel)
**Framework Preset**: Vite
**Root Directory**: `.` (Root)
**Build Command**: `npm run build`
**Output Directory**: `dist`

### Environment Variables (Add these in Vercel Dashboard)
| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` | **IMPORTANT**: URL of your deployed Render backend |

---

## Deployment Order
1. **Deploy Backend** to Render first.
   - Wait for it to build.
   - Copy the "onrender.com" URL.
2. **Deploy Frontend** to Vercel.
   - Add `VITE_API_URL` with the backend URL (append `/api`).
3. **Update Backend**:
   - Go back to Render Dashboard > Environment.
   - Update `ALLOWED_ORIGINS` with your new Vercel frontend URL (e.g., `https://codefixer-ide.vercel.app`).
