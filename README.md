# CodeFixer IDE

A modern, AI-powered code debugging IDE that helps developers analyze, fix, and optimize their code using advanced AI models.

## Features

- 🎯 **AI-Powered Code Analysis**: Explain, fix, and optimize code using Groq's deepseek-r1-distill-llama-70b model
- 🌙 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- 💻 **Monaco Editor**: Professional code editor with syntax highlighting for 10+ languages
- 📊 **Real-time Results**: Instant AI-powered feedback with loading states and error handling
- 🔄 **Split Panel Layout**: Side-by-side code editor and results panel
- 💾 **Interaction Logging**: MongoDB integration for tracking all code analysis sessions
- 🚀 **Modern UI**: Clean, responsive design built with React and Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Groq API** integration
- **Rate limiting** and security middleware

## Prerequisites

Before running the application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or remotely)
- **Groq API Key** (free tier available)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd codefixer-ide
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Set Up Environment Variables

#### Backend Environment
Copy the example environment file and configure it:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/codefixer

# Groq API Configuration
GROQ_API_KEY=your_actual_groq_api_key_here
GROQ_MODEL=deepseek-r1-distill-llama-70b

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

#### Frontend Environment (Optional)
Create a `.env` file in the root directory if you need to customize the API URL:

```env
VITE_API_URL=http://localhost:3001
```

## Getting Your Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and paste it in your `backend/.env` file

The free tier includes:
- 14,400 requests per day
- Rate limit: 30 requests per minute
- Access to various open-source models including deepseek-r1-distill-llama-70b

## Running the Application

### Option 1: Run Both Services Simultaneously

```bash
npm run dev:full
```

This will start both the frontend (port 5173) and backend (port 3001) servers.

### Option 2: Run Services Separately

#### Start the Backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3001`

#### Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## MongoDB Setup

### Local MongoDB Installation

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Windows
1. Download MongoDB Community Server from the official website
2. Run the installer and follow the setup wizard
3. Start MongoDB service from Services manager

### Verify MongoDB Connection

```bash
# Connect to MongoDB shell
mongosh

# Check if the database is created
show dbs

# Switch to the codefixer database
use codefixer

# Check collections (after running the app)
show collections
```

## API Endpoints

### POST /api/analyze

Analyzes code using AI and returns results.

**Request Body:**
```json
{
  "code": "console.log('Hello, World!');",
  "operation": "explain"
}
```

**Response:**
```json
{
  "aiResponse": "This JavaScript code uses the console.log() function...",
  "timestamp": "2024-01-20T12:00:00.000Z",
  "responseTime": 1250
}
```

**Operations:**
- `explain`: Get detailed explanation of code functionality
- `fix`: Identify and fix bugs or issues
- `optimize`: Improve code performance and efficiency

### GET /health

Health check endpoint for monitoring server status.

## Project Structure

```
codefixer-ide/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ActionButtons.tsx     # Analysis operation buttons
│   │   ├── CodeEditor.tsx        # Monaco editor component
│   │   ├── Header.tsx            # App header with theme toggle
│   │   └── ResultsPanel.tsx      # AI results display
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTheme.ts          # Theme management
│   │   └── useLocalStorage.ts   # Local storage utility
│   ├── services/                 # API integration
│   │   └── api.ts               # Axios API client
│   ├── types/                    # TypeScript definitions
│   │   └── index.ts             # Shared type definitions
│   ├── App.tsx                   # Main App component
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles
├── backend/                      # Backend source code
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # MongoDB connection
│   │   ├── controllers/
│   │   │   └── analyzeController.js  # Analysis logic
│   │   ├── middleware/
│   │   │   └── errorHandler.js   # Error handling
│   │   ├── models/
│   │   │   └── CodeAnalysis.js   # MongoDB schema
│   │   ├── routes/
│   │   │   └── analyze.js        # API routes
│   │   └── server.js             # Express server
│   ├── .env.example              # Environment template
│   └── package.json              # Backend dependencies
├── README.md                     # This file
└── package.json                  # Frontend dependencies
```

## Features in Detail

### Code Editor
- **Monaco Editor**: Same editor used in VS Code
- **Multi-language Support**: JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby
- **Syntax Highlighting**: Automatic language detection and highlighting
- **Code Statistics**: Real-time line and character count

### AI Operations
- **Explain Code**: Get detailed explanations of code functionality, logic, and patterns
- **Fix Code**: Identify bugs, errors, and issues with corrected versions
- **Optimize Code**: Performance improvements and efficiency recommendations

### User Experience
- **Theme Persistence**: Dark/light mode preference saved locally
- **Code Persistence**: Your code is automatically saved as you type
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Friendly error messages with retry options
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Data Logging
All interactions are logged to MongoDB including:
- Original code and operation type
- AI response and processing time
- User metadata (IP, user agent)
- Success/failure status and error messages

## Troubleshooting

### Common Issues

#### Backend won't start
- **Check MongoDB**: Ensure MongoDB is running locally
- **Environment Variables**: Verify all required env vars are set
- **Port Conflicts**: Make sure port 3001 is available

#### Frontend can't connect to backend
- **CORS Issues**: Check ALLOWED_ORIGINS in backend .env
- **API URL**: Verify VITE_API_URL in frontend .env (if set)
- **Network**: Ensure both services are running on correct ports

#### Groq API errors
- **Invalid API Key**: Double-check your Groq API key
- **Rate Limits**: Free tier has 30 requests/minute limit
- **Model Availability**: Ensure deepseek-r1-distill-llama-70b is accessible

#### MongoDB connection issues
- **Service Status**: Check if MongoDB service is running
- **Connection String**: Verify MONGO_URI format
- **Permissions**: Ensure MongoDB has proper read/write permissions

### Debug Commands

```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"

# Test backend health
curl http://localhost:3001/health

# Check backend logs
cd backend && npm run dev

# Test Groq API connection
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"deepseek-r1-distill-llama-70b","messages":[{"role":"user","content":"Hello"}]}'
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information about your problem

---

**Happy Coding with CodeFixer IDE! 🚀**