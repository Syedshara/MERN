import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { signoutFailure, signoutStart, signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

const DashSidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [tag, setTag] = useState('')
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const getTag = params.get('tag')
        if (getTag) {
            setTag(getTag)
        }
    }, [location.search])
    const handleSignOut = async () => {
        console.log("cv");

        try {
            dispatch(signoutStart())
            const data = await fetch("/api/user/signout", {
                method: "POST"
            })
            const res = await data.json()
            if (res.success === false) {
                dispatch(signoutFailure(res.message))

            }
            else {

                dispatch(signoutSuccess())

            }
        }
        catch (err) {
            dispatch(signoutFailure(err.message))

        }

    }

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tag=profile">
                        <Sidebar.Item active={tag === 'profile'} icon={HiUser} label="user" labelColor="dark" as={'div'} >
                            Profile
                        </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignOut} >
                        Sign out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar