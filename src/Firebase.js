import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbek1e1S4UfHAZQhjfsh93ZT8bIVcHyKg",
  authDomain: "prayatna-dc544.firebaseapp.com",
  databaseURL: "https://prayatna-dc544-default-rtdb.firebaseio.com",
  projectId: "prayatna-dc544",
  storageBucket: "prayatna-dc544.appspot.com",
  messagingSenderId: "583073585200",
  appId: "1:583073585200:web:fba0ec6eb5b849e78d75f5",
  measurementId: "G-WSZT0NLQRQ"
};


export const app = initializeApp(firebaseConfig);