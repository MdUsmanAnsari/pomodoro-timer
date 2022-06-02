import {zeroPrefixer} from '../helper';

const TimerUI = ({title,color,minute,second,timerPauseAndStart,isStartTimer,onReset}) =>{

    return (
        <div>
        <p className={`${color.light} py-2 px-4 rounded-full  mb-4 text-2xl text-center`}>{title}</p>
        <div className="flex items-center gap-4">
            <p className="text-6xl">{zeroPrefixer(minute)}</p>
            <p className="text-6xl">:</p>
            <p className="text-6xl">{zeroPrefixer(second)}</p>
        </div>
       <div className="mt-5 flex gap-4">
            <button className={`px-4 w-full py-2 ${color.dark} rounded text-gray-50`} onClick={timerPauseAndStart}> {isStartTimer ? 'Pause':'Start'} </button>
            <button className={`px-4 w-full py-2 ${color.dark} rounded text-gray-50`} onClick={onReset}>Reset</button>
       </div>
    </div>
    )
}

export default TimerUI