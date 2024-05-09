import React, { useEffect, useState } from 'react'
import {Chart , CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip  , Filler , Legend} from "chart.js"

import { Line } from 'react-chartjs-2'
import moment from 'moment'

Chart.register(CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip , Filler , Legend)

const HistoryChart = ({id, currency, days}) => {
    const [history , setHistory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
                
                if (!res) {
                    return <div>Loading ... </div>
                }
                const data = await res.json()

                const history = data.prices.map(value=>({
                    x:value[0] , y:value[1].toFixed(2)
                }))

                setHistory(history)
                
            } catch (error) {
                
            }
        } 

        fetchData()
    },[])

    

  return (
    <div className='w-[50%] mx-auto h-[500px]  '>
        <Line   options={{
            responsive : true
        }} data = {{
            labels : history.map(value=> moment(value.x).format("DD/MM")) ,
            datasets : [
                {
                    fill : true ,
                    label : id , 
                    data : history.map(value=>value.y) ,
                    borderColor : "rgb(255, 99, 132)" ,
                    backgroundColor : "rgba(255, 99, 132, 0.5) "
                }
            ]
        }} />
    </div>
  )
}

export default HistoryChart