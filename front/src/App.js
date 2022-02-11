import { useEffect, useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import ContentType from './components/ContentType';
import HoursChart from './components/HoursChart';

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
      <ContentType pastes ={pastes}/>
      <HoursChart pastes ={pastes}/>
      <div style={{width:"50%", hight:"50%"}} className="tableContainer">
      <CollapsibleTable pastes ={pastes}/> 
      </div>
    </div>
  );
}

export default App;
