import React from 'react'

export const TestButton = (props) => {
  return (

    <button className='bg-none border-2 border-green-600 text-green-600 p-2' onClick={props.func}>{props.txt}</button>
  )
}
