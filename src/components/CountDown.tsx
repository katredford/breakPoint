

import { useState, useEffect, useRef } from 'react';
import { useTime } from './context/TimeContext';
import alertSound from '../assets/alert002.mov';


//this shows 3 buttons that start the timeStart function and displays
//a clock that counts down from whatever start number gets passed as
//an argument
const CountDown = () => {
    const { timeStart, time } = useTime();
    const [isBreakOverVisible, setIsBreakOverVisible] = useState(true);
    const [customTime, setCustomTime] = useState<number | ''>('');
    const [dropdownTime, setDropdownTime] = useState<number>(5);
    const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(alertSound);
        audio.loop = true;
        audioRef.current = audio;

        if (time === 0 && isSoundEnabled) {

            audio.play();
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [time, isSoundEnabled]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setCustomTime(isNaN(value) ? '' : value);
    };

    const handleStart = () => {
        if (customTime) {
            timeStart(customTime);
        } else {
            timeStart(dropdownTime);
        }
    };

    const formatTime = (time: number | null) => {
        if (time === null) return;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleBreakOverClick = () => {
        setIsBreakOverVisible(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSoundEnabled(e.target.checked);
    };

    return (
        <div className='row column align-center'>
            <div>
                <input
                    type='number'
                    value={customTime}
                    onChange={handleInputChange}
                    placeholder='Enter minutes'
                    min={1}
                    className='time-input'
                />

                <select
                    value={dropdownTime}
                    onChange={(e) => setDropdownTime(parseInt(e.target.value))}
                    className='time-dropdown'
                >
                    {[5, 10, 15, 20, 25, 30].map((num) => (
                        <option key={num} value={num}>
                            {num} Minutes
                        </option>
                    ))}
                </select>

                <button onClick={handleStart}>Start Timer</button>

                <label>
                    <input
                        type='checkbox'
                        checked={isSoundEnabled}
                        onChange={handleCheckboxChange}
                    />

                    <span
                        className={`sound ${isSoundEnabled ? "sound--active" : ""}`}
                        aria-hidden="true"
                    />
                </label>

            </div>

            <div>
                <button className='presets' onClick={() => timeStart(7)}>7 Minutes</button>
                <button className='presets' onClick={() => timeStart(10)}>10 Minutes</button>
                <button className='presets' onClick={() => timeStart(30)}>30 Minutes</button>
            </div>




            {time !== null && time > 0 ? (
                <div className='countDown'>
                    {formatTime(time)}
                </div>
            ) : time === 0 && isBreakOverVisible ? (
                <div className='breakOver' onClick={handleBreakOverClick}>
                    BREAK OVER
                </div>
            ) : null}
        </div>
    );
};

export default CountDown;
