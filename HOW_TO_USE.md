# 🚀 How to Use BugSage - Complete User Guide

## 📍 Quick Start - Access the Application

**Your application is already running!** Just open your browser:

- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:4000

---

## 🎯 How to Run the Project

### Option 1: Using Docker (Current Setup - Recommended)

**Start the application:**
```bash
cd /Users/sagarsoni/Downloads/BugSage-AI-main
docker-compose up -d
```

**Stop the application:**
```bash
docker-compose down
```

**View logs:**
```bash
docker-compose logs -f
```

**Restart:**
```bash
docker-compose restart
```

### Option 2: Run Locally (Without Docker)

**Terminal 1 - Start Backend:**
```bash
cd /Users/sagarsoni/Downloads/BugSage-AI-main/backend
npm install  # Only needed first time
npm run dev
```
Backend runs on: http://localhost:4000

**Terminal 2 - Start Frontend:**
```bash
cd /Users/sagarsoni/Downloads/BugSage-AI-main/frontend
npm install  # Only needed first time
npm run dev
```
Frontend runs on: http://localhost:3000

---

## 🎨 Using the Application Features

### 1. **Dashboard** 📊
- View bug analytics and statistics
- Interactive charts showing bug trends
- Recent bugs list
- Overview of bug statuses

**How to access:** Navigate to Dashboard from the main menu

### 2. **Report a Bug** 🐛
- Fill out a bug report form with:
  - **Title**: Brief description of the bug
  - **Description**: Detailed explanation
  - **Steps to Reproduce**: How to trigger the bug
  - **Expected vs Actual Behavior**
- **AI Features:**
  - Instant severity prediction (Low, Medium, High, Critical)
  - Estimated resolution time
  - Bug type classification
  - Duplicate detection

**How to use:**
1. Click "Report Bug" button
2. Fill in the form
3. AI will automatically analyze and provide predictions
4. Submit the bug report

### 3. **Bug List** 📋
- View all reported bugs
- Filter by status, severity, or type
- Search functionality
- Sort by date, severity, etc.

**How to access:** Navigate to "Bug List" from the menu

### 4. **Bug Details** 🔍
- View complete bug information
- See AI analysis and predictions
- View prediction history
- Update bug status
- Add comments/notes

**How to access:** Click on any bug from the Bug List

### 5. **AI Playground** 🤖
- Test all AI-powered features in one place
- Try different bug descriptions
- See AI predictions in real-time
- Experiment with:
  - Severity prediction
  - Resolution time estimation
  - Bug type classification
  - Duplicate detection
  - Summary generation

**How to access:** Navigate to "AI Playground" from the menu

### 6. **Analytics** 📈
- View detailed analytics and reports
- Bug trends over time
- Performance metrics
- Team productivity insights

**How to access:** Navigate to "Analytics" from the menu

### 7. **Settings** ⚙️
- Configure application settings
- Manage preferences
- Update profile information

**How to access:** Navigate to "Settings" from the menu

---

## 🔌 API Endpoints (Backend)

If you want to interact with the API directly:

### Health Check
```bash
curl http://localhost:4000/health
```
Response: `{"status":"ok"}`

### AI Predictions
```bash
curl -X POST http://localhost:4000/api/ai/predict \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Button not working",
    "description": "The submit button does not respond when clicked"
  }'
```

### Generate Summary
```bash
curl -X POST http://localhost:4000/api/ai/summary \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bug title",
    "description": "Bug description"
  }'
```

### Find Duplicates
```bash
curl -X POST http://localhost:4000/api/ai/duplicates \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bug title",
    "description": "Bug description"
  }'
```

---

## 🛠️ Development Commands

### Backend Commands
```bash
cd backend

npm run dev      # Start development server
npm test         # Run tests
npm run build    # Build for production
npm start        # Start production server
```

### Frontend Commands
```bash
cd frontend

npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
```

---

## 📝 Environment Variables

Make sure you have a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Replace `your_gemini_api_key_here` with your actual Gemini API key from:
https://makersuite.google.com/app/apikey

---

## 🐛 Troubleshooting

### Application not loading?
1. Check if containers are running:
   ```bash
   docker ps
   ```

2. Check logs for errors:
   ```bash
   docker-compose logs
   ```

3. Restart containers:
   ```bash
   docker-compose restart
   ```

### API not responding?
1. Check backend logs:
   ```bash
   docker-compose logs backend
   ```

2. Verify backend is running:
   ```bash
   curl http://localhost:4000/health
   ```

### Frontend not loading?
1. Check frontend logs:
   ```bash
   docker-compose logs frontend
   ```

2. Verify frontend is accessible:
   ```bash
   curl http://localhost:3000
   ```

### AI features not working?
1. Verify your `.env` file has the correct Gemini API key
2. Check backend logs for API errors
3. Make sure the API key is valid and has credits

---

## 🎓 Example Workflow

1. **Start the application:**
   ```bash
   docker-compose up -d
   ```

2. **Open browser:** http://localhost:3000

3. **Report a bug:**
   - Click "Report Bug"
   - Fill in bug details
   - AI will analyze and provide predictions
   - Submit the bug

4. **View bugs:**
   - Go to "Bug List" to see all bugs
   - Click on a bug to see details

5. **Use AI Playground:**
   - Go to "AI Playground"
   - Test different bug descriptions
   - See AI predictions in real-time

6. **Check Analytics:**
   - Go to "Analytics" to see trends
   - View bug statistics

---

## 📚 Next Steps

1. ✅ Application is running at http://localhost:3000
2. ✅ Explore the Dashboard
3. ✅ Report your first bug
4. ✅ Try the AI Playground
5. ✅ Check out Analytics

---

## 💡 Tips

- **Dark Mode**: The app supports dark mode - toggle it in settings
- **Responsive**: Works on desktop, tablet, and mobile
- **Real-time**: AI predictions happen instantly
- **Search**: Use search functionality to find bugs quickly
- **Filters**: Use filters to narrow down bug lists

---

**Happy Bug Tracking! 🐛✨**

