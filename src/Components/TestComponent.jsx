import React from 'react'
import { mkdirhandler } from '../CommandHandlers/mkdir'
import { TestButton } from './TestButton'

export const TestComponent = () => {

  return (
    <div className='font-mono flex flex-col space-y-4 w-1/12 min-w-fit border-2 border-green-600 p-2'>
        <p className='text-green-600'>DEVELOPER PANEL</p>
        <TestButton func={mkdirhandler} txt="mkdir handler"/>
    </div>
  )
}
