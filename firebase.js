import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgJke033pfCaA1X6ddFWdoK2ZIuUn5riA",
  authDomain: "pantry-system-89efd.firebaseapp.com",
  projectId: "pantry-system-89efd",
  storageBucket: "pantry-system-89efd.appspot.com",
  messagingSenderId: "806062214965",
  appId: "1:806062214965:web:b0696cf38063f007c2467c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };