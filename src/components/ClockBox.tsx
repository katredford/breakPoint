

import zones from './context/timeZones.json';
import { useTime } from './context/TimeContext';
import ZoneClock from './ZoneClock';

// this shows the current time in different US timezones
const ClockBox = () => {

    const { getCurrentTime } = useTime();


    return (
        <>
            <div className='row justify-between'>
                {zones.map(zone => (
                    <ZoneClock key={zone.id} time={getCurrentTime(zone.name)} timezone={zone.timezone} />
                ))}
            </div>

        </>
    )
}

export default ClockBox;