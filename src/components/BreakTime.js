import useTimerHook from "../hooks/useTimerHook";
import TimerUI from "./TimerUI";

const TIME = {
  minute:1,
  second:10
}

const BreakTime = ({setTimerComplete}) => {

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
        title="Break Time"
        color={{light:"bg-rose-100",
                dark:"bg-rose-500"}}
        minute={minute}
        second={second}
        onReset={onReset}  
        timerPauseAndStart={timerPauseAndStart}
        isStartTimer={isStartTimer}
    />
  );
}

export default BreakTime;
