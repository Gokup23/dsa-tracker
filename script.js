const firebaseConfig = {

  apiKey: "AIzaSyAwuZlzcpymLKuLY62cEm5WDk7IsdYYTDM",

  authDomain: "dsa-tracking.firebaseapp.com",

  projectId: "dsa-tracking",

  storageBucket: "dsa-tracking.firebasestorage.app",

  messagingSenderId: "268678274250",

  appId: "1:268678274250:web:0a47bce2db68791cc92833",

  measurementId: "G-X7NX1BMMPX"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

console.log("Firebase connected successfully ✅");

db.collection("progress").onSnapshot((snapshot) => {
  const body = document.getElementById("tracker-body");
  body.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    body.innerHTML += `
      <tr>
        <td>${doc.id}</td>
        <td>${data.lectureDone ? "✅" : "❌"}</td>
        <td>${data.problemsSolved}</td>
        <td>${data.status}</td>
      </tr>
    `;
  });
});