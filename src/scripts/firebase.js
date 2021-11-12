import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getStorage, listAll, uploadBytes, ref as refs } from "firebase/storage";


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
//const listRef = ref(storage, 'files/uid');




const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;

    set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
    })

   
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
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "local",
        email: user.email,
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

const logout = () => {
  signOut(auth);
};

const bannerDetail = () => {
    const starCountRef = ref(db, 'Banner/Banner1');
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    //console.log(data.url);

    const listRef = refs(storage, 'gs://image-betting.appspot.com/');

// Find all the prefixes and items.
    listAll(listRef)
    .then((res) => {
      //console.log(res)
      res.prefixes.forEach((folderRef) => {
        console.log(folderRef)
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        console.log(itemRef)
        // All the items under listRef.
      });
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
    });
  });
  // ref(db, 'users/').once("value")
  // .then(function(snapshot) {
  //   var key = snapshot.key; // "ada"
  //   // var childKey = snapshot.child("name/last").key; // "last"
  //   return key;
  // });

  // var ref = firebase.database().ref("users/");
  // ref.once("value")
  // .then(function(snapshot) {
  //   var key = snapshot.key; // "ada"
  //   var childKey = snapshot.child("name").key; // "last"
  // });
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  bannerDetail,
  storage,
};