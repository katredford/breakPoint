
interface ZoneProps {
    time: string;
    timezone: string;
}

//this is the current time in the timezone recieved through the props
const ZoneClock: React.FC<ZoneProps> = ({ time, timezone }) => {


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

export default ZoneClock;