const API_URL = "http://localhost:3000/employees";
const editForm = document.getElementById("editForm");
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

const patternsEdit = {
  name: /^[A-Za-z ]{3,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[0-9]{10,15}$/,
  salaryMin: 15000
};

async function loadEmployee() {
  if (!editId) { alert("No employee id"); location.href = "index.html"; return; }
  try {
    const res = await fetch(`${API_URL}/${editId}`);
    if (!res.ok) throw new Error("Not found");
    const emp = await res.json();
    document.getElementById("name").value = emp.name || "";
    document.getElementById("email").value = emp.email || "";
    document.getElementById("phone").value = emp.phone || "";
    document.getElementById("salary").value = emp.salary || "";
    document.getElementById("department").value = emp.department || "";
    document.getElementById("startDate").value = emp.startDate || "";
    document.getElementById("notes").value = emp.notes || "";
  } catch (err) {
    console.error(err);
    alert("Failed to load employee");
    location.href = "index.html";
  }
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrorsEdit();
  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    salary: Number(document.getElementById("salary").value),
    department: document.getElementById("department").value,
    startDate: document.getElementById("startDate").value,
    notes: document.getElementById("notes").value.trim()
  };

  let ok = true;
  if (!patternsEdit.name.test(data.name)) { showErrorEdit("nameError","Name must be 3-30 letters and spaces only"); ok=false; }
  if (!patternsEdit.email.test(data.email)) { showErrorEdit("emailError","Invalid email format"); ok=false; }
  if (!patternsEdit.phone.test(data.phone)) { showErrorEdit("phoneError","Phone must be 10-15 digits, optional +"); ok=false; }
  if (!Number.isFinite(data.salary) || data.salary < patternsEdit.salaryMin) { showErrorEdit("salaryError","Salary must be at least ₹15,000"); ok=false; }
  if (!data.department) { showErrorEdit("departmentError","Select a department"); ok=false; }
  if (!data.startDate || new Date(data.startDate) > new Date()) { showErrorEdit("startDateError","Start date cannot be in the future"); ok=false; }

  if (!ok) return;

  // duplicate checks excluding current id
  // const dupEmail = await checkDuplicateExcludingId("email", data.email, Number(editId));
  // if (dupEmail) { showErrorEdit("emailError","Email already exists"); return; }
  // const dupPhone = await checkDuplicateExcludingId("phone", data.phone, Number(editId));
  // if (dupPhone) { showErrorEdit("phoneError","Phone already exists"); return; }

  try {
    
    const res = await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Update failed");
    alert("Employee updated");
     window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Failed to update employee");
  }
});

function showErrorEdit(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrorsEdit() {
  ["nameError","emailError","phoneError","salaryError","departmentError","startDateError"].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}

async function checkDuplicateExcludingId(field, value, excludeId) {
  try {
    const res = await fetch(API_URL);
    const list = await res.json();
    return list.some(e => e.id !== excludeId && (e[field] || "").toLowerCase() === (value || "").toLowerCase());
  } catch (err) {
    console.error("Duplicate check failed", err);
    return false;
  }
}

loadEmployee();