import zones from './context/timeZones.json';
import { useTime } from './context/TimeContext';
import BreakClock from './BreakClock'



const BreakBox = () => {

    const { getCurrentTime } = useTime();

    const getZoneClass = (timezone: string) => {
        switch (timezone.toLowerCase()) {
            case 'eastern':
                return 'eastern';
            case 'central':
                return 'central';
            case 'mountain':
                return 'mountain';
            case 'pacific':
                return 'pacific';
            default:
                return 'none';
        }
    }

    return (
        <>
        <div className='row justify-center'>

            <div className='row align-center breakBox'>
                {zones.map(zone => (
                    <BreakClock
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

export default BreakBox;