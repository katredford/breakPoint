
interface ZoneProps {
    time: string;
    timezone: string;
}


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