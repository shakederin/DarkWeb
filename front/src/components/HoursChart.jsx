import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from "axios"
import "../style/charts.css"
import { useState } from 'react';

export default function HoursChart({pastes, isFiltered}) {
    const [data, setData] = useState(pastes)

    useEffect(()=>{
        if(!isFiltered){
          (async function getSavedData (){
            const res = await axios.get("http://localhost:8081/PasteByHour")
            const cleanData = res.data[0]
            delete cleanData.date
            delete cleanData.__v
            delete cleanData._id
            setData(extractDataByHour(cleanData))
          })()
        }else{
        (function getData (){
            console.log(makePastesPerHourObject(pastes), "here");
            setData(makePastesPerHourObject(pastes))
        })()
      }
      },[pastes, isFiltered])

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.22
    const vw = (Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)) * 0.40
  return  (
    <div className='graph'>
        <BarChart width={vw} height={vh} data={data}>
            <XAxis dataKey="name" stroke="#8884d8"/>
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="count" fill="#8884d8" barSize={30} />
        </BarChart>
    </div>
    )
}

const makePastesPerHourObject =(data)=>{
    const PastesPerHourObject = []
    const HourObject = []
    for(let i = 0 ; i< 24 ; i++ ) {
        const obj = {};
        if(i < 10){
            obj.name= `0${i}:00`; 
            obj.count= 0; 
        } else {
            obj.name= `${i}:00`; 
            obj.count= 0; 
        }
        PastesPerHourObject.push(obj);
    }
    for(const paste of data){
        const HourTime = extractHourTime(paste);
        HourObject.push(HourTime)
        for(const timeObj of PastesPerHourObject){
           if(timeObj.name === HourTime) {
            timeObj.count += 1
           }
        }
    }
    console.log(PastesPerHourObject, "PastesPerHourObject");
    return (PastesPerHourObject);
}

const extractHourTime = (obj) =>{
    const HourTime = obj.date.toString().substring(11, 13);
    // const HourTime = obj.date.toString().substring(16, 18);
    return HourTime+":00";
}

const extractDataByHour = (obj) =>{
    const timeArray = []
    for(const [key, value] of  Object.entries(obj)){
        const newObj = {name: key, count: value}
        timeArray.push(newObj)
    }
    console.log(timeArray);
    return timeArray;
}

