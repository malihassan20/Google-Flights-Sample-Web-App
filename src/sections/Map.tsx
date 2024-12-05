import React from 'react'
import googleMapImage from '@/assets/images/staticmap.png'
import Image from 'next/image'

function Map() {
    return (
        <div className='max-w-5xl mx-auto pt-6 px-4 md:px-0'>
            <h2 className='text-xl font-medium mb-4'>Find flights from lahore to anywhere</h2>
            <div className='rounded-2xl relative'>
                <div className='px-4 py-1 text-xs sm:text-sm font-medium bg-white rounded-full shadow-md text-primary absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'>Explore destinations</div>
                <Image src={googleMapImage} alt='Google Map' className='rounded-2xl'  />
            </div>
        </div>
    )
}

export default Map
