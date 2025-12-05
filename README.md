📊 Karma Healthcare — Sales Analytics Dashboard

This project visualizes sales trends, customer spending patterns, and product category performance using real database-backed queries.

It consists of a:

Backend API (Node.js + Express + SQLite)

Frontend Dashboard (React + Recharts)

Local database (SQLite orders.db)

Business insights (INSIGHTS.md file included)

🏗️ Project Structure
Karma-Healthcare/
│
├── backend/         # REST API + database queries
├── frontend/        # React dashboard
├── data/            # SQLite database: orders.db
├── INSIGHTS.md      # Analysis & conclusions
└── README.md        # (you are here)

🚀 Features

✔ Total revenue per month (last 6 months)
✔ Month-over-month revenue growth %
✔ Top 5 customers ranked by total spend
✔ Best-selling product in each category
✔ Fully responsive UI
✔ Dark theme dashboard
✔ Charts powered by Recharts
✔ Real data stored in SQLite

🧰 Tech Stack
Backend

Node.js

Express

SQLite3

Frontend

React

Recharts

Vite

📦 How to Install & Run the Project
🖥️ Prerequisites

Node.js installed (>=16 recommended)

VS Code

Git (optional)

⚙️ 1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/karma-healthcare-analytics.git
cd karma-healthcare-analytics

🔌 2. Setup Backend (Port 4000)

Open a terminal in the backend/ folder:

cd backend
npm install
npm run dev


The backend is now running at:

👉 http://localhost:4000

🎨 3. Setup Frontend (Port 5173)

Open a new terminal in frontend/:

cd frontend
npm install
npm run dev


The dashboard is live at:

👉 http://localhost:5173

🗄 4. Verify Database

SQLite database is located at:

data/orders.db


It includes:

10 customers

15 products

60 orders (6 months)

The backend APIs read directly from this DB.

🧪 Testing the API (Optional)

Test backend endpoints in browser or Postman:

GET /api/sales-by-month?months=6
GET /api/top-customers?limit=5
GET /api/best-products
GET /api/month-over-month?months=6

📈 Dashboard Features
📊 Revenue by Month

Shows monthly revenue trend for the last 6 months.

📈 Growth Percentage

Line graph capturing month-over-month changes.

💰 Top 5 Customers

Highlights customer spending concentration.

🏆 Best Products

Shows highest revenue product per category.

All charts are interactive:

Hover tooltips

Colored legend

Responsive scaling

📝 Insights (Summary)

Located in INSIGHTS.md, includes:

Best performing category

Seasonal revenue trends

Customer concentration risks

Product category recommendations
