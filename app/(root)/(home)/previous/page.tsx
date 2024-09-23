import CallType from '@/components/CallType'
import React from 'react'

function Previous() {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold'> 
          Previous
        </h1>
        <CallType type="ended"/>
  </section>
  )
}

export default Previous