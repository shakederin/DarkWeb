import React from 'react'
import ArrowBackIcon  from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
export default function NavigateArrows() {
  return (

    <div className='navigateArrows'>
        <span className='arrowBack'>
            back
            <ArrowBackIcon/>
        </span>
        <span className='arrowNext'>
            <ArrowForwardIcon/>
            next 
        </span>
    </div>
  )
}
