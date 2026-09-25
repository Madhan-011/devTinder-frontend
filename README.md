# DevTinder Frontend 👨‍💻🔥

A modern React frontend for **DevTinder**, a developer networking platform that helps developers discover other developers, manage profiles, and build professional connections.

This frontend communicates with the DevTinder backend through REST APIs and provides a responsive interface for authentication, profile management, developer discovery, connection requests, and connections.

## 🌐 Project

- **Frontend Repository:** https://github.com/Madhan-011/devTinder-frontend
- **Backend Repository:** https://github.com/Madhan-011/devTinder-backend

---

## ✨ Features

### 🔐 Authentication
- User signup and login
- JWT-based authentication handled by the backend
- Protected application routes
- Persistent authenticated session
- Logout functionality

### 👤 Profile Management
- View logged-in user's profile
- Edit profile information
- Update profile details such as:
  - First name / last name
  - Age
  - Gender
  - About
  - Skills
  - Profile photo

### 🔎 Developer Feed
- Discover developer profiles
- Display developer information in profile cards
- Send connection requests
- Ignore developer profiles
- Fetch developer feed from the backend API

### 🤝 Connection Management
- Send interested/connection requests
- View received connection requests
- Accept or reject requests
- View accepted connections

### 🧭 Client-Side Routing
- React Router based navigation
- Nested routes
- Protected application flow
- Shared layout using React Router's `<Outlet />`

### 🎨 UI
- Responsive React UI
- Tailwind CSS styling
- DaisyUI components
- Reusable React components
- Responsive profile and form layouts

### 🗃️ State Management
- Redux Toolkit for global application state
- Redux store configured with `configureStore`
- React Redux `Provider`
- Component-level state with React hooks where appropriate

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tooling |
| React Router DOM | Client-side routing |
| Redux Toolkit | Global state management |
| React Redux | Connecting React components with Redux |
| Tailwind CSS | Utility-first styling |
| DaisyUI | UI components |
| Axios | HTTP/API communication |
| JavaScript (ES6+) | Application logic |
| ESLint | Code quality |

---

## 🏗️ Application Architecture

The project follows a **frontend/backend separation** architecture.

```text
                    ┌──────────────────────┐
                    │     DevTinder UI     │
                    │   React + Vite       │
                    └──────────┬───────────┘
                               │
                    React Router / Redux
                               │
                               ▼
                    ┌──────────────────────┐
                    │      REST APIs       │
                    │ Axios API Requests   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  DevTinder Backend   │
                    │ Node + Express       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       MongoDB        │
                    │      Database        │
                    └──────────────────────┘
```

---

## 📁 Project Structure

```text
devTinder-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Body.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Feed.jsx
│   │   └── ...
│   │
│   ├── store/
│   │   ├── appStore.js
│   │   └── ...
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

> The structure above represents the main application organization. Component and utility files may grow as the project continues to develop.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- DevTinder backend running locally

### 1. Clone the repository

```bash
git clone https://github.com/Madhan-011/devTinder-frontend.git
cd devTinder-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the backend URL

Create a `.env` file in the project root if your frontend configuration uses an environment variable for the backend API.

Example:

```env
VITE_BASE_URL=http://localhost:7777
```

Use the variable name expected by the API configuration in your current source code.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

## 🔗 Backend

This frontend requires the DevTinder backend API.

**Backend Repository:**

https://github.com/Madhan-011/devTinder-backend

The backend is responsible for:

- User authentication
- JWT cookies
- User profile APIs
- Developer feed
- Connection requests
- Accepted connections
- MongoDB data management

Start the backend before using features that require API communication.

---

## 🔄 Frontend ↔ Backend Flow

A typical authenticated request works like this:

```text
User
 │
 ▼
React Component
 │
 ▼
Axios API Request
 │
 ▼
Express Route
 │
 ▼
Authentication Middleware
 │
 ▼
Controller / Route Logic
 │
 ▼
MongoDB
 │
 ▼
API Response
 │
 ▼
Redux / React State
 │
 ▼
Updated UI
```

---

## 🧭 Routing

The application uses **React Router DOM** for client-side navigation.

Example route structure:

```text
/
├── /login
├── /profile
└── /feed
```

The application also uses nested routing with React Router's `<Outlet />` for rendering child routes inside the shared application layout.

---

## 🗃️ Redux Store

Redux Toolkit is used for global state management.

The application store is created using:

```js
configureStore({
  reducer: {
    // application reducers
  }
});
```

The store is provided to the React application using:

```jsx
<Provider store={appStore}>
  <App />
</Provider>
```

This allows components throughout the application to access shared Redux state.

---

## 🔒 Authentication Flow

```text
Login / Signup
      │
      ▼
Frontend sends credentials
      │
      ▼
Backend validates user
      │
      ▼
Backend creates JWT
      │
      ▼
JWT stored in authentication cookie
      │
      ▼
Authenticated API requests
      │
      ▼
Protected frontend pages
```

Authentication and authorization are handled primarily by the backend, while the frontend manages the authenticated user experience and protected navigation.

---

## 📡 API Integration

Axios is used to communicate with the DevTinder backend.

Frontend responsibilities include:

- Sending authentication requests
- Fetching the logged-in user's profile
- Updating profile information
- Fetching developer feed
- Sending connection requests
- Fetching received requests
- Accepting/rejecting requests
- Fetching connections

---

## 📱 Responsive Design

The UI is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Tailwind CSS utility classes are used to build responsive layouts, while DaisyUI provides reusable UI components.

---

## 🧪 Available Scripts

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🚧 Current Development

DevTinder is being developed incrementally as a full-stack MERN application.

Current frontend work includes:

- React application setup
- Routing with React Router
- Login UI
- Profile UI
- Feed UI
- Redux Toolkit setup
- API integration
- Authentication flow
- Connection request UI
- Connections management

More features will be added as backend APIs and frontend components are developed.

---

## 🔮 Future Enhancements

Potential improvements include:

- 💬 Real-time developer chat
- 🔔 Real-time notifications
- 🔎 Advanced developer search and filtering
- 🖼️ Profile image upload
- 📄 Pagination / infinite scrolling
- 🧪 More frontend unit and integration tests
- ⚡ Performance optimizations
- 📱 Further mobile UX improvements

---

## 📚 Learning Focus

This project is being used to strengthen practical understanding of:

- React
- React Router
- Redux Toolkit
- REST API integration
- Axios
- Authentication
- Protected routes
- State management
- Tailwind CSS
- DaisyUI
- MERN stack architecture
- Frontend/backend communication

---

## 👨‍💻 Author

**Madhan K**

- GitHub: https://github.com/Madhan-011
- LinkedIn: https://linkedin.com/in/madhan-dev

---

## 📄 License

This project is intended for learning and development purposes.

---

⭐ If you find the project useful, feel free to explore the repository and follow the development journey.
