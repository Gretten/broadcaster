import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig }  from "../../../settings.mjs";

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
