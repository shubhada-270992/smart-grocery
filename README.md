# Smart Grocery Inventory System

A simple, production-like grocery inventory management portal built for AWS deployment practice.

## Tech Stack
* **Frontend:** React + Vite (Vanilla CSS)
* **Backend:** Python FastAPI
* **Database:** SQLite (SQLAlchemy ORM)
* **REST API:** Client-server architecture

---

## Project Structure
```text
smart-grocery/
├── backend/
│   ├── app/
│   │   ├── database.py   # SQLite setup & session management
│   │   ├── models.py     # SQLAlchemy Product model
│   │   ├── routes.py     # FastAPI endpoints (/login, /dashboard, /products)
│   │   └── main.py       # FastAPI initialization, CORS, DB seeding
│   └── grocery.db        # SQLite database (auto-generated on first run)
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Login view with admin validation
│   │   │   └── Dashboard.jsx   # Grid cards, warning indicators & inventory table
│   │   ├── services/
│   │   │   └── api.js          # Fetch API calls to backend
│   │   ├── App.jsx             # React routing & session guards
│   │   ├── index.css           # Premium vanilla CSS styling
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Getting Started

### 1. Prerequisites
Ensure you have the following installed:
* Python 3.8+
* Node.js 16+ & npm

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic
   ```
4. Run the FastAPI application:
   ```bash
   python -m app.main
   ```
   * The API server will start on [http://localhost:8000](http://localhost:8000).
   * The SQLite database file `grocery.db` will be automatically generated, and seeded with 5 sample products if empty.

---

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
   * Open the local web page at the URL printed in the terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## Practice Credentials
* **Username:** `admin`
* **Password:** `admin123`
