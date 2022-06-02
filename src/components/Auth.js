import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADCrgVonEDPx-nqa3ID3iQmN6HFFMX594",
  authDomain: "auth-demo-447d0.firebaseapp.com",
  projectId: "auth-demo-447d0",
  storageBucket: "auth-demo-447d0.appspot.com",
  messagingSenderId: "845340687177",
  appId: "1:845340687177:web:746df7b162757e2dcb3898"
};


const Auth = ({setAccessToken}) =>{

    const [user,setUser] = useState(null);

    useEffect(()=>{
        
            // Initialize Firebase
          initializeApp(firebaseConfig);
       
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setAccessToken(user.accessToken)
            } else {
              setAccessToken(null)
            }
        })
          


    },[])
   

    useEffect(()=>{

        if(!user) return;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setAccessToken(user.accessToken);
        })
        .catch((error) => {
            createUser(user);
        });

    },[user])


    const createUser = ({email,password}) =>{
                 const auth = getAuth();
                 createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setAccessToken(user.accessToken)
                })
                .catch((error) => {
                    console.log('Something went wrong!',error)
              });
    }


    const onSubmitHandler = e =>{
        const email = e.target.email.value;
        const password = e.target.password.value;
        setUser({email,password})
        e.preventDefault();
    }


    return (
        <div>
            <div className="max-w-lg bg-gray-50 p-14 rounded-md shadow-lg">
                <p className="text-indigo-600 mb-8 text-4xl text-center">User Login</p>
                <form className="flex flex-col gap-8" onSubmit={onSubmitHandler}>
                    <input className="px-4 py-2 rounded border-2 border-indigo-600 text-lg" name="email" type="email" placeholder="Enter Email" />
                    <input className="px-4 py-2 rounded border-2 border-indigo-600 text-lg" name="password" type="password" placeholder="Enter Password" />
                    <button className="px-4 py-2 bg-indigo-500 rounded text-gray-50">Login</button>
                </form>
                <p className="mt-4 text-gray-400 text-center">Note: if you don't have an account don't worry it'll create automatically just enter email and password.</p>
            </div>
        </div>
    )

}

export default Auth;