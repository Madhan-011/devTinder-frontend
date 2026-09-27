# DevTinder Frontend 🚀

A developer networking platform built with **React** that helps developers discover other developers, view profiles, send connection requests, manage incoming requests, and maintain their profiles.

DevTinder is designed around the idea of connecting developers for collaboration and networking — **like Tinder for developers, not dating**.

This repository contains the **frontend** of the DevTinder MERN stack application.

## 🔗 Project Repositories

- **Frontend:** https://github.com/Madhan-011/devTinder-frontend
- **Backend:** https://github.com/Madhan-011/devTinder-backend

---

## ✨ Features

### 👤 Authentication

- Login functionality
- Authentication handled through the backend
- JWT-based authentication using cookies
- Authenticated API requests using Axios
- User session/profile handling through Redux Toolkit

### 🧑‍💻 Developer Feed

- Fetch developers from the backend
- Display developer profile cards
- View developer information such as:
  - First name
  - Last name
  - Profile photo
  - Age
  - Gender
  - About
  - Skills
- Developer discovery interface for sending connection requests

### 🤝 Connection Requests

- Send connection requests to developers
- View received connection requests
- Accept connection requests
- Reject connection requests
- Manage connection-related actions from the frontend

### 🔗 Connections

- Fetch accepted developer connections
- Display connected developers
- View connection profile information

### 📝 Profile Management

- View logged-in user's profile
- Edit profile information
- Update fields such as:
  - First name
  - Last name
  - Photo URL
  - Age
  - Gender
  - About
  - Skills

### 🗃️ Global State Management

Redux Toolkit is used to manage application-wide state.

Current store structure includes:

- `user`
- `feed`
- `connections`
- `requests`

### 🧭 Client-Side Routing

React Router DOM is used for navigation between application pages.

Current routes include:

| Route | Component | Purpose |
|---|---|---|
| `/` | `Feed` | Developer discovery/feed |
| `/login` | `Login` | User login |
| `/profile` | `Profile` | View/edit profile |
| `/connections` | `Connections` | View accepted connections |
| `/requests` | `Requests` | View received connection requests |

The application uses a shared `Body` layout with nested routes and React Router's `<Outlet />`.

---

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **Vite**
- **JavaScript (ES6+)**
- **React Router DOM**
- **Redux Toolkit**
- **React Redux**
- **Axios**
- **Tailwind CSS**
- **DaisyUI**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **cookie-parser**

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┴────────────────┐
              │                                 │
              ▼                                 ▼
      ┌─────────────────┐              ┌─────────────────┐
      │ React Router    │              │ Redux Toolkit   │
      │ Navigation      │              │ Global State    │
      └─────────────────┘              └─────────────────┘
              │
              ▼
      ┌─────────────────┐
      │     Axios       │
      │   API Requests  │
      └────────┬────────┘
               │
               ▼
      ┌─────────────────┐
      │ DevTinder API   │
      │ Node + Express  │
      └────────┬────────┘
               │
               ▼
      ┌─────────────────┐
      │     MongoDB     │
      │    Database     │
      └─────────────────┘
```

---

## 🔄 Frontend ↔ Backend Flow

A typical authenticated request follows this flow:

```text
User Action
    ↓
React Component
    ↓
Axios Request
    ↓
Express API
    ↓
JWT Authentication Middleware
    ↓
Route / Controller Logic
    ↓
MongoDB
    ↓
API Response
    ↓
Redux Store
    ↓
Updated React UI
```

---

## 🔐 Authentication Flow

```text
Login
  ↓
Frontend sends credentials
  ↓
Backend validates user
  ↓
Backend generates JWT
  ↓
JWT stored in authentication cookie
  ↓
Frontend sends authenticated requests
  ↓
Backend verifies JWT
  ↓
Protected API response
  ↓
Redux / React state updated
```

The backend is responsible for authentication and authorization, while the frontend handles the user interface and application state.

---

## 🗂️ Project Structure

```text
devTinder-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Body.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Feed.jsx
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── UserCard.jsx
│   │   ├── Connections.jsx
│   │   ├── Requests.jsx
│   │   └── ...
│   │
│   ├── store/
│   │   ├── appStore.js
│   │   └── subStore/
│   │       ├── userSlice.js
│   │       ├── feedSlice.js
│   │       ├── connectionSlice.js
│   │       └── requestSlice.js
│   │
│   ├── utils/
│   │   └── constants.js
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

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- MongoDB / MongoDB Atlas
- DevTinder backend

### 1. Clone the frontend repository

```bash
git clone https://github.com/Madhan-011/devTinder-frontend.git
cd devTinder-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Clone and configure the backend separately:

```bash
git clone https://github.com/Madhan-011/devTinder-backend.git
cd devTinder-backend
npm install
npm run dev
```

The backend is configured to run on port `7777`.

### 4. Configure the frontend API URL

Create a `.env` file in the frontend root if required by your local configuration:

```env
VITE_BASE_URL=http://localhost:7777
```

Make sure the variable name matches the one used in `src/utils/constants.js`.

### 5. Start the frontend

```bash
npm run dev
```

Vite will provide the local development URL in the terminal, normally:

```text
http://localhost:5173
```

---

## 📡 API Integration

Axios is used for communication between the React frontend and the DevTinder backend.

The frontend integrates with APIs for:

- User authentication
- Fetching the logged-in user
- Profile management
- Developer feed
- Sending connection requests
- Receiving connection requests
- Accepting requests
- Rejecting requests
- Fetching accepted connections

The frontend and backend communicate through REST APIs.

---

## 🗃️ Redux Toolkit Store

The application uses Redux Toolkit for global state management.

Current store configuration:

```javascript
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});
```

### Store Responsibilities

| Slice | Responsibility |
|---|---|
| `userSlice` | Logged-in user information |
| `feedSlice` | Developer feed data |
| `connectionSlice` | Accepted connections |
| `requestSlice` | Received connection requests |

Components access the store using React Redux hooks such as:

```javascript
useSelector()
useDispatch()
```

---

## 🎨 UI

The application uses:

- Tailwind CSS for utility-based styling
- DaisyUI for UI components
- DaisyUI themes including the `luxury` theme

The UI focuses on a clean developer-networking experience with reusable components and card-based developer profiles.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs Oxlint for code-quality checks.

---

## 🧩 Key React Concepts Used

This project provides practical implementation of:

- Functional components
- Props
- React state
- `useState`
- `useEffect`
- React Router
- Nested routes
- `Outlet`
- Redux Toolkit
- `configureStore`
- Redux slices
- `useSelector`
- `useDispatch`
- Axios API integration
- Authentication flow
- Protected application flow
- Reusable components

---

## 🚧 Current Development Status

DevTinder is being developed incrementally as a full-stack MERN application.

### Implemented

- [x] React + Vite setup
- [x] Tailwind CSS setup
- [x] DaisyUI setup
- [x] React Router setup
- [x] Nested routing
- [x] Navbar
- [x] Login page
- [x] Profile page
- [x] Profile editing UI
- [x] Developer feed
- [x] Developer profile cards
- [x] Redux Toolkit store
- [x] User state management
- [x] Feed state management
- [x] Connection state management
- [x] Request state management
- [x] Axios API integration
- [x] Connection request UI
- [x] Received requests UI
- [x] Connections page
- [x] Backend integration

### Planned / Future Enhancements

- [ ] Real-time developer chat
- [ ] Real-time notifications
- [ ] Developer search and filtering
- [ ] Profile image upload
- [ ] Pagination / infinite scrolling
- [ ] More loading states
- [ ] More error handling
- [ ] Additional frontend tests
- [ ] Further UI/UX improvements

---

## 🔗 Backend Repository

The backend for this project is available here:

https://github.com/Madhan-011/devTinder-backend

The backend is responsible for:

- Express server
- REST APIs
- MongoDB/Mongoose
- User authentication
- JWT cookies
- Password hashing
- User profiles
- Developer feed
- Connection requests
- Accepted connections

---

## 👨‍💻 Author

**Madhan K**

- GitHub: https://github.com/Madhan-011
- LinkedIn: https://linkedin.com/in/madhan-dev

---

## 📄 License

This project is intended for learning and development purposes.

---

⭐ If you find this project useful, feel free to explore the repository and follow the development journey.
