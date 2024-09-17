import { createContext, useCallback, useContext } from 'react';
import zones from './timeZones.json';

interface TimeContextProps {
    getCurrentTime: (zone: string) => string;
}


const TimeContext = createContext<TimeContextProps | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const getCurrentTime = (zone: string): string => {
        // const selectedZone = zones[index];

        // if (!selectedZone) {
        //   return 'Invalid time zone index';
        // }

        const timestamp = Date.now();
        const date = new Date(timestamp);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,  // Set timezone based on the array
            // year: 'numeric',
            // month: 'long',
            // day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            // second: 'numeric',
            hour12: true,
        }).format(date);

        return `${formattedTime}`;
    };

    const actions = {
        getCurrentTime
    }

    return (
        <TimeContext.Provider value={actions}>
            {children}
        </TimeContext.Provider>
    )
}

export const useTime = () => {
    const context = useContext(TimeContext);
    if (!context) {
        throw new Error('useTime must be used within word porovider')
    }

    return context;
}