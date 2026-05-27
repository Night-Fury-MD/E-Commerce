# Nexus Market 🛒

A modern, responsive, and fully functional E-commerce front-end web application built using native web technologies. The project demonstrates advanced DOM manipulation, asynchronous data fetching, and state persistence using `localStorage`.

🔗 **[Live Demo](https://Night-Fury-MD.github.io/E-Commerce)

---

## 🚀 Features

### 🔐 Multi-Role Authentication System
- **Dynamic Auth Modal:** A single, sleek modal that handles both **Login** and **Registration** modes.
- **Role-Based Access Control (RBAC):** Users can register as a **Customer** or an **Admin**.
- **State Persistence:** Built with `localStorage`. Once logged in, the browser remembers the session even after a page refresh.

### 👨‍💼 Admin Dashboard Capabilities
- Dynamic rendering of administrative tools if the logged-in user has an `admin` role.
- **Add Products:** Append new products dynamically (pre-pending to the top of the list).
- **Edit Products:** In-line title modification using prompts.
- **Delete Products:** Secure deletion with confirmation dialogs.

### 🔍 Advanced Filtering & Sorting
- Real-time **search input** matching product titles.
- **Category filter** dynamically updating the product grid.
- **Price sorting** (Low to High / High to Low).

### 🌐 Asynchronous Data Fetching
- Simulates real-world production delays using a custom `Promise` delay.
- Fetches initial mock data from the **FakeStore API** securely using `async/await` and robust error handling.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Custom Grid & Flexbox layout)
- **Scripting:** JavaScript (ES6+, Promises, Async/Await, Array Methods)
- **Storage:** Web Storage API (`localStorage`)
- **API:** FakeStoreAPI

---

## 📸 Screenshots

| Desktop View | Login Modal | Admin Controls |
|---|---|---|
| *Add your screenshot links here later* | *Add your screenshot links here later* | *Add your screenshot links here later* |

---

## ⚙️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
