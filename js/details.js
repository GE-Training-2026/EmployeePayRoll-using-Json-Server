const API_URL = "http://localhost:3000/employees";
const paramsD = new URLSearchParams(window.location.search);
const idD = paramsD.get("id");
const detailsDiv = document.getElementById("employeeDetails");

async function loadDetails() {
  if (!idD) { detailsDiv.innerHTML = "<p>No employee specified.</p>"; return; }
  try {
    const res = await fetch(`${API_URL}/${idD}`);
    if (!res.ok) throw new Error("Not found");
    const emp = await res.json();
    const initials = emp.name ? emp.name.split(" ").map(n=>n[0]).slice(0,2).join("").toUpperCase() : "";
    detailsDiv.innerHTML = `
      <div class="details-top">
        <div class="details-avatar">${initials}</div>
        <div>
          <div class="details-name">${emp.name}</div>
          <div class="details-meta">${emp.email}</div>
          <div class="details-meta">${emp.department} • ₹${emp.salary} • ${emp.phone}</div>
          <div class="details-meta">Start Date: ${emp.startDate || "-"}</div>
          <div class="details-meta">Notes: ${emp.notes || "-"}</div>
        </div>
        <div style="margin-top:12px;">
        <a class="btn btn-primary" href="edit.html?id=${emp.id}">Edit</a>
        <button class="btn btn-danger" onclick="deleteAndBack(${emp.id})">Delete</button>
        <a class="btn btn-secondary" href="index.html">Back</a>
      </div>
      </div>
      
    `;
  } catch (err) {
    console.error(err);
    detailsDiv.innerHTML = `<p style="color:var(--danger)">Failed to load employee details.</p>`;
  }
}

async function deleteAndBack(id) {
  if (!confirm("Delete this employee?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Deleted");
    location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
}

loadDetails();