import CallType from '@/components/CallType'
import React from 'react'

function Recordings() {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'> 
        Recordings
        </h1>
        <CallType type='recordings'/>
  </section>
  )
}

export default Recordings