# Employee Payroll App (Frontend)

A modern, responsive **Employee Payroll Management System (Frontend)** built using **HTML, CSS, and Vanilla JavaScript**, powered by a **JSON Server mock backend**.  
This project demonstrates real-world frontend engineering practices such as **CRUD operations, validation, search, sorting, and responsive UI design**.

---

## Features

### 👥 Employee Management
- Add, view, edit, and delete employee records
- Pre-filled edit forms with safe duplicate checks
- Toast notifications for user feedback

### 📊 Dashboard & Statistics
- Total Employees
- Total Payroll
- Average Salary
- Auto-updated after every CRUD operation

### 🔍 Search & Sort
- Real-time search by:
  - Name
  - Email
  - Phone
  - Department
- Sort by:
  - Name (A–Z / Z–A)
  - Salary (Low–High / High–Low)
  - Joining Date

### 🛡️ Validation & Data Integrity
- RegEx-based client-side validation
- Duplicate email & phone number prevention
- Inline error messages and success states

### 🎨 UI / UX
- Card-based employee layout
- Gradient statistics cards
- Fully responsive (Desktop / Tablet / Mobile)
- Reusable design system (buttons, inputs, badges, toasts)

---

## 🧰 Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- JavaScript (ES6+)

### Backend (Mock)
- JSON Server
- Fetch API (AJAX)

---

## 📁 Project Structure

```text
EmployeePayroll-Frontend/
│
├── index.html          # Employee dashboard
├── add.html            # Add employee form
├── edit.html           # Edit employee form
├── details.html        # Employee details view
│
├── css/
│   ├── base.css        # Design tokens & base styles
│   ├── home.css        # Dashboard & cards
│   ├── form.css        # Add/Edit forms
│   ├── details.css    # Employee details page
│   ├── toast.css      # Toast notifications
│   └── responsive.css # Responsive breakpoints
│
├── js/
│   ├── app.js          # Dashboard logic (fetch, search, sort, stats)
│   ├── add.js          # Add employee logic
│   ├── edit.js         # Edit employee logic
│   └── details.js     # Employee details logic
│
├── images/             # UI & avatar images
├── db.json             # JSON Server database
├── .gitignore
└── README.md
```

### 🔌 API Endpoints (JSON Server)
```
| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/employees`     | Fetch all employees  |
| GET    | `/employees/:id` | Fetch employee by ID |
| POST   | `/employees`     | Add new employee     |
| PUT    | `/employees/:id`  | Update employee      |
| DELETE | `/employees/:id` | Delete employee      |

```


### 🧪 Validation Rules
```
| Field  | Rule                               |
| ------ | ---------------------------------- |
| Name   | Letters & spaces only (3–30 chars) |
| Email  | Valid email format + unique        |
| Phone  | 10–15 digits, optional `+`, unique |
| Salary | Numeric, minimum ₹15,000           |
| Date   | Cannot be a future date            |
```


## ⚙️ Setup & Run Locally
### 1️⃣ Clone the repository
```
git clone https://github.com/GE-Training-2026/EmployeePayRoll-using-Json-Server.git
cd EmployeePayRoll-using-Json-Server
```

### 2️⃣ Install JSON Server
```
npm install -g json-server
```

### 3️⃣ Start the backend
``` json-server --watch db.json --port 3000 ```


### 4️⃣ Run the frontend
```
Open index.html in your browser
(or use VS Code Live Server) 
```

### 📱 Responsive Design

```
| Device  | Layout                                |
| ------- | ------------------------------------- |
| Desktop | Multi-column cards & full dashboard   |
| Tablet  | Adaptive grid & spacing               |
| Mobile  | Single-column layout, stacked actions |

```

## 🎨 Design System

### Colors

- Primary: #4f46e5
- Success: #10b981
- Danger: #ef4444
- Warning: #f59e0b
- Info: #3b82f6

### Typography

- Font: Roboto
- Consistent spacing & accessible contrast
- Components
- Buttons (Primary, Secondary, Success, Danger)
- Inputs with focus & error states
- Cards & badges
- Toast notifications


### 👤 Author

- Jay Vardhan Vashishtha
- Frontend / Software Engineer
- B.Tech CSE