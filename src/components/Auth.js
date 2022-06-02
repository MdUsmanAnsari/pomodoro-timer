import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";


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
    const [status, setStatus] = useState('')

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

        setStatus('pending')
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const user = userCredential.user;
            setAccessToken(user.accessToken);
            setStatus('success')
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
                    setStatus('success')
                })
                .catch((error) => {
                    console.dir(error.message)
                    const isEmailAlready = error.message.includes('email-already-in-use')
                    setStatus({status:'error', message: isEmailAlready ? 'You have already an account from this email please enter a valid password!!' : error.message})
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
                     <div className="w-full">
                         <input className="w-full px-4 py-2 rounded border-2 border-indigo-600 text-lg" name="password" type="password" placeholder="Enter Password" />
                        { status.status === 'error' && <p className="mt-2 text-base text-rose-600">{status.message}</p>}
                   
                     </div>
                    <button className={`px-4 py-2 bg-indigo-500 rounded text-gray-50 ${status === 'pending' && 'cursor-not-allowed bg-indigo-300'}`} disabled={status === 'pending'}>
                        {  status === 'pending' ? 'Please wait...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-gray-400 text-center">Note: if you don't have an account don't worry It'll create automatically just enter email and password.</p>
            </div>
        </div>
    )

}

export default Auth;