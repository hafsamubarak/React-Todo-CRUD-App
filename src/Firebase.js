import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJvKN6jVdLi9LM5etqKF8JucI2AmQF5MY",
  authDomain: "todo-react-app-5596d.firebaseapp.com",
  projectId: "todo-react-app-5596d",
  storageBucket: "todo-react-app-5596d.appspot.com",
  messagingSenderId: "836097875403",
  appId: "1:836097875403:web:b5f959c3dc3b288394ea4e",
  measurementId: "G-JEX8BVB9RL",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
//Google Authentication
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  //using a try…catch block along with async functions so that we can handle errors easily and avoid callbacks as much as possible.
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName: user.displayName,
        secondName: user.secondName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
//signing in using an email and password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem("user", user.uid);
    localStorage.getItem("user");
    // console.log(localStorage.getItem("user"));
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
//function for registering a user with an email and password
const registerWithEmailAndPassword = async (firstName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem("user", user.uid);
    localStorage.getItem("user");
    // console.log(localStorage.getItem("user"));
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      firstName,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
//function that will send a password reset link to an email address
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
//the logout function
const logout = () => {
  signOut(auth);
  localStorage.removeItem("user");
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
