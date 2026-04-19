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
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Fetched data:", data);
  displayData(data);
}

// 🔹 DISPLAY DATA (EDITABLE TABLE)
function displayData(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.topic}</td>
      
      <td>
        <input 
          type="checkbox" 
          ${item.lecture_done ? "checked" : ""} 
          onchange="updateLecture(${item.id}, this.checked)"
        >
      </td>
      
      <td>
        <input 
          type="number" 
          value="${item.problems_solved}" 
          onchange="updateProblems(${item.id}, this.value)"
        >
      </td>
      
      <td>${item.status}</td>
    `;

    tableBody.appendChild(row);
  });
}

// 🔹 UPDATE LECTURE DONE
async function updateLecture(id, value) {
  const { error } = await client
    .from('progress')
    .update({ lecture_done: value })
    .eq('id', id);

  if (error) {
    console.error("Update error (lecture):", error);
  } else {
    console.log("Lecture updated!");
  }
}

// 🔹 UPDATE PROBLEMS SOLVED
async function updateProblems(id, value) {
  const { error } = await client
    .from('progress')
    .update({ problems_solved: parseInt(value) })
    .eq('id', id);

  if (error) {
    console.error("Update error (problems):", error);
  } else {
    console.log("Problems updated!");
  }
}

// 🔹 INITIAL LOAD
fetchProgress();