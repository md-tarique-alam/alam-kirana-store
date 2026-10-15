# 🛒 Alam Kirana Store — Full Stack MERN E-commerce Application

A full-stack grocery e-commerce application built to digitize my family's grocery business and make product browsing and ordering more convenient for local customers.

**Live Demo:** [Alam Kirana Store](https://alam-kirana-store.vercel.app/)  
**GitHub Repository:** [alam-kirana-store](https://github.com/md-tarique-alam/alam-kirana-store)

---

## 📌 About the Project

Alam Kirana Store is a grocery shopping web application developed to bring a traditional neighborhood grocery store online. The application provides a customer-facing shopping experience and an administrative interface for managing products, inventory, and orders.

The project focuses on practical business workflows, REST API development, database integration, authentication, and deployment.

## ✨ Features

### 🛍️ Customer Experience
- Browse grocery products and categories.
- View product information and product details.
- Add products to the shopping cart.
- Increase or decrease item quantities.
- View automatically updated cart totals.
- Place grocery orders and follow the order workflow.

### 🔐 Admin Panel
- Admin authentication and protected administrative access.
- Add, view, update, and delete products.
- Manage product information and inventory.
- Increase or decrease stock quantities.
- View incoming customer orders.
- Update order statuses.

### 📦 Inventory Management
- Maintain product stock quantities.
- Support manual inventory adjustments.
- Update inventory as part of the order workflow.
- Keep product information organized through database-backed operations.

### ☁️ Deployment and Integration
- REST API integration between the React frontend and Express backend.
- MongoDB Atlas for cloud database hosting.
- Cloudinary integration for product image storage and delivery.
- Separate frontend and backend deployments.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React.js | User interface and reusable components |
| React Router | Client-side routing |
| Context API | Shared application state |
| Tailwind CSS | Responsive styling |
| Axios | HTTP requests to backend APIs |
| Node.js | JavaScript runtime for the backend |
| Express.js | Backend server and REST APIs |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB schemas and data operations |
| JWT and Cookies | Authentication implementation |
| Cloudinary | Product image management |
| Git and GitHub | Version control and source code hosting |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 🏗️ Application Architecture

```text
Customer / Admin
       |
       v
React.js Frontend
       |
       | Axios / HTTP Requests
       v
Express.js REST API
       |
       v
Mongoose
       |
       v
MongoDB Atlas

Product Images ---> Cloudinary
Frontend ---------> Vercel
Backend ----------> Render
```

## 🔄 Core Workflows

**Customer workflow**

Browse products → Add items to cart → Adjust quantities → Place order

**Admin workflow**

Authenticate → Manage products → Update inventory → View orders → Update order status

## 🚀 Live Deployment

- **Frontend:** https://alam-kirana-store.vercel.app/
- **Backend:** https://alam-kirana-backend.onrender.com
- **Database:** MongoDB Atlas

The frontend communicates with the backend through REST APIs. The database stores application data, while product images are handled through Cloudinary.

## 💻 Run Locally

### Prerequisites

Install the following before running the application:

- Node.js and npm
- Git
- A MongoDB Atlas account or MongoDB instance
- Cloudinary credentials if using image-upload functionality

### 1. Clone the repository

```bash
git clone https://github.com/md-tarique-alam/alam-kirana-store.git
cd alam-kirana-store
```

### 2. Install frontend dependencies

From the project root, run:

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend directory and configure the variables required by your server.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use the exact variable names expected by your code. If a feature does not use one of these variables, omit it. Never commit real credentials or secret keys to GitHub.

### 5. Start the backend

From the `backend` directory, run the start script configured in `backend/package.json`, for example:

```bash
npx nodemon server.js
```

### 6. Start the frontend

Open another terminal at the project root:

```bash
npm run dev
```

Vite will display the local development URL in your terminal, usually `http://localhost:5173`.

## 🔒 Security Notes

- Keep secrets and database credentials in environment variables.
- Do not expose JWT secrets or Cloudinary API secrets in frontend code.
- Protect administrative endpoints on the backend, not just in the frontend UI.
- Configure CORS to allow only the intended frontend origins.
- Validate incoming data and enforce inventory rules on the server.

## 🎯 What I Learned

- Building reusable React components and managing shared application state.
- Connecting a React frontend to a Node.js and Express backend.
- Designing REST APIs and implementing CRUD operations.
- Modeling and managing application data with MongoDB and Mongoose.
- Working with authentication, cookies, and protected administrative features.
- Managing products, inventory, shopping carts, and order workflows.
- Deploying a full-stack application using Vercel, Render, and MongoDB Atlas.

## 🔮 Future Improvements

- Improve automated testing for API endpoints and critical workflows.
- Add stronger input validation and error handling.
- Improve order tracking and customer notifications.
- Add inventory alerts for low-stock products.
- Further optimize accessibility, performance, and mobile usability.

## 👨‍💻 Author

**Md Tarique Alam**

- **GitHub:** [md-tarique-alam](https://github.com/md-tarique-alam)
- **LinkedIn:** [tarique-alam-dev](https://www.linkedin.com/in/tarique-alam-dev)

---

*Built as a practical full-stack project to explore how web development can help digitize a neighborhood grocery business.*
