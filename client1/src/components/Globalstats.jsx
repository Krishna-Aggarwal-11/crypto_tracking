import React from 'react'


const Globalstats = ({stats}) => {
  return (
    <div className='w-full border-b-2 border-blue-500 mb-4'>
        <div className=' w-[80%] mx-auto my-8 '>
            <h1 className='text-3xl underline mb-4'>Global Stats : </h1>
            <div className='grid grid-cols-2 gap-4'>
                <p className='text-xl '>Number of Cryptocurrencies : <span className='font-bold text-cyan-500'>{(stats.totalCoins)}</span></p>
                <p  className='text-xl'>Total Exchanges : <span className='font-bold text-cyan-500'>{(stats?.totalExchanges)}</span></p>
                <p  className='text-xl'>Total Market Cap : <span className='font-bold text-cyan-500'>${(stats?.totalMarketCap)}</span></p>
                <p  className='text-xl'>Total 24h Volume : <span className='font-bold text-cyan-500'>${(stats?.total24hVolume)}</span></p>
                <p  className='text-xl'>Total Markets : <span className='font-bold text-cyan-500'>{stats?.totalMarkets}</span></p>
            </div>
        </div>
    </div>
  )
}

export default Globalstats