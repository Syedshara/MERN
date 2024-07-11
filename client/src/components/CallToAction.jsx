import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
    return (
        <div className='flex flex-col sm:flex-row gap-4 border border-teal-300 p-6 rounded-tl-3xl rounded-bl-none rounded-br-3xl rounded-tr-none justify-center items-center'>
            <div className='flex-1 flex flex-col gap-3 '>
                <h1 className='text-xl font-bold'>
                    Want to see my Porjects
                </h1>
                <p className='text-gray-200 text-md'>
                    Explore more project of mine to get more information
                </p>
                <Button gradientDuoTone="purpleToPink" className='rounded-none rounded-r-sm rounder-bl-sm rounded-br-sm rounded-tl-xl rounded-bl-none'>
                    <a
                        href='https://github.com/Syedshara/MERN'
                        alt="Error"
                        target='_blank'
                    >
                        Click her to visit my web site
                    </a>

                </Button>
            </div>
            <div className='flex-1 p-2 rounded-full'>
                <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230314103415/Planning-2.png"
                    alt="Error"
                    className='rounded-xl'
                />

            </div>
        </div>
    )
}

export default CallToAction