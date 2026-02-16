const API_URL = "http://localhost:3000/employees";
const form = document.getElementById("employeeForm");

const patterns = {
    name: /^[A-Za-z ]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[+]?[0-9]{10,15}$/,
    salaryMin: 15000
};
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.style.background = type === "success" ? "var(--success)" : "var(--danger)";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
        if (type === "success") {
            window.location.href = "index.html";
        }
    }, 5000); // 2 seconds
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const data = readForm();
    const valid = await validateAll(data);
    if (!valid) return;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to create");
        showToast("Employee added successfully", "success");
        window.location.href = "index.html";
    } catch (err) {
        console.error(err);
        showToast("Failed to add employee", "danger");
    }
});


function readForm() {
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        salary: Number(document.getElementById("salary").value),
        department: document.getElementById("department").value,
        startDate: document.getElementById("startDate").value,
        notes: document.getElementById("notes").value.trim()
    };
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function clearErrors() {
    ["nameError", "emailError", "phoneError", "salaryError", "departmentError", "startDateError"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
    });
}

async function validateAll(data) {
    let ok = true;
    if (!patterns.name.test(data.name)) {
        showError("nameError", "Name must be 3-30 letters and spaces only");
        ok = false;
    }
    if (!patterns.email.test(data.email)) {
        showError("emailError", "Invalid email format");
        ok = false;
    }
    if (!patterns.phone.test(data.phone)) {
        showError("phoneError", "Phone must be 10-15 digits, optional +");
        ok = false;
    }
    if (!Number.isFinite(data.salary) || data.salary < patterns.salaryMin) {
        showError("salaryError", "Salary must be at least ₹15,000");
        ok = false;
    }
    if (!data.department) {
        showError("departmentError", "Select a department");
        ok = false;
    }
    if (!data.startDate || new Date(data.startDate) > new Date()) {
        showError("startDateError", "Start date cannot be in the future");
        ok = false;
    }

    if (!ok) return false;

    // duplicate checks
    const dupEmail = await checkDuplicate("email", data.email);
    if (dupEmail) {
        showError("emailError", "Email already exists");
        ok = false;
    }
    const dupPhone = await checkDuplicate("phone", data.phone);
    if (dupPhone) {
        showError("phoneError", "Phone already exists");
        ok = false;
    }
    return ok;
}

async function checkDuplicate(field, value) {
    try {
        const res = await fetch(API_URL);
        const list = await res.json();
        return list.some(e => (e[field] || "").toLowerCase() === (value || "").toLowerCase());
    } catch (err) {
        console.error("Duplicate check failed", err);
        return false;
    }
}