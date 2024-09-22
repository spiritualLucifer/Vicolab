import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
        <Image
            src='/icons/loading-circle.svg'
            alt='Loader'
            width={72}
            height={72}
        />
    </div>
  )
}

export default Loader