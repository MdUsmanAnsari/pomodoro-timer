import { useState, useEffect } from "react";

const SECOND = 59

const useTimerHook = (TIME,setTimerComplete) =>{

  const [minute,setMinute] = useState(TIME.minute)
  const [second, setSecond] = useState(TIME.second)
  const [isTimerStart,setTimerStart] = useState(true);

  useEffect(() =>{

      const intervals = setInterval(()=>{

        if(minute === 0 && second === 0){
          clearInterval(intervals)
          setTimerComplete(prevState => !prevState)
          return;
        }
        
        if(second === 0){
          setMinute(prevMinute => prevMinute - 1)
          setSecond(SECOND)
          return;
        }

        setSecond(prevSecond => prevSecond - 1)

      },1000)

      if(!isTimerStart)
       clearInterval(intervals)
    
      
      return () => clearInterval(intervals);

  },[second,minute,isTimerStart,setTimerComplete])

  return [second, setSecond,minute,setMinute ,isTimerStart,setTimerStart];

}

export default useTimerHook;