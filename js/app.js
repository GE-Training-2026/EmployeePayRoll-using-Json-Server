const API_URL = "http://localhost:3000/employees";

const cardsContainer = document.getElementById("cardsContainer");
const totalEmployeesEl = document.getElementById("totalEmployees");
const totalPayrollEl = document.getElementById("totalPayroll");
const averageSalaryEl = document.getElementById("averageSalary");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let employees = [];

// Fetch employees
async function loadEmployees() {
  try {
    const res = await fetch(API_URL);
    employees = await res.json();
    renderStats();
    renderCards(employees);
  } catch (err) {
    console.error("Error loading employees:", err);
  }
}

// Render stats
function renderStats() {
  const total = employees.length;
  const payroll = employees.reduce((sum, e) => sum + e.salary, 0);
  const avg = total > 0 ? Math.round(payroll / total) : 0;

  totalEmployeesEl.textContent = total;
  totalPayrollEl.textContent = payroll.toLocaleString();
  averageSalaryEl.textContent = avg.toLocaleString();
}

// Render employee cards
function renderCards(data) {
  cardsContainer.innerHTML = "";
  data.forEach(emp => {
    const initials = emp.name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase();

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="avatar">
        ${emp.image 
          ? `<img src="${emp.image}" alt="${emp.name}" class="avatar-img">` 
          : `<span>${initials}</span>`}
      </div>
      <div class="card-body">
        <div class="card-title">${emp.name}</div>
        <div class="card-sub">${emp.email}</div>
        <div class="badge">${emp.department}</div>
        <div class="card-meta">
          <div>Salary: ₹${emp.salary.toLocaleString()}</div>
          <div>Phone: ${emp.phone}</div>
          <div>Start Date: ${emp.startDate}</div>
        </div>
      </div>
      <div class="card-actions">
        <a class="btn btn-secondary" href="details.html?id=${emp.id}">View</a>
        <a class="btn btn-primary" href="edit.html?id=${emp.id}">Edit</a>
        <button class="btn btn-danger" onclick="deleteEmployee('${emp.id}')">Delete</button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}


// Delete employee
async function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    employees = employees.filter(e => e.id !== id);
    renderStats();
    renderCards(employees);
  }
}

// Search
searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(q) ||
    emp.email.toLowerCase().includes(q) ||
    emp.phone.toLowerCase().includes(q) ||
    emp.department.toLowerCase().includes(q)
  );
  renderCards(filtered);
});

// Sort
sortSelect.addEventListener("change", () => {
  let sorted = [...employees];
  switch (sortSelect.value) {
    case "name-asc": sorted.sort((a,b) => a.name.localeCompare(b.name)); break;
    case "name-desc": sorted.sort((a,b) => b.name.localeCompare(a.name)); break;
    case "salary-asc": sorted.sort((a,b) => a.salary - b.salary); break;
    case "salary-desc": sorted.sort((a,b) => b.salary - a.salary); break;
    case "date-asc": sorted.sort((a,b) => new Date(a.startDate) - new Date(b.startDate)); break;
    case "date-desc": sorted.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)); break;
  }
  renderCards(sorted);
});

// Init
loadEmployees();