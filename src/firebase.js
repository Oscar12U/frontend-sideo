import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDWzatHwQqQtMYYShLCDSTtAqyMWs_pjg",
  authDomain: "loginsideodevelopment.firebaseapp.com",
  projectId: "loginsideodevelopment",
  storageBucket: "loginsideodevelopment.appspot.com",
  messagingSenderId: "736079716784",
  appId: "1:736079716784:web:7dd44109945c3ecd27b675",
};

// export const generateUserDocument = async (user, additionalData) => {
//     if (!user) return;

//     return user.uid;
// };

// const getUserDocument = async uid => {
//     if (!uid) return null;
//     try {
//         const userDocument = await firestore.doc(`users/${uid}`).get();
//         return {
//             uid,
//             ...userDocument.data()
//         };
//     } catch (error) {
//         console.error("Error fetching user", error);
//     }
// };

const fire = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { fire, auth };
