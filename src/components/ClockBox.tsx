

import zones from './context/timeZones.json';
import { useTime } from './context/TimeContext';
import Clock from './Clock';

// this shows the current time in different US timezones
const ClockBox = () => {

    const { getCurrentTime } = useTime();

    const getZoneClass = (timezone: string) => {
        switch (timezone.toLowerCase()){
            case 'eastern':
                return 'eastern';
            case 'central':
                return 'central';
            case 'mountain':
                return 'mountain';
            case 'pacific':
                return 'pacific';
            default:
                return 'zoneClock';
        }
    }

    return (
        <>
            <div className='row justify-center'>

            <div className='row justify-between clockBox'>
                {zones.map(zone => (
                    <Clock 
                    key={zone.id} 
                    time={getCurrentTime(zone.name)} 
                    timezone={zone.timezone} 
                    className={getZoneClass(zone.timezone)}
                    />
                ))}
            </div>
            </div>

        </>
    )
}

export default ClockBox;