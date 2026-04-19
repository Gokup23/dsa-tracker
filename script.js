// 🔹 SUPABASE CONFIG
const SUPABASE_URL = "https://xezqyxnbfsdtkxwpmwaf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlenF5eG5iZnNkdGt4d3Btd2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTEwOTgsImV4cCI6MjA5MjE2NzA5OH0.OEMLXsfS3P12ODBFBfCdpIjLu8YAaI05AcSSkEVh7As";

// 🔹 CREATE CLIENT
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 🔹 FETCH DATA
async function fetchProgress() {
  const { data, error } = await client
    .from('progress')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching:", error);
    return;
  }

  console.log("Data:", data);
  displayData(data);
}

// 🔹 DISPLAY DATA
function displayData(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.topic}</td>

      <td>
        <input type="checkbox" id="lecture-${item.id}" 
          ${item.LectureDone ? "checked" : ""}>
      </td>

      <td>
        <input type="number" id="problems-${item.id}" 
          value="${item.problemsSolved}">
      </td>

      <td>
        <select id="status-${item.id}">
          <option ${item.status === "Not Started" ? "selected" : ""}>Not Started</option>
          <option ${item.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${item.status === "Done" ? "selected" : ""}>Done</option>
        </select>
      </td>

      <td>
        <button onclick="saveRow(${item.id})">Save</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function saveRow(id) {
  const lecture = document.getElementById(`lecture-${id}`).checked;
  const problems = parseInt(document.getElementById(`problems-${id}`).value);
  const status = document.getElementById(`status-${id}`).value;

  const { error } = await client
    .from('progress')
    .update({
      LectureDone: lecture,
      problemsSolved: problems,
      status: status
    })
    .eq('id', id);

  if (error) {
    console.error("Save error:", error);
    alert("Failed to save");
  } else {
    console.log("Saved!");
    alert("Saved successfully ✅");
  }
}

// 🔹 INITIAL LOAD
fetchProgress();