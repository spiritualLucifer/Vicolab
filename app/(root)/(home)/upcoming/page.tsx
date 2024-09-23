import CallType from '@/components/CallType'
import React from 'react'

function Upcoming() {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'> 
           upcoming
        </h1>
        <CallType type="upcoming"/>
  </section>
  )
}

export default Upcoming