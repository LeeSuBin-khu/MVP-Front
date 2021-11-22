import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, signInAnonymously } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from "firebase/database";
import { getStorage, listAll } from '@firebase/storage';
import firebase from "firebase/compat";


const firebaseConfig = {
  apiKey: "AIzaSyDFMMpu-eTGrbpW3Ruu-G2ZMfwaioRCsYw",
  authDomain: "image-betting.firebaseapp.com",
  databaseURL: "https://image-betting-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "image-betting",
  storageBucket: "image-betting.appspot.com",
  appId: "image-betting"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const storage = getStorage(app);

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();

const provider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const userRef = ref(db, 'users/' + user.uid);

    var user_snapshot = await get(userRef);
    const user_data = user_snapshot.val();
    if(user_data == null){
      set((userRef), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        auth:"null",
        tm_info: { point: 0}
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInAnony = async () => {
  try {
    const res = await signInAnonymously(auth);
    const user = res.user;
    const userRef = ref(db, 'users/' + user.uid);

    var user_snapshot = await get(userRef);
    const user_data = user_snapshot.val();
    if(user_data == null){
      update((userRef), {
        uid: user.uid,
        name: "Guest_" + user.uid.substring(0,5),
        tm_info: { point: 0 }
      });
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    console.log(email);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    update(ref(db, 'users/' + user.uid), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: user.email,
      tm_info: { point: 0}

    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const changeName = async name => {
  const user = auth.currentUser;
  update(ref(db, 'users/' + user.uid), {
    name: name
  }).then(res => {
    alert("이름이 변경되었습니다.");
  }).catch(err => {
    console.error(err);
  })
}

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  storage,
  storageRef,
  signInWithGoogle,
  signInAnony,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  changeName,
  logout,
};