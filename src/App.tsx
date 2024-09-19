import {useState, useEffect} from "react";
import {useTime} from "./components/context/TimeContext"
import ClockBox from "./components/ClockBox";
import CountDown from "./components/CountDown";
import BreakBox from "./components/BreakBox";



function App() {
  const [display, setDisplay] = useState<boolean>(false)
  const { time } = useTime();

  console.log(time)

  useEffect(() => {
    if(time !== null && time > 0) {
      setDisplay(true);
    }else {
      setDisplay(false);
    }
  }, [time])

  return (
    <>
    
    <ClockBox />
    <CountDown />

    {display ? <BreakBox /> : null}
    </>
  )
}

export default App
