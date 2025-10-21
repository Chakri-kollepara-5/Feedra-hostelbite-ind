import { getFirebaseAI } from "firebase/ai";
import app from "./firebase";  // your existing firebase.js file

// Initialize Gemini AI
export const ai = getFirebaseAI(app);

