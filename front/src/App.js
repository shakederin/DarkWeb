import { useEffect, useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import ContentType from './components/ContentType';
import HoursChart from './components/HoursChart';
import NavigateArrows from './components/NavigateArrows';

function App() {
  const [pastes, setPaste] = useState([])

  useEffect(()=>{
    async function fetchData(){
      const source = new EventSource("http://localhost:8081/paste/all");
      source.onmessage = e =>{
        console.log("new data recived");
        const sorted = JSON.parse(e.data).sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)).reverse();
        setPaste(preData =>[...preData, ...sorted])
        }
        source.onerror= (err) =>{
          console.log(err);
        }
    } 
    fetchData()
  },[])
 
  return (
    <div className="App">
        <h1 id='mainHeader'>Pastes Dashboard</h1>
        <div className='graphs'>
          <div className='graphrep'>
            <h2 className='graphHeader1'>Pastes/Hour Of The Day</h2>
            <HoursChart pastes ={pastes}/>
          </div>
          <div className='pierep'>
            <h2 className='graphHeader2'>Pastes By Content</h2>
            <ContentType pastes ={pastes}/>
          </div>
        </div>
        <div style={{width:"50%", hight:"50%"}} className="tableContainer">
          <CollapsibleTable pastes ={pastes}/> 
          <NavigateArrows/>
        </div>
      </div>
  );
}

export default App;
