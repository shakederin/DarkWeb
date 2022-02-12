import { useEffect, useRef, useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import ContentType from './components/ContentType';
import HoursChart from './components/HoursChart';
import axios from "axios"
import NavigateArrows from './components/NavigateArrows';
import "./style/charts.css"

function App() {
  const [pastes, setPaste] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const searchInput = useRef()

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
 
  const getFilteredPastes = async () =>{
    const params = searchInput.current.value
    setIsFiltered(true)
    if(!params) {
      setIsFiltered(false)
    }
    const res = await axios.get(`http://localhost:8081/filter/`, { params: { input: params } });
    console.log(res.data);
  }
  console.log(isFiltered);
  return (
    <div className="App">
        <h1 id='mainHeader'>Pastes Dashboard</h1>

        <input ref={searchInput} className='searchBar' onChange={debounce(getFilteredPastes, 1000)} placeholder='Search'></input>

        <div className='graphs'>
          <div className='graphrep'>
            <h2 className='graphHeader1'>Pastes/Hour Of The Day</h2>
            <HoursChart pastes ={pastes} isFiltered={isFiltered}/>
          </div>
          <div className='pierep'>
            <h2 className='graphHeader2'>Pastes By Content</h2>
            <ContentType pastes ={pastes} isFiltered={isFiltered}/>
          </div>
        </div>
        <div style={{width:"50%", hight:"50%"}} className="tableContainer">
          <CollapsibleTable pastes ={pastes} isFiltered={isFiltered}/> 
        </div>
        {isFiltered ? <></> : <NavigateArrows/> }
      </div>
  );
}

export default App;

const debounce = (fn, delay) => {
  let timeoutID;
  return function (...args) {
      if (timeoutID) {
          clearTimeout(timeoutID)
      }
      timeoutID = setTimeout(() => {
          fn(...args);
      }, delay)
  }
}