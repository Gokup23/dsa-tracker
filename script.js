const SUPABASE_URL = "https://xezqyxnbfsdtkxwpmwaf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlenF5eG5iZnNkdGt4d3Btd2FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTEwOTgsImV4cCI6MjA5MjE2NzA5OH0.OEMLXsfS3P12ODBFBfCdpIjLu8YAaI05AcSSkEVh7As";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchProgress() {
  const { data, error } = await client
    .from('progress')
    .select('*');

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Fetched data:", data);
  displayData(data);
}

function displayData(data) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  data.forEach(item => {
    const row = `
      <tr>
        <td>${item.topic}</td>
        <td>${item.lectureDone ? "✅" : "❌"}</td>
        <td>${item.problemsSolved}</td>
        <td>${item.status}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

fetchProgress();