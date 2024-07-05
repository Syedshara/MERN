import { get } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from './DashProfile'
import DashSidebar from './DashSidebar'

const DashBoard = () => {
  const location = useLocation()
  const [tag, setTag] = useState('')
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const getTag = params.get('tag')
    if (getTag) {
      setTag(getTag)
    }
  }, [location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='w-full md:w-56'>
        <DashSidebar />
      </div>
      {tag === "profile" && <DashProfile />}
    </div>
  )
}

export default DashBoard