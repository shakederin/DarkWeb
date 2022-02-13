import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios"

export default function NavigateArrows({ setPaste }) {

  const [page, setPage] = useState(0)
  const [pastesCount, setPastesCount] = useState(10)
  const [pastesTotalCount, setPastesTotalCount] = useState(0)

  useEffect(()=>{
    (async function getPastesCount(){
      const pastesCount = await axios.get("http://localhost:8081/pastes/count");
      console.log(parseInt(pastesCount.data)/10)
      setPastesTotalCount(parseInt(pastesCount.data))
    })()
  },[])

  const changePage = async (bool) => {
    let localPage;
    if (!bool) {
      if (page !== 0) {
        setPage(page - 1)
        localPage = page - 1
      }
    } else {
      setPage(page + 1)
      localPage = page + 1
    }
      const res = await axios.get(`http://localhost:8081/pastes/ten`, { params: { page : localPage } });
      setPastesCount(res.data.length)
      setPaste(res.data);
  }
  return (
    <div className='navigateArrows'>
      {page === 0 ? <></> :
        <span onClick={async () => { await changePage(false) }} className='arrow'>
          back
          <ArrowBackIcon />
        </span>
      }
      page {page + 1} showing {pastesCount} results out of {pastesTotalCount}
      {(pastesTotalCount/10) < page  ? <></> :
        <span onClick={() => { changePage(true) }} className='arrow'>
          <ArrowForwardIcon />
          next
        </span>}
    </div>
  )
}
