# Resume Chatbot

A simple AI-like chatbot web application that answers questions about my resume/CV. Users can interact via a chat interface to ask about skills, projects, education. The frontend is built with React + TailwindCSS, and the backend is a Flask API that performs keyword/synonym matching against a predefined set of responses.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
   * [1. Clone the Repository](#1-clone-the-repository)
   * [2. Backend Setup (Flask)](#2-backend-setup-flask)
   * [3. Frontend Setup (React)](#3-frontend-setup-react)
5. [Running the Application](#running-the-application)

---


## Features

* **Keyword & Synonym Matching**

  * Recognizes exact keywords (e.g., `skills`, `projects`, `education`).
  * Synonym expansion: handles inputs like “skillset” → “skills,” “CV” → “resume,” “devops” → “docker/kubernetes.”
* **Autocomplete Suggestions**

  * As the user types, shows the first matching sample question in lighter text.
  * Pressing `→` (right arrow) accepts the suggestion.
* **Light/Dark Mode Toggle**

  * Single button in the sticky header to switch between light and dark themes.
  * Entire page—including background and chat bubbles—responds to the toggle.
* **Persistent Chat History**

  * Conversations persist across page reloads via `localStorage`.
  * “Clear Chat” button to reset the conversation and remove saved history.
* **Copy & Download Transcript**

  * 📄 (Document icon): copies the entire chat transcript to the clipboard.
  * ⬇️ (Download tray icon): downloads a `.txt` file of the transcript.

---

## Tech Stack

* **Frontend**

  * React (via Vite)
  * TailwindCSS
  * Heroicons (React) for SVG icons
  * Axios for HTTP requests
* **Backend**

  * Python 3.9+
  * Flask
  * Flask-CORS
* **Other**

  * `localStorage` (browser) for persistence
  * Navigator Clipboard API for “Copy Transcript”
  * Vite as the development server and build tool

---

## Prerequisites

Make sure you have the following installed:

* **Node.js** (v14+ recommended) and `npm` (which comes with Node.js)
* **Python** (v3.9 or newer) and `pip`

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/petrosg8/resume-chatbot.git
cd resume-chatbot
```

You should see two main folders:

```
backend/
frontend/
```

### 2. Backend Setup (Flask)

1. Create a virtual environment (recommended) (optional)

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate        # MacOS/Linux
   # On Windows: venv\Scripts\activate
   ```
2. Install required Python packages

   ```bash
   pip install -r requirements.txt
   ```

   * **Requirements** (in `backend/requirements.txt`):

     ```
     Flask
     flask-cors
     ```

### 3. Frontend Setup (React + Tailwind)

1. Navigate to the frontend folder

   ```bash
   cd ../frontend
   ```
2. Install dependencies

   ```bash
   npm install
   ```

   * **Key Packages**:

     * React + ReactDOM
     * Vite (dev server)
     * TailwindCSS
     * Axios
     * @heroicons/react

---

## Running the Application

You need to run the backend (Flask) and frontend (Vite) concurrently in separate terminals.

### Start Backend

1. Activate virtual environment (if not already active):

   ```bash
   cd backend
   source venv/bin/activate    # MacOS/Linux
   # On Windows: venv\Scripts\activate
   ```
2. Run the Flask app on port 5000:

   ```bash
   flask run
   ```

   You should see:

   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
   ```

### Start Frontend

1. In a separate terminal, navigate to `frontend/`:

   ```bash
   cd frontend
   ```

2. Start the Vite development server:

   ```bash
   npm run dev
   ```

   You should see something like:

   ```
   VITE v2.x.x  ready in 200 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. Open browser and go to `http://localhost:5173/`.

At this point, you should see the chat interface. Try typing a question like “What are your skills?” and press Enter or click **Send**.
