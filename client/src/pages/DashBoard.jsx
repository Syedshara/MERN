import { get } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from './DashProfile'
import DashSidebar from './DashSidebar'
import DashPost from './DashPost'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashDash from '../components/DashDash'

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
      {tag === '' && <DashDash />}
      {tag === "profile" && <DashProfile />}
      {tag === "post" && <DashPost />}
      {tag === "user" && <DashUsers />}
      {tag === "comment" && <DashComments />}
      {tag === "dash" && <DashDash />}
    </div>
  )
}

export default DashBoard