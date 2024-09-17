
import zones from "./components/context/timeZones.json"
import ClockBox from "./components/ClockBox";
function App() {
  const getCurrentTimeInEST = (zone: string) => {
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

  // console.log(getCurrentTimeInEST())


console

  return (
    <>
    <ClockBox />
 {/* <h1>what</h1>
    {zones.map((zone) => (

      <p>{getCurrentTimeInEST(zone.name)}</p>
   

  
      
  ))} */}
    </>
  )
}

export default App
