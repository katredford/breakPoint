
import { useTime } from './context/TimeContext';


//this shows 3 buttons that start the timeStart function and displays
//a clock that counts down from whatever start number gets passed as
//an argument
const CountDown = () => {

    const { timeStart, time } = useTime();


    const formatTime = (time: number | null) => {
        if (time === null) return;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    };

    return (
        <>
            <button onClick={() => timeStart(7)}>7 Minutes</button>
            <button onClick={() => timeStart(10)}>10 Minutes</button>
            <button onClick={() => timeStart(30)}>30 Minutes</button>

            {formatTime(time)}

        </>
    )
}

export default CountDown;