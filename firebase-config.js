// Ganti isi config di bawah sesuai Firebase Console milikmu
const firebaseConfig = {
    apiKey: "AIzaSyDa3DRngPAhrcQw4DH7qdhR8i8LB4zGNG8",
  authDomain: "pawne-bde7a.firebaseapp.com",
  databaseURL: "https://pawne-bde7a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pawne-bde7a",
  storageBucket: "pawne-bde7a.firebasestorage.app",
  messagingSenderId: "949009270912",
  appId: "1:949009270912:web:33ba2ce2dbee8ce9aa7e65",
  measurementId: "G-6XB7NFE36Q"
  };
  
  // Inisialisasi Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Hubungkan ke Realtime Database
  const database = firebase.database();
  