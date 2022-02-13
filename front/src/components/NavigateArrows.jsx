import React, { useRef, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios"

export default function NavigateArrows({ setPaste }) {

  const [page, setPage] = useState(0)
  const [pastesCount, setPastesCount] = useState(10)

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
      page {page + 1} showing {pastesCount} results
      <span onClick={() => { changePage(true) }} className='arrow'>
        <ArrowForwardIcon />
        next
      </span>
    </div>
  )
}
