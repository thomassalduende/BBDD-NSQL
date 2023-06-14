import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJtdAzy5cTfEKaabiNjsnqrF_zMXdjSBI",
  authDomain: "superh-d7d67.firebaseapp.com",
  projectId: "superh-d7d67",
  storageBucket: "superh-d7d67.appspot.com",
  messagingSenderId: "318523540590",
  appId: "1:318523540590:web:d1d62c99f33fd46596127f",
  measurementId: "G-VHWYC2TFFD"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, v4())
  const data = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef).then(url => url)
  return [data, url];
}