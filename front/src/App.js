import { useEffect, useRef, useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import ContentType from './components/ContentType';
import HoursChart from './components/HoursChart';
import axios from "axios"
import NavigateArrows from './components/NavigateArrows';
import "./style/charts.css"
import { TextField } from '@mui/material';

function App() {
  const [pastes, setPaste] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)
  const searchInput = useRef()

  useEffect(() => {
    async function fetchData() {
      const source = new EventSource("http://localhost:8081/paste/all");
      source.onmessage = e => {
        const sorted = JSON.parse(e.data).sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)).reverse();
        if (!isFiltered) {
          setPaste(preData => [...preData, ...sorted])
        }
      }
      source.onerror = (err) => {
        console.log(err);
      }
    }
    fetchData()
  }, [])

  const getFilteredPastes = async () => {
    const params = searchInput.current.querySelector("#standard-search").value
    setIsFiltered(true)
    if (!params) {
      setIsFiltered(false)
      const res = await axios.get(`http://localhost:8081/pastes/ten`, { params: { page: 0 } });
      setPaste(sortData(res.data));
    } else {
      const res = await axios.get(`http://localhost:8081/filter/`, { params: { input: params } });
      setPaste(sortData(res.data));
    }
  }

  return (
    <div className="App">
      <h1 id='mainHeader'>Pastes Dashboard</h1>
      <TextField
          ref={searchInput}
          style={{marginLeft : "5%", width: "20%"}}
          className='searchBar'
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          onChange={debounce(getFilteredPastes, 1000)}
        />
    <div className='pageContainer'>

      <div className='graphs'>
        <div className='graphrep'>
          <h2 className='graphHeader1'>Pastes/Hour Of The Day</h2>
          <HoursChart pastes={pastes} isFiltered={isFiltered} />
        </div>
        <div className='pierep'>
          <h2 className='graphHeader2'>Pastes By Content</h2>
          <ContentType pastes={pastes} isFiltered={isFiltered} />
        </div>
      </div>

      <div className='tableDiv'>
        <div style={{ width: "50%", hight: "50%" }} className={isFiltered ? "tableContainer" : "tableContainer1"}>
          <CollapsibleTable pastes={pastes} isFiltered={isFiltered} />
        </div>
        {isFiltered ? <></> : <NavigateArrows style={{ width: "50%"}} pastes={pastes} setPaste={setPaste} />}
      </div>

    </div>

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

const sortData = (data) =>{
  const sorted = data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)).reverse();
  return sorted
}