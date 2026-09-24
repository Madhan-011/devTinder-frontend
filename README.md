# DevTinder Frontend 🚀

The frontend application for **DevTinder**, a developer networking platform where developers can discover other developers, send connection requests, manage connections, and maintain their profiles.

This frontend is being developed as part of the **DevTinder MERN stack project**, with a separate backend built using Node.js, Express.js, MongoDB, and Mongoose.

> 🚧 **Project Status:** Frontend development is currently in progress. The current milestone establishes the React application structure, nested routing, reusable layout components, and the initial DaisyUI-based navigation UI.

---

## 🔗 Related Repository

### DevTinder Backend

The backend provides the REST APIs for authentication, profile management, connection requests, connections, and the developer feed.

**Backend Repository:**  
https://github.com/Madhan-011/devTinder-backend

---

## 🛠️ Tech Stack

### Frontend

- **React 19** – Building the user interface
- **Vite** – Development server and build tool
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS
- **DaisyUI** – Prebuilt UI components for Tailwind CSS
- **JavaScript (ES6+)** – Application development

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **cookie-parser**

---

## ✨ Current Features

### 🧭 React Routing

The application uses React Router with nested routes.

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Body` | Main application layout |
| `/login` | `Login` | Login page |
| `/profile` | `Profile` | Profile page |

The `Body` component acts as the parent layout and uses React Router's `Outlet` to render child routes.

### 🧩 Reusable Layout

The current application structure includes:

- `Body` layout component
- Reusable `Navbar` component
- Nested routes
- `Outlet` for rendering child pages

### 🎨 DaisyUI Navbar

The navbar currently contains:

- DevTinder branding
- User avatar
- Profile menu
- Settings option
- Logout option

### 🌈 DaisyUI Themes

The Tailwind CSS configuration currently enables:

- `light`
- `luxury`

---

## 📁 Project Structure

```text
devtinder-frontend/
│
├── src/
│   ├── components/
│   │   ├── Body.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   └── Profile.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── public/
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🔄 Current Application Flow

```text
                    React App
                       │
                       ▼
                BrowserRouter
                       │
                       ▼
                    Routes
                       │
                       ▼
                     Body
                    /    \
                   /      \
               Navbar    Outlet
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                  Login        Profile
```

---

## ⚙️ Installation

### 1. Clone the repository

Replace `<your-frontend-repository-url>` with the URL of your frontend GitHub repository.

```bash
git clone <your-frontend-repository-url>
cd devtinder-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will start the frontend development server.

---

## 📜 Available Scripts

### Start Development Server

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Build for Production

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally.

### Run Linter

```bash
npm run lint
```

Runs Oxlint to check the project for code-quality issues.

---

## 🔌 Backend Integration

The frontend is being developed to consume the APIs available in the DevTinder backend.

The backend currently contains functionality for:

- User signup
- User login
- JWT authentication
- Profile viewing
- Profile editing
- Password management
- Sending connection requests
- Accepting connection requests
- Rejecting connection requests
- Ignoring connection requests
- Viewing received requests
- Viewing accepted connections
- Developer feed

Backend repository:

https://github.com/Madhan-011/devTinder-backend

> **Note:** The frontend API integration is still under development. The current frontend milestone focuses on application structure, routing, and UI setup.

---

## 🚧 Upcoming Features

The frontend roadmap includes:

- Signup page
- Login form and backend authentication
- Authentication state management
- Protected routes
- Developer feed
- Developer profile cards
- Send connection requests
- Ignore connection requests
- Accept / reject connection requests
- Connections page
- Profile editing
- Password change UI
- Backend API integration
- Loading states
- Error handling
- Responsive UI improvements

---

## 🎯 Project Flow

The planned DevTinder user flow is:

```text
Create Account
      ↓
Login
      ↓
View Developer Feed
      ↓
Discover Developers
      ↓
Interested / Ignore
      ↓
Send Connection Request
      ↓
Receive Connection Request
      ↓
Accept / Reject
      ↓
Manage Connections
      ↓
View / Edit Profile
```

---

## 📌 Development Milestones

### ✅ Milestone 1 — Frontend Setup

- React + Vite project created
- Tailwind CSS configured
- DaisyUI configured
- React Router configured
- Nested routes created
- Body layout created
- Navbar created
- Login page created
- Profile page created

### 🚧 Milestone 2 — Authentication

- Signup UI
- Login UI
- Backend authentication integration
- Authentication state
- Protected routes
- Logout

### 🚧 Milestone 3 — Developer Feed

- Fetch developer feed
- Developer cards
- Interested / Ignore actions
- Pagination / loading states

### 🚧 Milestone 4 — Connections

- Received connection requests
- Accept / reject requests
- Connections page

### 🚧 Milestone 5 — Profile

- View profile
- Edit profile
- Change password
- Form validation

---

## 👨‍💻 Author

**Madhan K**

GitHub:  
https://github.com/Madhan-011

LinkedIn:  
https://linkedin.com/in/madhan-dev

---

## ⭐ Project

**DevTinder — Developer Networking Platform**

Built as a full-stack MERN application with a React frontend and Node.js/Express/MongoDB backend.

The project is actively being developed, with new frontend functionality and backend integration being added progressively.
