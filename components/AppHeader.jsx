import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { UserButton } from '@clerk/nextjs'

const AppHeader = ({hideSidebar=false}) => {
  return (
    <div className='flex items-center justify-between p-4 shadow-sm'>
      {!hideSidebar && <SidebarTrigger></SidebarTrigger>}
      <UserButton></UserButton>
    </div>
  )
}

export default AppHeader
