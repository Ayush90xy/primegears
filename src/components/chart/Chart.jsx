import "./chart.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Chart = ({aspect,title,Data,width}) => {
  let data;
  if(title==="report"){
    data=Data;
  }
  else{
    data=[
      {name:"Jan",total:20000},
      {name:"Feb",total:14000},
      {name:"Mar",total:12000},
      {name:"Apr",total:23000},
      {name:"May",total:9000},
    ]
  }

  return (
    <div className="chart">
      <div className="title">{title||"Last 5 months transactions"}</div>
      <ResponsiveContainer width={"100%"||width} aspect={aspect}>
        <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="gray" />
        <YAxis stroke="gray"/>
        <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
        <Tooltip />
        <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart