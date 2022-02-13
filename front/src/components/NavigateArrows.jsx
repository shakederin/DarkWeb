import React, { useRef } from 'react'
import ArrowBackIcon  from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from "axios"

export default function NavigateArrows({setPaste}) {
  let page = useRef(0)

  const changePage = async (bool) =>{
    if(bool){
      if(page !== 0){
        page -= 1
      }
    }else{
      page += 1
    }
    const res = await axios.get(`http://localhost:8081/pastes/ten`, { params: { page } });
    console.log(res.data);
    console.log(page, "page");

    setPaste(res.data);
  }
  return (

    <div className='navigateArrows'>
        <span onClick={async ()=>{await changePage(false)}} className='arrowBack'>
            back
            <ArrowBackIcon/>
        </span>
        <span onClick={()=>{changePage(true)}} className='arrowNext'>
            <ArrowForwardIcon/>
            next 
        </span>
    </div>
  )
}
