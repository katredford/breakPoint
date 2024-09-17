import { createContext, useState, useRef, useContext, useEffect } from 'react';
import zones from './timeZones.json';

interface TimeContextProps {
    getCurrentTime: (zone: string) => string;
    timeStart: (minutes: number) => void;
    time: number | null;
}


const TimeContext = createContext<TimeContextProps | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [time, setTime] = useState<number | null>(null);

    const timerRef = useRef<number | null>(null);




    const getCurrentTime = (zone: string): string => {

        const timestamp = Date.now();
        const date = new Date(timestamp);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            timeZone: zone,
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


    const timeStart = (minutes: number) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);  // Clear any existing timer
        }

        setTime(minutes * 60);


        timerRef.current = window.setInterval(() => {
            setTime(prevTime => {
                if (prevTime && prevTime > 0) {
                    return prevTime - 1
                } else {
                    clearInterval(timerRef.current!)
                    return 0;
                }
            });
        }, 1000);
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, [])

    const actions = {
        getCurrentTime,
        timeStart,
        time
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