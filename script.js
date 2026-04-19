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
        <input 
          type="checkbox" 
          ${item.LectureDone ? "checked" : ""} 
          onchange="updateLecture(${item.id}, this.checked)"
        >
      </td>
      
      <td>
        <input 
          type="number" 
          value="${item.problemsSolved}" 
          onchange="updateProblems(${item.id}, this.value)"
        >
      </td>
      
      <td>${item.status}</td>
    `;

    tableBody.appendChild(row);
  });
}

// 🔹 UPDATE LECTURE
async function updateLecture(id, value) {
  const { error } = await client
    .from('progress')
    .update({ LectureDone: value }) // ✅ EXACT NAME
    .eq('id', id);

  if (error) {
    console.error("Lecture update error:", error);
  } else {
    console.log("Lecture updated!");
  }
}

// 🔹 UPDATE PROBLEMS
async function updateProblems(id, value) {
  const { error } = await client
    .from('progress')
    .update({ problemsSolved: parseInt(value) }) // ✅ EXACT NAME
    .eq('id', id);

  if (error) {
    console.error("Problems update error:", error);
  } else {
    console.log("Problems updated!");
  }
}

// 🔹 INITIAL LOAD
fetchProgress();