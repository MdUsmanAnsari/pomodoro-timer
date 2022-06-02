import {   useState } from "react";
import { getAuth , signOut} from "firebase/auth";
import Auth from "./components/Auth";
import FocusTimer from "./components/FocusTimer";
import BreakTime from './components/BreakTime'

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [isTimerComplete,setTimerComplete] = useState(false);

  const logoutHandler = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('logout')
    }).catch((error) => {
      console.log('Can not logout',error)
    });
}



  return (
    <div className="bg-violet-100 px-8 min-h-screen flex justify-center items-center">
      {!accessToken && <Auth setAccessToken={setAccessToken} />}
      {accessToken && 
          <>
          {!isTimerComplete && <FocusTimer setTimerComplete={setTimerComplete}/>}
            {isTimerComplete && <BreakTime setTimerComplete={setTimerComplete} />}
          </>
       }
       <button className="fixed top-10 right-10 bg-gray-900 py-2 px-4 text-gray-100 rounded-md" onClick={logoutHandler}>logout</button>
    </div>
  );
}

export default App;
