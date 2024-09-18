import { useState, useEffect } from 'react'
import { useTime } from './context/TimeContext';

interface BreakProps {
    time: string;
    timezone: string;
    className: string;
}

//this shows the clock with whatever minutes were clicked added to it
const BreakClock: React.FC<BreakProps> = ({ time, timezone, className }) => {
    const { minutesToAdd } = useTime();


    const [formattedBreakTime, setFormattedBreaktTime] = useState<string>('')

    useEffect(() => {

        // parse the time string into hours and minutes
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        minutes += minutesToAdd;

        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }

        if (hours >= 24) {
            hours = hours % 24;
        }

        //convert back to 12 hour
        const twelveHour = hours >= 12 ? 'PM' : 'AM';

        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        const formattedBreak = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${twelveHour}`
        setFormattedBreaktTime(formattedBreak)
    }, [minutesToAdd])


    return (
        <>
            <div className={`row column  breakClock ${className}`}>
                <li className={`row zoneTitle justify-center ${className}`}>
                    {timezone.toUpperCase()} 
                </li>
                <div className='row column align-center'>
                <li className='timeText'>
                    Break Over At:
                </li>
                <li className='timeText'>
                    {formattedBreakTime}
                </li>
                </div>
            </div>
        </>
    )
}

export default BreakClock;


