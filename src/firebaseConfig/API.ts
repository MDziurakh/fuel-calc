import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

const auth = getAuth();

const id = auth.currentUser?.uid;



const signInWithGoogle = async (setIsAuth: Function) => {
  try {
    const response = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log(response);
    const isNew = getAdditionalUserInfo(response)
    if (isNew?.isNewUser) {
      setIsAuth(true);
      createCollection({
          id,
          name: response.user.displayName,
        });
      }
    // if (response) {
    //   setIsAuth(true);
    //   createCollection({
    //     id,
    //     name: response.user.displayName,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
};

const signOutFromFirebase = (setIsAuth: Function) => {
  signOut(auth);
  setIsAuth(false);
};

const createCollection = async (body: object) => {
  if (!id) return;
  await setDoc(doc(db, "users/", id), body);
};

const getUserHistory = async (id:string) =>{
  if(!id)return;
  const userDoc = doc(db, `users/${id}`);
  try{
    const response = await getDoc(userDoc).then(snapshot=>{
      return (snapshot.data());
    })
    return(response);
    
  } catch(e) {
    console.log(e);
  }

}

const updateUserHistory = async (id: string, body: object) => {
  if (!id) return;

  const userDoc = doc(db, "users", id);
  try {
    const response = await getDoc(userDoc);
    const history: [] = response?.data()?.history;

    if (response) {
      await updateDoc(userDoc, {
        history:
          history && Array.isArray(history) ? [...history, body] : [body],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const API = {
  signInWithGoogle,
  signOutFromFirebase,
  createCollection,
  updateUserHistory,
  getUserHistory
};
