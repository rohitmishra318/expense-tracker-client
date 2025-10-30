# 💸 ExpenseTracker - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-black?style=for-the-badge&logo=framer&logoColor=white)

This is the official frontend client for the **ExpenseTracker** application, a modern MERN stack app designed to help you manage your finances with an aesthetic and intuitive interface.

It features a complete dashboard, transaction tracking, lend/borrow management, and a beautiful dark mode.

---

## ✨ Key Features

* **Secure Authentication:** JWT-based login and registration.
* **Expense Tracking:** Full CRUD (Create, Read, Update, Delete) operations for your expenses.
* **Lent & Borrow:** A dedicated module to track money lent to or borrowed from friends.
* **Interactive Dashboard:** Visual charts and graphs to analyze your spending habits.
* **Modern UI/UX:** Built with Tailwind CSS and `framer-motion` for smooth animations.
* **Dark/Light Mode:** Includes a theme toggle, with dark mode as the default.
* **Responsive Design:** Looks great on both desktop and mobile devices.

---

## 🚀 Tech Stack

* **Framework:** [React.js](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Charts:** [Recharts](https://recharts.org/)
* **State Management:** React Context (for Theme) & React Hooks

---

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.org/) (which includes `npm`) installed on your system.

### Installation & Setup

1.  **Clone the repository** (if you haven't already):
    ```sh
    git clone [https://github.com/your-username/expense-tracker.git](https://github.com/your-username/expense-tracker.git)
    ```

2.  **Navigate to the client directory:**
    ```sh
    cd expense-tracker/client
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Create an environment file:**

    Create a file named `.env` in the `client` directory. This file will hold your API keys. (Based on our `api.js` and `auth.js` files, you'll need these):

    ```env
    # URL for your authentication backend (Login, Register)
    VITE_AUTH_API_URL=http://localhost:4000/api/auth

    # URL for your expenses backend
    VITE_EXPENSE_API_URL=http://localhost:4001/api/expenses

    # URL for your lend/borrow backend
    VITE_LENDBORROW_API_URL=http://localhost:4002/api/lendborrow
    ```
    *(**Note:** Adjust the port numbers (`4000`, `4001`, `4002`) to match your actual backend server setup.)*

5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

---

## 📦 Available Scripts

In the project directory, you can run:

* `npm run dev` - Starts the development server.
* `npm run build` - Builds the app for production.
* `npm run lint` - Lints the code using ESLint.
* `npm run preview` - Serves the production build locally.

---

## 📁 Project Structure

Here is a simplified overview of the `client/src` directory:
