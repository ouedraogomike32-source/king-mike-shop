import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REMPLACE_MOI",
  authDomain: "REMPLACE_MOI.firebaseapp.com",
  projectId: "REMPLACE_MOI",
  storageBucket: "REMPLACE_MOI.appspot.com",
  messagingSenderId: "REMPLACE_MOI",
  appId: "REMPLACE_MOI",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const COLLECTION = "kingMikeShop";

export async function getShared(key, fallback) {
  try {
    const snap = await getDoc(doc(db, COLLECTION, key));
    return snap.exists() ? snap.data().value : fallback;
  } catch (e) {
    console.error("Firestore get error", e);
    return fallback;
  }
}

export async function setShared(key, value) {
  try {
    await setDoc(doc(db, COLLECTION, key), { value });
  } catch (e) {
    console.error("Firestore set error", e);
  }
}

export function watchShared(key, callback, fallback) {
  return onSnapshot(
    doc(db, COLLECTION, key),
    (snap) => callback(snap.exists() ? snap.data().value : fallback),
    (e) => console.error("Firestore watch error", e)
  );
}

export function getLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function setLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}
