import zones from './context/timeZones.json';
import { useTime } from './context/TimeContext';
import BreakClock from './BreakClock'



const BreakBox = () => {

    const { getCurrentTime } = useTime();

    return (
        <>
            <div className='row justify-between'>
                {zones.map(zone => (
                    <BreakClock key={zone.id} time={getCurrentTime(zone.name)} timezone={zone.timezone} />
                ))}
            </div>
        </>
    )
}

export default BreakBox;