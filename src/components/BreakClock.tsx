
interface BreakProps {
    time: string;
    timezone: string;
}


const BreakClock: React.FC<BreakProps> = ({ time, timezone }) => {

    return (
        <>
            <div className="row column align-center zoneClock">

                <li>
                    {timezone.toUpperCase()}
                </li>

                <li>
                    {time}
                </li>
            </div>
        </>
    )
}

export default BreakClock;