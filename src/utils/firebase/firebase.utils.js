import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,  
  GoogleAuthProvider
  } from 'firebase/auth';

  import {
    getFirestore,
    doc,
    getDoc,
    setDoc,

  } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCLbX9d4946zN8Ab85S-5SEENuKnwHv4Nc",
    authDomain: "crown-dbs-34379.firebaseapp.com",
    projectId: "crown-dbs-34379",
    storageBucket: "crown-dbs-34379.appspot.com",
    messagingSenderId: "2349876130",
    appId: "1:2349876130:web:c10d8bf2c3a0e0f6b128fb"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());


//if does not exist
if(!userSnapshot.exists()){
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try{
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    });
  }catch (error){
    console.log("error making acc ", error.message);
  } 
}

  return userDocRef;

}
//if exists 
