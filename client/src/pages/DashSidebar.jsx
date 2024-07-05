import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DashSidebar = () => {
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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tag=profile">
                        <Sidebar.Item active={tag === 'profile'} icon={HiUser} label="user" labelColor="dark"  >
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight}   >
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar