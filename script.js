const SUPABASE_URL = "PASTE_YOUR_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_ANON_KEY_HERE";

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