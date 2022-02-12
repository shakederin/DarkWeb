import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { useEffect } from "react";
import "../style/charts.css"

export default function ContentType({pastes}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(()=>{
    setData(pastes)
  },[])
  console.log(data);
  useEffect(()=>{
    console.log(data);
    (async function getData (){
      console.log(pastes);
    const res = await dividePastsByContent(pastes)
    console.log(res);
    setData(res)
    })()
  },[pastes])
  return (
    <div className="pie">
      <PieChart  width={600} height={600}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={250}
          cy={250}
          innerRadius={120}
          outerRadius={160}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} style={{fontSize : "60px"}}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          style={{fontSize : "30px"}}
        >{`${value} Pastes`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          style={{fontSize : "20px"}}
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

const dividePastsByContent = async (pastes) =>{
    const pastsContentType = [
        { name: "Positive", value: 0 ,fill:"green"},
        { name: "Natural", value: 0 ,fill:"lightblue"},
        { name: "Nagitive", value: 0 ,fill:"red"},
        { name: "Unknown", value: 0 ,fill:"grey"},
      ]
    
    for(const paste of pastes){
      try {

          switch (paste.sentiment) {
              case "positive":
                  pastsContentType[0].value += 1;
                  break;
              case "neutral":
                  pastsContentType[1].value += 1;
                  break;
              case "negative":
                  pastsContentType[2].value += 1
                  break;
              default:
                  pastsContentType[3].value += 1
                  break;
          }
      } catch (error) {
        continue;
      }
    }
    console.log(pastsContentType);
    return pastsContentType
}
