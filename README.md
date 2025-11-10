#  TradeShift — Full Stack Financial Portfolio Management System

**TradeShift** is a modern full-stack web application built using **Spring Boot** and **React.js**.  
It allows users to **register, log in (via email or OTP)**, manage their **assets, trades, and portfolios**,  
and view **analytics such as profit/loss, total investments, and asset allocation.**

---

##  Tech Stack

### **Backend (Java + Spring Boot)**
- Spring Boot 3.x  
- Spring Security (JWT Authentication)  
- Hibernate + JPA  
- MySQL Database  
- REST APIs  
- Twilio / Fast2SMS API (for OTP-based login)

### **Frontend (React.js + TailwindCSS)**
- React.js (Functional Components + Hooks)  
- React Router v6  
- Axios for API calls  
- Context API for Authentication  
- TailwindCSS (clean responsive UI)

---

##  Folder Structure

```
Tradeshift/
│
├── tradeshift-backend/
│   ├── src/main/java/com/tradeshift/tradeshift/
│   │   ├── Auth/ → AuthController.java
│   │   ├── controller/ → AssetController, PortfolioController, OtpLoginController, etc.
│   │   ├── model/ → User.java, Asset.java, Portfolio.java
│   │   ├── security/ → JwtUtils, SecurityConfig
│   │   └── service/ → Business Logic
│   ├── pom.xml
│   └── application.properties
│
├── tradeshift-frontend/
│   ├── src/
│   │   ├── api/axiosConfig.js
│   │   ├── components/ → AddAssets.js, AssetList.js, Login.js
│   │   ├── context/AuthContext.js
│   │   ├── pages/ → Dashboard.js, Home.js, Profile.js
│   │   ├── index.js, App.js
│   │   └── index.css, tailwind.config.js
│   ├── package.json
│   └── .env
│
├── start-backend.bat
├── start-frontend.bat
└── README.md
```

---

##  Features

 **User Authentication**
- Register & login via email/password  
- Login via mobile OTP (Fast2SMS integration)

 **Portfolio Management**
- Add, view, and delete assets  
- Real-time calculation of total investment value  
- Profit/Loss visualization with charts

 **Analytics Dashboard**
- Investment trends  
- Asset allocation by category/currency  
- Transaction history

 **Trade Module**
- Simulated buy/sell orders  
- Total profit/loss computation

 **Responsive UI**
- Modern Groww-style interface  
- Built with TailwindCSS  
- Works seamlessly on mobile, tablet, and desktop

---

##  Setup Instructions

### Prerequisites
- Install **Java 17+**
- Install **Node.js (v18+)**
- Install **Maven**
- Install **MySQL**

---

###  1. Clone Repository
```bash
git clone https://github.com/Annm0l/tradeshift.git
cd tradeshift
```

---

###  2. Backend Setup
1. Open MySQL and create a database:
   ```sql
   CREATE DATABASE tradeshift_db;
   ```

2. Update your database credentials in:
   ```
   tradeshift-backend/src/main/resources/application.properties
   ```

3. Run backend (Option 1 - via terminal):
   ```bash
   cd tradeshift-backend
   mvn spring-boot:run
   ```
   **OR** (Option 2 - double-click):
   ```
   start-backend.bat
   ```

---

###  3. Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd tradeshift-frontend
   npm install
   npm start
   ```
   **OR simply double-click:**
   ```
   start-frontend.bat
   ```

2. App will run at 👉 [http://localhost:3000](http://localhost:3000)

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/mobile/send-otp` | Send OTP via Fast2SMS |
| POST | `/api/mobile/verify-otp` | Verify OTP & get JWT |
| GET | `/api/assets` | Get logged-in user’s assets |
| POST | `/api/assets` | Add new asset |
| GET | `/api/analytics/trend` | Get investment trend |
| GET | `/api/portfolio/summary` | Get portfolio summary |

---

##  Screenshots

| Login Page | Dashboard | Add Asset | Analytics |
|-------------|------------|------------|------------|
| ![Login](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) | ![Add Asset](screenshots/addasset.png) | ![Analytics](screenshots/analytics.png) |

---

##  Future Enhancements
- Stock market live API integration  
- Email OTP system  
- AI-based investment suggestions  
- PDF portfolio export

---

##  Author
**Anmol Mehto (TradeShift Project)**  
> Developed as a Full Stack Java + React project  
> Mentor: *[Zaalima Technologies]*  
> © 2025 TradeShift — All Rights Reserved.

---

##  License
This project is for educational purposes.  
Feel free to fork and extend it under open license terms.
