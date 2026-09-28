# DevTinder Frontend 🚀

A React frontend for **DevTinder**, a developer networking platform that helps developers discover other developers, send connection requests, review incoming requests, manage accepted connections, and edit their profiles.

> DevTinder is designed for developer networking and collaboration — **like Tinder for developers, not dating**.

This repository contains the frontend of the DevTinder MERN application.

## 🔗 Repositories

- **Frontend:** https://github.com/Madhan-011/devTinder-frontend
- **Backend:** https://github.com/Madhan-011/devTinder-backend

---

## ✨ Features

### 🔐 Authentication

- Login with email and password
- Sign up with first name, last name, email, and password
- JWT-based authentication handled by the backend
- JWT is stored in an authentication cookie
- Axios requests use `withCredentials: true`
- Logged-in user information is stored in Redux Toolkit
- Unauthenticated users are redirected to `/login` when the profile API returns `401`

### 🧑‍💻 Developer Feed

- Fetches developer profiles from the backend
- Displays developer profile cards
- Shows:
  - First name
  - Last name
  - Profile photo
  - Age
  - Gender
  - About information
- Provides **Ignore** and **Interested** actions
- Removes a developer from the current feed after an action

### 🤝 Connection Requests

- Send an `interested` request
- Send an `ignored` request
- View received `interested` requests
- Accept a received request
- Reject a received request
- Remove a request from the frontend state after reviewing it

### 🔗 Connections

- Fetch accepted developer connections
- Display connected developers with:
  - Name
  - Profile photo
  - Age
  - Gender
  - About information

### 👤 Profile Management

- View the logged-in user's profile
- Edit:
  - First name
  - Last name
  - Profile photo URL
  - Age
  - Gender
  - About
- Shows a profile preview while editing
- Displays success feedback after saving
- Displays backend validation errors in the form

### 🚪 Logout

- Calls the backend `/logout` endpoint
- Clears the authentication cookie through the backend
- Clears frontend Redux state
- Navigates the user back to `/login`

---

## 🧭 Application Routes

| Route | Component | Purpose |
|---|---|---|
| `/login` | `Login` | Login and sign-up |
| `/` | `Feed` | Developer discovery |
| `/profile` | `Profile` | View/edit profile |
| `/connections` | `Connections` | View accepted connections |
| `/requests` | `Requests` | Review received requests |

The `/` route uses `Body` as the shared layout. `Body` renders the `Navbar` and React Router's `<Outlet />` for nested pages.

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- JavaScript (ES6+)
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS
- DaisyUI

### Backend Integration

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

---

## 🗃️ Redux Store

Redux Toolkit is used for global application state.

The store is configured with four slices:

| Slice | State | Responsibility |
|---|---|---|
| `userSlice` | `user` | Logged-in user |
| `feedSlice` | `feed` | Developer feed |
| `connectionSlice` | `connections` | Accepted connections |
| `requestSlice` | `requests` | Received connection requests |

The frontend uses:

- `configureStore()`
- `createSlice()`
- `useSelector()`
- `useDispatch()`

### Feed State

The feed slice supports:

- Adding the fetched feed
- Removing a developer after Ignore/Interested
- Clearing the feed during logout

### User State

The user slice supports:

- Adding/updating the logged-in user
- Removing the user during logout

### Connection State

The connection slice supports:

- Adding accepted connections
- Clearing connections during logout

### Request State

The request slice supports:

- Adding received requests
- Removing a reviewed request

---

## 📡 Frontend API Integration

Axios is used for REST API communication with the backend.

The current frontend API base URL is defined directly in:

```text
src/utils/constants.js
```

Current value:

```js
export const BASE_URL = "http://localhost:7777";
```

The frontend therefore expects the backend to be available at:

```text
http://localhost:7777
```

Authenticated requests send cookies using:

```js
{ withCredentials: true }
```

---

## 🔗 Backend APIs Used by the Frontend

| Method | Endpoint | Frontend Usage |
|---|---|---|
| `POST` | `/login` | Login |
| `POST` | `/signup` | Create account |
| `POST` | `/logout` | Logout |
| `GET` | `/profile/view` | Fetch logged-in user |
| `PATCH` | `/profile/edit` | Update profile |
| `GET` | `/feed` | Fetch developer feed |
| `POST` | `/request/send/:status/:toUserId` | Ignore/Interested |
| `GET` | `/user/requests/received` | Fetch received requests |
| `POST` | `/request/review/:status/:requestId` | Accept/Reject request |
| `GET` | `/user/connections` | Fetch accepted connections |

---

## 🔄 Authentication Flow

```text
User
  ↓
Login / Sign Up
  ↓
React Frontend
  ↓
Axios Request
  ↓
Express Backend
  ↓
Credentials Validated
  ↓
JWT Generated
  ↓
JWT Stored in Cookie
  ↓
Authenticated API Requests
  ↓
Backend JWT Verification
  ↓
Protected API Response
  ↓
Redux Store
  ↓
React UI
```

The frontend does not manage the JWT token directly. It relies on the authentication cookie provided by the backend.

---

## 🏗️ Project Structure

```text
devTinder-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Body.jsx
│   │   ├── Connections.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Feed.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavbarLogin.jsx
│   │   ├── Profile.jsx
│   │   ├── Requests.jsx
│   │   ├── UserCard.jsx
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
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Install:

- Node.js
- npm
- Git
- MongoDB / MongoDB Atlas
- DevTinder backend

### 1. Clone the frontend

```bash
git clone https://github.com/Madhan-011/devTinder-frontend.git
cd devTinder-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure and start the backend

Clone the backend separately:

```bash
git clone https://github.com/Madhan-011/devTinder-backend.git
cd devTinder-backend
npm install
npm run dev
```

The backend currently listens on:

```text
http://localhost:7777
```

### 4. Start the frontend

From the frontend project directory:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal, normally:

```text
http://localhost:5173
```

> **Current configuration:** `src/utils/constants.js` directly uses `http://localhost:7777`. The current code does not read `VITE_BASE_URL` from an environment variable.

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

Runs Oxlint.

---

## 🎨 UI

The frontend uses:

- Tailwind CSS
- DaisyUI
- DaisyUI component classes
- A dark developer-focused interface
- Card-based developer profiles
- A luxury-style visual treatment in the profile editor

The profile editor includes a profile preview alongside the edit form.

---

## 🧩 React Concepts Used

This project currently demonstrates:

- Functional components
- Props
- `useState`
- `useEffect`
- React Router
- Nested routes
- `<Outlet />`
- Redux Toolkit
- Redux slices
- `configureStore`
- `useSelector`
- `useDispatch`
- Axios API integration
- Cookie-based authentication
- Conditional rendering
- Reusable components
- Client-side navigation

---

## 🔌 Frontend ↔ Backend Flow

```text
React Component
      ↓
Axios
      ↓
Express Route
      ↓
Authentication Middleware
      ↓
Route Logic
      ↓
MongoDB / Mongoose
      ↓
JSON Response
      ↓
Redux Store
      ↓
React Component
```

---

## 🚧 Current Development Status

### Implemented

- React + Vite setup
- Tailwind CSS
- DaisyUI
- React Router
- Nested routing
- Login/sign-up UI
- Authentication integration
- Developer feed
- Developer cards
- Ignore / Interested actions
- Profile view/edit
- Profile preview
- Received connection requests
- Accept / Reject actions
- Accepted connections
- Redux Toolkit state management
- Logout flow
- Backend API integration

### Possible Future Enhancements

These are not currently implemented:

- Real-time developer chat
- Real-time notifications
- Developer search/filtering
- Profile image uploads
- Feed pagination/infinite scrolling on the frontend
- Additional loading states
- More comprehensive error handling
- Frontend automated tests
- Further UI/UX improvements

---

## 🔗 Backend Repository

The backend powering this frontend is available here:

https://github.com/Madhan-011/devTinder-backend

The backend provides authentication, profile APIs, developer feed APIs, and connection-request APIs.

---

## 👨‍💻 Author

**Madhan K**

- GitHub: https://github.com/Madhan-011
- LinkedIn: https://linkedin.com/in/madhan-dev

---

## 📄 License

This project is intended for learning and development purposes.
