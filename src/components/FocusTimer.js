import useTimerHook  from '../hooks/useTimerHook';
import TimerUI from './TimerUI'

function FocusTimer({setTimerComplete}) {

  const TIME = {
    minute:2,
    second:0
 }

  const [second,setSecond, minute,setMinute, isStartTimer,setStartTimer] = useTimerHook(TIME,setTimerComplete);
 
  
  const onReset = () =>{
      setMinute(TIME.minute);
      setSecond(TIME.second);
  }

  const timerPauseAndStart = () =>{
      setStartTimer(prevState => !prevState);
  }


  return (
    <TimerUI
        title="Focus Time"
        color={{light:"bg-violet-200",
                dark:"bg-violet-500"}}
        minute={minute}
        second={second}
        onReset={onReset}  
        timerPauseAndStart={timerPauseAndStart}
        isStartTimer={isStartTimer}
    />
  );
}

export default FocusTimer;
