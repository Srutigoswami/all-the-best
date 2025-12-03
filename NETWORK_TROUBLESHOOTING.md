# Network Troubleshooting Guide

## Current Issue
Your network is blocking access to `npmjs.org` (npm registry), which prevents installing dependencies.

**Error:** `403 registrynpmjsblockpage - GET https://registry.npmjs.org/`

## Solutions

### Solution 1: Use a Different Network (Recommended)
1. **Switch to a different network:**
   - Use your home WiFi (if not on corporate network)
   - Use mobile hotspot
   - Use a different network that doesn't block npm

2. **Then run:**
   ```bash
   cd /Users/sagarsoni/Downloads/BugSage-AI-main/backend
   npm install
   
   cd ../frontend
   npm install
   
   # Then run the project
   cd ..
   # Backend (Terminal 1)
   cd backend && npm run dev
   
   # Frontend (Terminal 2)
   cd frontend && npm run dev
   ```

### Solution 2: Use VPN
If you're on a corporate network:
1. Connect to a VPN that allows npm access
2. Then try installing dependencies again

### Solution 3: Contact IT Department
If you're on a corporate network, ask IT to:
- Whitelist `registry.npmjs.org`
- Allow access to npm packages
- Provide proxy settings if needed

### Solution 4: Use npm Mirror (If Available)
Some organizations provide internal npm mirrors. Ask your IT team if one exists:

```bash
npm config set registry https://your-internal-mirror-url/
```

### Solution 5: Pre-install Dependencies Elsewhere
1. Install dependencies on a network that works
2. Copy `node_modules` folders to this machine
3. Run the project locally

---

## Once Network Issues Are Resolved

### Quick Start (Local Development)

1. **Install Dependencies:**
   ```bash
   cd /Users/sagarsoni/Downloads/BugSage-AI-main
   
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Create .env file** (if not already created):
   ```bash
   cd /Users/sagarsoni/Downloads/BugSage-AI-main
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```

3. **Run the Project:**
   
   **Terminal 1 - Backend:**
   ```bash
   cd /Users/sagarsoni/Downloads/BugSage-AI-main/backend
   npm run dev
   ```
   Backend will run on: http://localhost:4000
   
   **Terminal 2 - Frontend:**
   ```bash
   cd /Users/sagarsoni/Downloads/BugSage-AI-main/frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:3000 (or the port Vite assigns)

4. **Open in Browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

---

## Why Docker Also Fails
Docker builds also fail because:
- Docker containers use the same network as your host machine
- If npmjs.org is blocked on your network, Docker can't access it either
- The 403 error means the network is actively blocking npm registry access

---

## Summary
**The root cause:** Your network (likely corporate firewall) is blocking access to npmjs.org.

**Best solution:** Switch to a network that allows npm access (home WiFi, mobile hotspot, or VPN), then install dependencies and run the project locally without Docker.

Once dependencies are installed, you can run the project locally with `npm run dev` in both backend and frontend directories.

