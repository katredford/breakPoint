import { createContext, useState, useRef, useContext, useEffect } from 'react';


interface TimeContextProps {
    time: number | null;
    minutesToAdd: number;
    timeStart: (minutes: number) => void;
    setMinutesToAdd: (minutes: number) => void;
    getCurrentTime: (zone: string) => string;
}


const TimeContext = createContext<TimeContextProps | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [time, setTime] = useState<number | null>(null);
    const [minutesToAdd, setMinutesToAdd] = useState<number>(0)
    const timerRef = useRef<number | null>(null);




    const getCurrentTime = (zone: string) => {

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

        setMinutesToAdd(minutes)
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setTime(minutes * 60);

        setMinutesToAdd(minutes)
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
        time,
        minutesToAdd,
        setMinutesToAdd
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