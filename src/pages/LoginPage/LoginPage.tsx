import React, { useEffect, useState } from "react";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  // addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";

import { db } from "../../firebaseConfig/config";
import { API } from "../../firebaseConfig/API";

const LoginPage: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const auth = getAuth();
  
  const usersCollectionRef = collection(db, "users");
  
  const {createCollection, signInWithGoogle, signOutFromFirebase, updateUserHistory} = API;


  const [newString, setNewString] = useState<string>("");
  const [testArr, SetTestArr] = useState<Array<string>>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);










  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newString.replace(/ /g, "")) {
      SetTestArr([...testArr, newString]);
      setNewString("");

      // updateUser(auth.currentUser?.uid, {tasks:[newString]})




    } else setNewString("");
  };

  return (
    <div>
      <p>Login</p>
      <button onClick={()=>signInWithGoogle(setIsAuth)} disabled={isAuth}>
        Sign in with Google
      </button>
      <button onClick={()=>signOutFromFirebase(setIsAuth)} disabled={!isAuth}>
        Sign out
      </button>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Sample..."
            value={newString}
            onChange={(e) => setNewString(e.target.value)}
          />
        </form>
      </div>
      {/* <button onClick={createCollection}>Create collection</button> */}
      <div>
        {testArr.map((i) => (
          <p key={i}>{i}</p>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
