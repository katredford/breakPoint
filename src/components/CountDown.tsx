
import { useState } from 'react';
import { useTime } from './context/TimeContext';

//this shows 3 buttons that start the timeStart function and displays
//a clock that counts down from whatever start number gets passed as
//an argument
const CountDown = () => {
    const { timeStart, time } = useTime();
    const [isBreakOverVisible, setIsBreakOverVisible] = useState(true);

    const formatTime = (time: number | null) => {
        if (time === null) return;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    };

    return (
        <>
            <div className='row column align-center'>

                <div>

                    <button onClick={() => timeStart(7)}>7 Minutes</button>
                    <button onClick={() => timeStart(10)}>10 Minutes</button>
                    <button onClick={() => timeStart(30)}>30 Minutes</button>
                </div>

                {time !== null && time > 0 ? (
                    <div className='countDown'>
                        {formatTime(time)}
                    </div>
                ) : time === 0 && isBreakOverVisible ? (
                    <div
                        className='breakOver'
                        onClick={() => setIsBreakOverVisible(false)}
                    >
                        BREAK OVER
                    </div>
                ) : null}
            </div>


        </>
    )
}

export default CountDown;