import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

let config = {
  apiKey: 'AIzaSyDUAlHBB5NgZ0NqturJQbNLP49LH2pN4IQ',
  authDomain: 'rnexamplefirebase.firebaseapp.com',
  databaseURL: 'https://rnexamplefirebase-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rnexamplefirebase',
  storageBucket: 'rnexamplefirebase.appspot.com',
  messagingSenderId: '484309648056',
  appId: '1:484309648056:web:a65813562f7754379bea4d',
  measurementId: 'G-TZG7XW1YZ1',
};

let app = initializeApp(config);
let db = getFirestore(app);

export async function getBooks() {
  const books = collection(db, 'books');
  const booksDocs = await getDocs(books);
  const booksArr = booksDocs.docs.map((doc) => doc.data());
  return booksArr;
}

export default app;
