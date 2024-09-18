
interface ClockProps {
    time: string;
    timezone: string;
    className: string;
}

//this is the current time in the timezone recieved through the props
const Clock: React.FC<ClockProps> = ({ time, timezone, className }) => {


    return (
        <>
            <div className={`row column align-center zoneClock ${className}`}>
                <div className="clockTitle">

                <li >
                    {timezone.toUpperCase()}
                </li>
                </div>

                <li>
                    {time}
                </li>
            </div>
        </>
    )
}

export default Clock;