import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz8rGj1igmQKOKI4RnVCvsXYNg890Ayt4",
  authDomain: "login-register-a7818.firebaseapp.com",
  projectId: "login-register-a7818",
  storageBucket: "login-register-a7818.firebasestorage.app",
  messagingSenderId: "643351796955",
  appId: "1:643351796955:web:e85a27ad2805d2aacf00fe",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Provedores
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export { signInWithPopup };
