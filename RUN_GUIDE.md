# 🚀 BugSage - How to Run the Project

Complete guide to get BugSage up and running on your machine.

---

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js 20.x or higher**
   - Download from: https://nodejs.org/
   - Verify: `node -v` (should show v20.x.x or higher)

2. **Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop/
   - Verify: `docker --version` and `docker-compose --version`

3. **Gemini API Key**
   - Get from: https://makersuite.google.com/app/apikey
   - Keep it ready for the `.env` file

---

## 🛠️ Step-by-Step Setup

### Step 1: Clone or Download the Project
```bash
git clone https://github.com/Adityism/BugSage-AI.git
cd BugSage-AI
```

### Step 2: Setup (Ubuntu / EC2)
We have a dedicated deployment script for Ubuntu/EC2 that installs Docker and starts the app.

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```
Follow the prompts to enter your `GEMINI_API_KEY`.

### Step 3: Verify Services
Dependencies will be installed and services started automatically.
Run `docker ps` to confirm.

### Step 4: Access the Application
- **Frontend**: http://YOUR_EC2_IP:3000
- **Backend**: http://YOUR_EC2_IP:4000

---

## 💻 Local Development (Linux/Mac)
If you are running locally for development:

```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```
This script acts like the old Windows `start.bat`, checking Node/NPM, copying envs, and starting dev servers.

---

## 🔄 Running Without Docker (Development Mode)

If you prefer to run without Docker:

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on: http://localhost:4000

### Frontend Setup (New Terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:3000 (or port Vite assigns)

**Note:** Make sure `.env` file is in the project root for backend to access `GEMINI_API_KEY`.

---

## 📝 Environment Variables

The `.env` file should contain:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Security Note:** Never commit `.env` file to git. It's already in `.gitignore`.

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Docker Desktop is running
- [ ] `.env` file exists with `GEMINI_API_KEY`
- [ ] Both containers are running (`docker ps`)
- [ ] Frontend accessible at http://localhost:3000
- [ ] Backend health check works: http://localhost:4000/health
- [ ] Can navigate between pages
- [ ] Can report a bug
- [ ] AI Playground buttons work

---

## 🎓 Quick Start Summary

```bash
# 1. Navigate to project
cd BugSage-AI-main

# 2. Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Start services
docker-compose up -d --build

# 4. Open browser
# http://localhost:3000
```

---

## 📚 Additional Resources

- **Project README**: See `README.md` for more details
- **API Documentation**: Backend API runs on http://localhost:4000
- **Health Check**: http://localhost:4000/health

---

## 💡 Tips

- **First Build**: Takes 5-10 minutes, be patient
- **Subsequent Starts**: Much faster (uses cached images)
- **View Logs**: Use `docker-compose logs -f` to see what's happening
- **Stop Everything**: `docker-compose down` when done
- **Clean Start**: `docker-compose down -v` removes volumes too

---

**Happy Bug Tracking! 🐛✨**

For issues or questions, check the logs first: `docker-compose logs`

