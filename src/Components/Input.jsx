import React from 'react'

export default function Input() {
    return (
        <div className="text-white w-full h-full font-mono flex">
            <p className="text-green-600 text-start">terminal_to_cloud:~$</p>
            <input className='bg-black ml-2 border-0 focus:outline-none flex-grow' />
        </div>
    )
}
