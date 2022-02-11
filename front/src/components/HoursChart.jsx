import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import "../style/charts.css"

export default function HoursChart(props) {
    const data = makePastesPerHourObject(props.pastes);
  return  (
    <div className='graph'>
        <h2>Pastes/Hour of the day</h2>
        <BarChart width={1000} height={300} data={data}>
            <XAxis dataKey="name" stroke="#8884d8"/>
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
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
    return (PastesPerHourObject);
}

const extractHourTime = (obj) =>{
    const HourTime = obj.date.toString().substring(11, 13);
    return HourTime+":00";
}

